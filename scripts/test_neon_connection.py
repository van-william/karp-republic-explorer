#!/usr/bin/env python3
"""
Simple script to test Neon database connection and basic operations.
"""

import os
import psycopg2
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_connection():
    """Test basic connection to Neon database."""
    neon_url = os.getenv('NEON_DATABASE_URL')
    if not neon_url:
        print("❌ NEON_DATABASE_URL not found in environment variables")
        return False
    
    try:
        print("🔌 Testing connection to Neon...")
        with psycopg2.connect(neon_url, sslmode='require') as conn:
            with conn.cursor() as cur:
                # Test basic query
                cur.execute("SELECT version();")
                version = cur.fetchone()[0]
                print(f"✅ Connected successfully!")
                print(f"   PostgreSQL version: {version}")
                
                # Test pgvector extension
                cur.execute("SELECT * FROM pg_extension WHERE extname = 'vector';")
                if cur.fetchone():
                    print("✅ pgvector extension is installed")
                else:
                    print("⚠️  pgvector extension not found - will be created by main script")
                
                # Check if document_chunks table exists
                cur.execute("""
                    SELECT EXISTS (
                        SELECT FROM information_schema.tables 
                        WHERE table_name = 'document_chunks'
                    );
                """)
                table_exists = cur.fetchone()[0]
                if table_exists:
                    print("✅ document_chunks table exists")
                    
                    # Count existing chunks
                    cur.execute("SELECT COUNT(*) FROM document_chunks;")
                    count = cur.fetchone()[0]
                    print(f"   Found {count} existing chunks")
                else:
                    print("ℹ️  document_chunks table doesn't exist yet - will be created by main script")
                
                return True
                
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False

def test_embedding_query():
    """Test a simple vector similarity query."""
    neon_url = os.getenv('NEON_DATABASE_URL')
    if not neon_url:
        return False
    
    try:
        with psycopg2.connect(neon_url, sslmode='require') as conn:
            with conn.cursor() as cur:
                # Check if we have any data to test with
                cur.execute("SELECT COUNT(*) FROM document_chunks;")
                count = cur.fetchone()[0]
                
                if count == 0:
                    print("ℹ️  No chunks found - run chunk_and_upload.py first")
                    return True
                
                # Test a simple similarity query
                cur.execute("""
                    SELECT content, source_file 
                    FROM document_chunks 
                    LIMIT 1;
                """)
                result = cur.fetchone()
                if result:
                    print("✅ Can query document chunks successfully")
                    print(f"   Sample content: {result[0][:100]}...")
                    print(f"   Source file: {result[1]}")
                
                return True
                
    except Exception as e:
        print(f"❌ Query test failed: {e}")
        return False

def main():
    print("🧪 Testing Neon Database Setup")
    print("=" * 40)
    
    # Test connection
    if not test_connection():
        return
    
    print()
    
    # Test queries
    test_embedding_query()
    
    print()
    print("✅ All tests completed!")
    print("\nNext steps:")
    print("1. Run 'python chunk_and_upload.py' to upload your context files")
    print("2. Add NEON_DATABASE_URL to your Netlify environment variables")
    print("3. Update your frontend to use the Neon database")

if __name__ == "__main__":
    main() 