// Context loader for markdown files with embeddings support
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ContextFile {
  filename: string;
  content: string;
  relevanceScore?: number;
  lastModified?: number;
  embedding?: number[];
}

interface EmbeddingCache {
  [filename: string]: {
    embedding: number[];
    lastModified: number;
  };
}

// Initialize Google AI with Vite environment variable
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Simple in-memory cache for embeddings
let embeddingCache: EmbeddingCache = {};

// Dynamic context loading from /context directory
async function loadContextFiles(): Promise<ContextFile[]> {
  try {
    const contextDir = path.join(process.cwd(), 'context');
    const files = fs.readdirSync(contextDir);
    
    const contextFiles: ContextFile[] = [];
    
    for (const file of files) {
      // Skip README.md and non-markdown files
      if (file === 'README.md' || !file.endsWith('.md')) {
        continue;
      }
      
      const filePath = path.join(contextDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const stats = fs.statSync(filePath);
      
      contextFiles.push({
        filename: file,
        content: content,
        lastModified: stats.mtime.getTime()
      });
    }
    
    console.log(`Loaded ${contextFiles.length} context files:`, contextFiles.map(f => f.filename));
    return contextFiles;
  } catch (error) {
    console.error('Error loading context files:', error);
    return [];
  }
}

// Generate embeddings for content using Google GenAI
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-embedding-exp-03-07' });
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

// Get embeddings for context files (with caching)
async function getContextEmbeddings(contextFiles: ContextFile[]): Promise<ContextFile[]> {
  const filesWithEmbeddings: ContextFile[] = [];
  
  for (const file of contextFiles) {
    const cacheKey = file.filename;
    const cached = embeddingCache[cacheKey];
    
    // Check if we have a valid cached embedding
    if (cached && cached.lastModified === file.lastModified) {
      filesWithEmbeddings.push({
        ...file,
        embedding: cached.embedding
      });
    } else {
      // Generate new embedding
      const embedding = await generateEmbedding(file.content);
      embeddingCache[cacheKey] = {
        embedding,
        lastModified: file.lastModified!
      };
      
      filesWithEmbeddings.push({
        ...file,
        embedding
      });
    }
  }
  
  return filesWithEmbeddings;
}

// Calculate relevance using embeddings (semantic search)
async function calculateSemanticRelevance(userQuery: string, contextFiles: ContextFile[]): Promise<ContextFile[]> {
  // Generate embedding for user query
  const queryEmbedding = await generateEmbedding(userQuery);
  
  if (queryEmbedding.length === 0) {
    // Fallback to keyword search if embedding fails
    return contextFiles.map(file => ({
      ...file,
      relevanceScore: calculateKeywordRelevance(userQuery, file.content)
    }));
  }
  
  // Calculate semantic similarity for each context file
  return contextFiles.map(file => ({
    ...file,
    relevanceScore: file.embedding ? cosineSimilarity(queryEmbedding, file.embedding) : 0
  }));
}

// Fallback keyword-based relevance scoring
function calculateKeywordRelevance(userQuery: string, content: string): number {
  const queryWords = userQuery.toLowerCase().split(/\s+/);
  const contentWords = content.toLowerCase().split(/\s+/);
  
  let score = 0;
  queryWords.forEach(word => {
    if (word.length > 3) { // Only count meaningful words
      const matches = contentWords.filter(cWord => cWord.includes(word)).length;
      score += matches;
    }
  });
  
  return score;
}

// Get relevant context for a user query
export async function getRelevantContext(userQuery: string, maxContext: number = 2000): Promise<string> {
  // Load context files dynamically
  const contextFiles = await loadContextFiles();
  
  // Get embeddings for all context files
  const filesWithEmbeddings = await getContextEmbeddings(contextFiles);
  
  // Calculate semantic relevance
  const scoredFiles = await calculateSemanticRelevance(userQuery, filesWithEmbeddings);
  
  // Sort by relevance and take the most relevant
  const relevantFiles = scoredFiles
    .filter(file => file.relevanceScore! > 0)
    .sort((a, b) => b.relevanceScore! - a.relevanceScore!);
  
  if (relevantFiles.length === 0) {
    return '';
  }
  
  // Combine context, respecting token limits
  let combinedContext = '';
  let currentLength = 0;
  
  for (const file of relevantFiles) {
    if (currentLength + file.content.length > maxContext) {
      break;
    }
    combinedContext += `\n\n## From ${file.filename}:\n${file.content}`;
    currentLength += file.content.length;
  }
  
  console.log(`Found ${relevantFiles.length} relevant files for query: "${userQuery}"`);
  return combinedContext;
}

// Clear embedding cache (useful for development)
export function clearEmbeddingCache(): void {
  embeddingCache = {};
} 