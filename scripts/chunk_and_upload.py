#!/usr/bin/env python3
"""
Script to chunk markdown files from the context directory and upload embeddings to Neon database.
"""

import os
import re
import json
import time
import psycopg2
import tiktoken
from pathlib import Path
from typing import List, Dict, Any
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from parent directory
load_dotenv('../.env')

# Configure Google AI
api_key = os.getenv('VITE_GEMINI_API_KEY')
if not api_key:
    print("❌ VITE_GEMINI_API_KEY not found in environment variables")
    print("Please add it to your .env file or set it as an environment variable")
    exit(1)

genai.configure(api_key=api_key)

class DocumentChunker:
    def __init__(self, chunk_size: int = 1000, overlap: int = 200):
        self.chunk_size = chunk_size
        self.overlap = overlap
        self.tokenizer = tiktoken.get_encoding("cl100k_base")  # OpenAI tokenizer for consistency
    
    def chunk_text(self, text: str, filename: str) -> List[Dict[str, Any]]:
        """Split text into overlapping chunks."""
        chunks = []
        
        # Split by headers first to maintain semantic boundaries
        header_pattern = r'^(#{1,6}\s+.+)$'
        sections = re.split(header_pattern, text, flags=re.MULTILINE)
        
        current_chunk = ""
        chunk_index = 0
        
        for i, section in enumerate(sections):
            if not section.strip():
                continue
                
            # If this is a header, start a new section
            if re.match(header_pattern, section, re.MULTILINE):
                if current_chunk.strip():
                    # Save the previous chunk
                    chunks.append({
                        'content': current_chunk.strip(),
                        'filename': filename,
                        'chunk_index': chunk_index,
                        'metadata': {
                            'section_header': section.strip(),
                            'chunk_type': 'section'
                        }
                    })
                    chunk_index += 1
                    current_chunk = section + "\n"
                else:
                    current_chunk = section + "\n"
            else:
                # This is content, add to current chunk
                current_chunk += section + "\n"
                
                # Check if we need to split this section
                if len(self.tokenizer.encode(current_chunk)) > self.chunk_size:
                    # Split by sentences or paragraphs
                    sentences = re.split(r'(?<=[.!?])\s+', current_chunk)
                    temp_chunk = ""
                    
                    for sentence in sentences:
                        if len(self.tokenizer.encode(temp_chunk + sentence)) > self.chunk_size:
                            if temp_chunk.strip():
                                chunks.append({
                                    'content': temp_chunk.strip(),
                                    'filename': filename,
                                    'chunk_index': chunk_index,
                                    'metadata': {
                                        'chunk_type': 'content'
                                    }
                                })
                                chunk_index += 1
                                # Start new chunk with overlap
                                temp_chunk = sentence + " "
                            else:
                                # Single sentence is too long, split by words
                                words = sentence.split()
                                temp_chunk = " ".join(words[:self.chunk_size//4]) + " "
                        else:
                            temp_chunk += sentence + " "
                    
                    current_chunk = temp_chunk
        
        # Add the final chunk
        if current_chunk.strip():
            chunks.append({
                'content': current_chunk.strip(),
                'filename': filename,
                'chunk_index': chunk_index,
                'metadata': {
                    'chunk_type': 'content'
                }
            })
        
        return chunks

class NeonUploader:
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
    
    def create_tables(self):
        """Create the necessary tables in Neon."""
        with psycopg2.connect(
            self.connection_string, 
            sslmode='require', 
            connect_timeout=30,
            keepalives_idle=30,
            keepalives_interval=10,
            keepalives_count=5
        ) as conn:
            with conn.cursor() as cur:
                # Enable pgvector extension
                cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
                
                # Note: We'll clear existing chunks per file during upload
              
                # Create document_chunks table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS document_chunks (
                        id SERIAL PRIMARY KEY,
                        content TEXT NOT NULL,
                        embedding vector(768),
                        metadata JSONB DEFAULT '{}',
                        source_file VARCHAR(255),
                        chunk_index INTEGER,
                        created_at TIMESTAMPTZ DEFAULT NOW()
                    );
                """)
                
                # Create index for similarity search (768 dimensions work with all index types)
                cur.execute("""
                    CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx 
                    ON document_chunks USING ivfflat (embedding vector_cosine_ops);
                """)
                
                conn.commit()
                print("✅ Tables created successfully")
    
    def generate_embedding(self, text: str, max_retries: int = 3) -> List[float]:
        """Generate embedding using Google's text-embedding-004 model with retry logic."""
        for attempt in range(max_retries):
            try:
                result = genai.embed_content(
                    model="text-embedding-004",
                    content=text
                )
                
                # Handle the response structure
                embedding = None
                if hasattr(result, 'embedding'):
                    embedding = result.embedding
                elif hasattr(result, 'embeddings') and result.embeddings:
                    embedding = result.embeddings[0].values
                else:
                    embedding = result['embedding']
                
                return embedding
            except Exception as e:
                if ("429" in str(e) or "504" in str(e)) and attempt < max_retries - 1:
                    wait_time = (2 ** attempt) * 2  # Exponential backoff: 2s, 4s, 8s
                    error_type = "Rate limited" if "429" in str(e) else "Timeout"
                    print(f"⚠️  {error_type} (attempt {attempt + 1}/{max_retries}). Waiting {wait_time}s...")
                    time.sleep(wait_time)
                    continue
                else:
                    print(f"❌ Error generating embedding: {e}")
                    return []
    
    def upload_chunks(self, chunks: List[Dict[str, Any]]):
        """Upload chunks with embeddings to Neon."""
        with psycopg2.connect(
            self.connection_string, 
            sslmode='require', 
            connect_timeout=30,
            keepalives_idle=30,
            keepalives_interval=10,
            keepalives_count=5
        ) as conn:
            with conn.cursor() as cur:
                # Group chunks by source file
                chunks_by_file = {}
                for chunk in chunks:
                    filename = chunk['filename']
                    if filename not in chunks_by_file:
                        chunks_by_file[filename] = []
                    chunks_by_file[filename].append(chunk)
                
                total_uploaded = 0
                
                for filename, file_chunks in chunks_by_file.items():
                    print(f"📄 Processing {filename}...")
                    
                    # Clear existing chunks for this file to avoid duplicates
                    cur.execute("DELETE FROM document_chunks WHERE source_file = %s", (filename,))
                    print(f"   → Cleared existing chunks for {filename}")
                    
                    for chunk in file_chunks:
                        # Generate embedding
                        embedding = self.generate_embedding(chunk['content'])
                        if not embedding:
                            print(f"⚠️  Skipping chunk {chunk['chunk_index']} from {chunk['filename']} - embedding failed")
                            continue
                        
                        # Small delay to avoid rate limiting and timeouts
                        time.sleep(0.5)
                        
                        # Insert into database
                        cur.execute("""
                            INSERT INTO document_chunks (content, embedding, metadata, source_file, chunk_index)
                            VALUES (%s, %s, %s, %s, %s)
                        """, (
                            chunk['content'],
                            embedding,
                            json.dumps(chunk['metadata']),
                            chunk['filename'],
                            chunk['chunk_index']
                        ))
                        total_uploaded += 1
                    
                    print(f"   → Uploaded {len(file_chunks)} chunks for {filename}")
                    
                    # Longer delay between files to avoid timeouts
                    time.sleep(2)
                
                conn.commit()
                print(f"✅ Uploaded {total_uploaded} total chunks to Neon")

def main():
    # Configuration
    context_dir = Path("../context")
    chunk_size = 1000  # tokens
    overlap = 200      # tokens
    
    # Get Neon connection string (try both standard and legacy names)
    neon_url = os.getenv('DATABASE_URL') or os.getenv('NEON_DATABASE_URL')
    if not neon_url:
        print("❌ DATABASE_URL or NEON_DATABASE_URL not found in environment variables")
        print("Please add DATABASE_URL to your .env file or set it as an environment variable")
        return
    
    # Ensure the connection string has the right format
    if 'sslmode=require' not in neon_url:
        if '?' in neon_url:
            neon_url += '&sslmode=require'
        else:
            neon_url += '?sslmode=require'
    
    # Initialize components
    chunker = DocumentChunker(chunk_size=chunk_size, overlap=overlap)
    uploader = NeonUploader(neon_url)
    
    # Create tables
    print("🔧 Setting up database tables...")
    uploader.create_tables()
    
    # Process markdown files
    markdown_files = list(context_dir.glob("*.md"))
    print(f"📁 Found {len(markdown_files)} markdown files")
    
    all_chunks = []
    
    for file_path in markdown_files:
        print(f"📄 Processing {file_path.name}...")
        
        # Read file content
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Chunk the content
        chunks = chunker.chunk_text(content, file_path.name)
        print(f"   → Created {len(chunks)} chunks")
        
        all_chunks.extend(chunks)
    
    print(f"\n📊 Total chunks created: {len(all_chunks)}")
    
    # Upload to Neon
    print("\n🚀 Uploading chunks to Neon...")
    uploader.upload_chunks(all_chunks)
    
    print("\n✅ Done! Your context files have been chunked and uploaded to Neon.")
    print("\nNext steps:")
    print("1. Add NEON_DATABASE_URL to your Netlify environment variables")
    print("2. Update your contextLoader.ts to use the Neon database")
    print("3. Test the AI discussion feature")

if __name__ == "__main__":
    main() 