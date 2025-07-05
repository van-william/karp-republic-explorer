[![Netlify Status](https://api.netlify.com/api/v1/badges/62666553-8db6-4952-bb62-20ac5fce261a/deploy-status)](https://app.netlify.com/projects/tech-republic/deploys)

# The Technological Republic - Interactive Explorer

An interactive web application for exploring "The Technological Republic" by Alex Karp, featuring AI-powered discussion, network visualizations, and multimedia content.

## Features

- **Book Overview**: Comprehensive summary and chapter breakdown
- **Audio Summary**: AI-generated podcast with full transcript
- **AI Discussion**: Gemini-powered chat interface with contextual knowledge
- **Topic Map**: Interactive 2D and 3D network visualizations of book concepts
- **Further Reading**: Curated references and additional resources

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **AI Integration**: Google Gemini API
- **Network Visualization**: React Force Graph (2D & 3D)
- **Deployment**: Netlify

## Project Structure

```
karp-republic-explorer/
├── src/
│   ├── components/
│   │   ├── ui/                    # Shadcn/ui components
│   │   ├── AudioSummary.tsx       # Audio player with transcript
│   │   ├── BookSummary.tsx        # Book overview component
│   │   ├── ChatInterface.tsx      # AI discussion interface
│   │   ├── NetworkVisualization.tsx # 3D network diagram
│   │   ├── NetworkVisualization2D.tsx # 2D network diagram
│   │   └── References.tsx         # Further reading section
│   ├── lib/
│   │   ├── geminiApi.ts           # Gemini API integration
│   │   ├── contextLoader.ts       # Context loading from markdown
│   │   └── networkDiagramData.ts  # Network visualization data
│   ├── pages/
│   │   └── Index.tsx              # Main application page
│   └── context/                   # Markdown context files
├── public/
│   └── audio/                     # Audio files (book-summary.wav)
└── .env                           # Environment variables
```

## Setup and Configuration

### 1. Project Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd karp-republic-explorer

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp env.example .env

# Edit .env and add your API keys
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_NEON_DATABASE_URL=your_neon_database_url_here
```

**Getting a Gemini API Key:**

1.  Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2.  Sign in with your Google account
3.  Click "Create API Key"
4.  Copy the key and add it to your `.env` file

**Important for Netlify Deployment:**

The AI discussion feature requires environment variables to be set in your Netlify site settings:

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add the following variables:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Key**: `DATABASE_URL` (for serverless functions)
   - **Value**: Your Neon database connection string
5. Save and redeploy your site

## Content Management

### Neon Database Integration (Recommended)

This application now supports Neon database integration for enhanced AI context retrieval. The system uses vector embeddings to provide more accurate and relevant responses.

#### Setup Instructions

1. **Create Neon Database**:
   - Go to [neon.tech](https://neon.tech) and create an account
   - Create a new project
   - Copy your connection string

2. **Upload Context to Database**:
   ```bash
   cd scripts
   # Install Python dependencies
   uv sync
   # Run the chunk and upload script
   uv run python chunk_and_upload.py
   ```

3. **Environment Variables**:
   - Add `DATABASE_URL` to your `.env` file (for Python scripts and Netlify Functions)
   - Add `VITE_NEON_DATABASE_URL` to your `.env` file (for client-side, optional)
   - Add `DATABASE_URL` to Netlify environment variables (for serverless functions)

#### How It Works

- **Vector Embeddings**: Content is converted to numerical vectors using Google's Gemini embedding model
- **Semantic Search**: User queries are matched to relevant content using cosine similarity
- **Real-time Retrieval**: The system fetches the most relevant chunks from the database using Neon's serverless driver
- **Caching**: Query embeddings are cached for performance
- **Best Practices**: Uses official Neon serverless driver for optimal Netlify Functions performance

### Legacy: AI Context Files

This application can also use markdown files in the `context/` directory to provide contextual information to the AI chat.

- **How it Works**: The AI will automatically search and include relevant information from these files based on user questions.
- **How to Add**: Create `.md` files in the `context/` directory. Use descriptive filenames (e.g., `soft-belief.md`) and clear headings within the files for best results.

### Advanced RAG with Embedding Database (Optional)

For production applications requiring more sophisticated retrieval capabilities, consider implementing a vector database like TimescaleDB with pgvector:

#### Why Use an Embedding Database?

- **Better Semantic Search**: Vector similarity search is more accurate than keyword matching
- **Scalability**: Handle thousands of documents efficiently
- **Real-time Updates**: Add new content without rebuilding the entire context
- **Metadata Filtering**: Filter by source, date, topic, etc.
- **Hybrid Search**: Combine semantic and keyword search for better results

#### Implementation Options

**TimescaleDB + pgvector:**
```sql
-- Create the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create a table for document chunks
CREATE TABLE document_chunks (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding vector(768), -- Adjust dimension based on your embedding model
    metadata JSONB,
    source_file VARCHAR(255),
    chunk_index INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index for similarity search
CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops);
```

**Open Source Vector Database Alternatives:**

**Self-Hosted Options:**
- **Qdrant**: High-performance vector database written in Rust, excellent for production
- **Weaviate**: Open-source vector database with GraphQL API and semantic search
- **Chroma**: Lightweight, embeddable vector database perfect for development
- **Milvus**: Scalable vector database designed for AI applications
- **Vespa**: Yahoo's open-source search engine with vector search capabilities
- **PostgreSQL + pgvector**: Add vector search to existing PostgreSQL databases
- **Redis + RedisSearch**: Use Redis with vector search modules

**Managed Open Source:**
- **Neon**: Serverless PostgreSQL with pgvector support (recommended for easy setup)
- **Supabase**: Open-source Firebase alternative with PostgreSQL and pgvector
- **Railway**: Easy deployment of open-source databases

**Lightweight Options:**
- **LanceDB**: Embeddable vector database with Python/JavaScript APIs
- **Hnswlib**: Fast approximate nearest neighbor search library
- **FAISS**: Facebook's library for efficient similarity search

#### Quick Setup with Neon (Recommended)

**Step 1: Create Neon Database**
1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy your connection string (looks like: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname`)

**Step 2: Enable pgvector Extension**
```sql
-- Run this in your Neon SQL editor
CREATE EXTENSION IF NOT EXISTS vector;
```

**Step 3: Create Your Tables**
```sql
-- Create the document chunks table
CREATE TABLE document_chunks (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding vector(768), -- Adjust dimension based on your embedding model
    metadata JSONB DEFAULT '{}',
    source_file VARCHAR(255),
    chunk_index INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index for similarity search
CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops);
```

**Step 4: Add Environment Variable**
```bash
# Add to your .env file
NEON_DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname
```

**Step 5: Install Dependencies**
```bash
npm install pg @types/pg
```

#### Integration Steps

1. **Chunk Your Documents**: Split markdown files into smaller, meaningful chunks
2. **Generate Embeddings**: Use the same embedding model (gemini-embedding-exp-03-07) for consistency
3. **Store in Database**: Insert chunks with their embeddings and metadata
4. **Update Retrieval Logic**: Replace the current context loading with database queries

#### Example Implementations

**TimescaleDB/PostgreSQL + pgvector:**
```typescript
// Enhanced context loader with PostgreSQL + pgvector
export async function getRelevantContextFromDB(userQuery: string): Promise<string> {
  const queryEmbedding = await generateEmbedding(userQuery);
  
  // Query the database for similar chunks
  const similarChunks = await db.query(`
    SELECT content, metadata, 
           1 - (embedding <=> $1) as similarity
    FROM document_chunks 
    WHERE 1 - (embedding <=> $1) > 0.7
    ORDER BY embedding <=> $1
    LIMIT 5
  `, [queryEmbedding]);
  
  return similarChunks.map(chunk => chunk.content).join('\n\n');
}
```

**Qdrant (Recommended for Production):**
```typescript
import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({ url: 'http://localhost:6333' });

export async function getRelevantContextFromQdrant(userQuery: string): Promise<string> {
  const queryEmbedding = await generateEmbedding(userQuery);
  
  const searchResult = await client.search('document_chunks', {
    vector: queryEmbedding,
    limit: 5,
    score_threshold: 0.7
  });
  
  return searchResult.map(result => result.payload.content).join('\n\n');
}
```

**Chroma (Great for Development):**
```typescript
import { ChromaClient } from 'chromadb';

const client = new ChromaClient();
const collection = client.getCollection('document_chunks');

export async function getRelevantContextFromChroma(userQuery: string): Promise<string> {
  const queryEmbedding = await generateEmbedding(userQuery);
  
  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 5
  });
  
  return results.documents[0].join('\n\n');
}
```

**Neon (Serverless PostgreSQL):**
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function getRelevantContextFromNeon(userQuery: string): Promise<string> {
  const queryEmbedding = await generateEmbedding(userQuery);
  
  const result = await pool.query(`
    SELECT content, metadata, 
           1 - (embedding <=> $1) as similarity
    FROM document_chunks 
    WHERE 1 - (embedding <=> $1) > 0.7
    ORDER BY embedding <=> $1
    LIMIT 5
  `, [queryEmbedding]);
  
  return result.rows.map(row => row.content).join('\n\n');
}
```

**Supabase (Managed PostgreSQL):**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function getRelevantContextFromSupabase(userQuery: string): Promise<string> {
  const queryEmbedding = await generateEmbedding(userQuery);
  
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: 5
  });
  
  if (error) throw error;
  return data.map((doc: any) => doc.content).join('\n\n');
}
```

#### Benefits for This Project

- **Better Context Retrieval**: More precise matching of user questions to relevant book content
- **Dynamic Content**: Easily add new chapters, articles, or notes without code changes
- **Performance**: Faster retrieval for large document collections
- **Analytics**: Track which content is most relevant to user queries

#### Open Source Comparison

| Database | Ease of Setup | Performance | Scalability | Best For |
|----------|---------------|-------------|-------------|----------|
| **Chroma** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | Development, prototyping |
| **Qdrant** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Production, high performance |
| **Weaviate** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | GraphQL APIs, semantic search |
| **PostgreSQL + pgvector** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Existing PostgreSQL users |
| **Supabase** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Managed solution, easy deployment |
| **Milvus** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Large-scale AI applications |

#### Quick Start Recommendations

**For Development/Prototyping:**
- **Neon**: Serverless PostgreSQL with pgvector, easiest managed option
- **Chroma**: Easiest to set up locally, great for learning
- **Supabase**: Managed PostgreSQL with pgvector, no server management

**For Production:**
- **Qdrant**: Best performance, excellent documentation
- **PostgreSQL + pgvector**: If you already use PostgreSQL

**For Large Scale:**
- **Milvus**: Designed for massive vector datasets
- **Weaviate**: If you need GraphQL and semantic search

#### Migration Path

1. Start with the current file-based approach
2. Add vector database as an optional enhancement
3. Gradually migrate content to the database
4. A/B test retrieval quality improvements

### Audio Summary

1.  **Add Audio File**: Place your `book-summary.wav` file in the `public/audio/` directory.
2.  **Update Transcript**: Edit the transcript in `src/components/AudioSummary.tsx` to match your audio.
3.  **Recommended Tools**: You can use tools like NotebookLM, ElevenLabs, or OpenAI TTS to generate audio from your summaries.

### Network Visualization Data

The network visualizations are powered by static data in `src/lib/networkDiagramData.ts`. You can customize the graphs by editing this file to add or modify nodes and relationships.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview the build
npm run preview
```

## Deployment on Netlify

The application is optimized for Netlify deployment:

1.  **Connect Repository**: In your Netlify dashboard, select "New site from Git" and connect your repository.
2.  **Build Settings**:
    -   Build command: `npm run build`
    -   Publish directory: `dist`
3.  **Environment Variables**: Add `VITE_GEMINI_API_KEY` in your site settings.
4.  **Deploy**: Push to your main branch to trigger automatic deployment.

## Troubleshooting

-   **AI Discussion Not Working on Netlify**: This is usually due to missing environment variables. Make sure to add `VITE_GEMINI_API_KEY` in your Netlify site settings under **Site settings** → **Environment variables**.
-   **Gemini API Key Error**: Ensure your API key is correct, has the proper permissions, and that the environment variable in your `.env` file is prefixed with `VITE_`.
-   **Audio Not Playing**: Check that your `.wav` file is in the `public/audio/` directory and that there are no errors in the browser console.
-   **Network Visualization Issues**: Make sure all dependencies are installed (`npm install`) and that your browser supports WebGL for the 3D visualization.

## Contributing

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Make your changes
4.  Commit your changes (`git commit -m 'Add amazing feature'`)
5.  Push to the branch (`git push origin feature/amazing-feature`)
6.  Open a Pull Request

## License

MIT License - see LICENSE file for details
