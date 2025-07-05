// Context loader for Neon database with client-side support
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ContextChunk {
  id: number;
  content: string;
  metadata: Record<string, unknown>;
  source_file: string;
  chunk_index: number;
  relevanceScore?: number;
}

interface EmbeddingCache {
  [query: string]: {
    embedding: number[];
    timestamp: number;
  };
}

// Initialize Google AI with Vite environment variable
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Simple in-memory cache for embeddings
let embeddingCache: EmbeddingCache = {};

// Neon database connection (for client-side, we use the Netlify function)
// The actual DATABASE_URL is set in Netlify environment variables

// Generate embeddings for content using Google GenAI
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    return [];
  }
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Query Neon database for relevant chunks using vector similarity
async function queryNeonDatabase(queryEmbedding: number[], limit: number = 5): Promise<ContextChunk[]> {

  try {
    // For client-side, we'll need to use a serverless function or API endpoint
    // For now, we'll implement a simple fetch to a hypothetical API endpoint
    const response = await fetch('/api/search-context', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embedding: queryEmbedding,
        limit: limit
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const chunks: ContextChunk[] = await response.json();
    return chunks;
  } catch (error) {
    console.error('Error querying Neon database:', error);
    return [];
  }
}

// Get relevant context for a user query
export async function getRelevantContext(userQuery: string, maxContext: number = 2000): Promise<string> {
  // Check cache for query embedding
  const cacheKey = userQuery.toLowerCase().trim();
  const cached = embeddingCache[cacheKey];
  
  let queryEmbedding: number[];
  
  if (cached && (Date.now() - cached.timestamp) < 300000) { // 5 minute cache
    queryEmbedding = cached.embedding;
  } else {
    // Generate new embedding for the query
    queryEmbedding = await generateEmbedding(userQuery);
    
    if (queryEmbedding.length === 0) {
      console.warn('Failed to generate embedding for query, returning empty context');
      return '';
    }
    
    // Cache the embedding
    embeddingCache[cacheKey] = {
      embedding: queryEmbedding,
      timestamp: Date.now()
    };
  }

  // Query the database for relevant chunks
  const relevantChunks = await queryNeonDatabase(queryEmbedding, 10);
  
  if (relevantChunks.length === 0) {
    console.log('No relevant chunks found in database');
    return '';
  }

  // Sort by relevance score
  const sortedChunks = relevantChunks.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  
  // Combine context, respecting token limits
  let combinedContext = '';
  let currentLength = 0;
  
  for (const chunk of sortedChunks) {
    if (currentLength + chunk.content.length > maxContext) {
      break;
    }
    combinedContext += `\n\n## From ${chunk.source_file} (chunk ${chunk.chunk_index}):\n${chunk.content}`;
    currentLength += chunk.content.length;
  }
  
  console.log(`Found ${relevantChunks.length} relevant chunks for query: "${userQuery}"`);
  return combinedContext;
}

// Clear embedding cache (useful for development)
export function clearEmbeddingCache(): void {
  embeddingCache = {};
}

// Fallback function for when database is not available
export async function getFallbackContext(userQuery: string): Promise<string> {
  // This could return some basic context or empty string
  return '';
} 