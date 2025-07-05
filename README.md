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

# Edit .env and add your Gemini API key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Getting a Gemini API Key:**

1.  Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2.  Sign in with your Google account
3.  Click "Create API Key"
4.  Copy the key and add it to your `.env` file

**Important for Netlify Deployment:**

The AI discussion feature requires the `VITE_GEMINI_API_KEY` environment variable to be set in your Netlify site settings:

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add a new variable:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Gemini API key
5. Save and redeploy your site

## Content Management

### AI Context Files

This application uses markdown files in the `context/` directory to provide contextual information to the AI chat.

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

**Alternative Vector Databases:**
- **Pinecone**: Managed vector database with excellent performance
- **Weaviate**: Open-source vector database with GraphQL API
- **Qdrant**: High-performance vector database with filtering
- **Chroma**: Lightweight, embeddable vector database

#### Integration Steps

1. **Chunk Your Documents**: Split markdown files into smaller, meaningful chunks
2. **Generate Embeddings**: Use the same embedding model (gemini-embedding-exp-03-07) for consistency
3. **Store in Database**: Insert chunks with their embeddings and metadata
4. **Update Retrieval Logic**: Replace the current context loading with database queries

#### Example Implementation

```typescript
// Enhanced context loader with vector database
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

#### Benefits for This Project

- **Better Context Retrieval**: More precise matching of user questions to relevant book content
- **Dynamic Content**: Easily add new chapters, articles, or notes without code changes
- **Performance**: Faster retrieval for large document collections
- **Analytics**: Track which content is most relevant to user queries

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
