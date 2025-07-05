// Context loader for markdown files with client-side support
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

// Pre-loaded context files for client-side use
const contextFiles: ContextFile[] = [
  {
    filename: 'key-themes.md',
    content: `# Key Themes from "The Technological Republic"

## Technological Power and Democracy
- The West faces unprecedented challenges from technological competitors
- Traditional democratic institutions struggle to adapt to rapid technological change
- The need for a new framework that balances innovation with democratic values

## Soft Belief vs Hard Power
- "Soft belief" refers to the West's reliance on ideological and moral authority
- Contrasts with "hard power" approaches used by authoritarian regimes
- The West must develop new forms of technological power while maintaining democratic principles

## Data and Geopolitics
- Data has become a critical strategic resource
- Control of data infrastructure shapes global power dynamics
- The West must develop competitive data strategies

## Innovation and Competition
- The importance of maintaining technological leadership
- Balancing open innovation with strategic interests
- The role of private sector in national security

## Democratic Adaptation
- How democratic societies can adapt to technological change
- The need for new governance models
- Preserving democratic values in the digital age`,
    lastModified: Date.now()
  },
  {
    filename: 'rough_notes.md',
    content: `# Rough Notes on "The Technological Republic"

## Main Arguments
- The West is losing its technological edge to authoritarian competitors
- Democratic institutions are ill-equipped for the pace of technological change
- A new framework is needed that combines innovation with democratic values

## Key Concepts
- **Technological Republic**: A new form of governance that leverages technology for democratic ends
- **Soft Belief**: The West's reliance on ideological authority rather than technological power
- **Hard Power**: Direct technological and military capabilities used by authoritarian regimes

## Challenges Identified
1. **Pace of Change**: Technology evolves faster than democratic institutions can adapt
2. **Competition**: Authoritarian regimes can move faster and take more risks
3. **Values**: Balancing innovation with democratic principles and human rights
4. **Coordination**: Fragmented approach to technological development in the West

## Proposed Solutions
- Develop new governance models that can adapt to rapid change
- Invest in strategic technologies while maintaining democratic oversight
- Create frameworks for public-private cooperation in national security
- Build technological capabilities that serve democratic values`,
    lastModified: Date.now()
  },
  {
    filename: 'hard-power_soft-power.md',
    content: `# Hard Power vs Soft Power in "The Technological Republic"

## Soft Power (Soft Belief)
- **Definition**: The West's reliance on ideological, moral, and cultural authority
- **Characteristics**:
  - Based on attraction and persuasion rather than coercion
  - Relies on shared values and democratic principles
  - Emphasizes international cooperation and multilateralism
- **Limitations**:
  - Less effective against authoritarian regimes that don't share these values
  - Slow to adapt to rapid technological change
  - Vulnerable to technological disruption

## Hard Power
- **Definition**: Direct technological, economic, and military capabilities
- **Characteristics**:
  - Based on tangible capabilities and force
  - Can be deployed rapidly and decisively
  - Effective against immediate threats
- **Examples in the book**:
  - China's technological development programs
  - Russia's cyber capabilities
  - Authoritarian regimes' ability to move quickly on technology

## The Challenge
The West has traditionally relied on soft power but now faces competitors who combine soft and hard power approaches. The book argues that the West needs to develop new forms of technological power while maintaining its democratic values.

## The Solution
A "Technological Republic" that:
- Develops hard technological capabilities
- Maintains democratic oversight and values
- Creates new governance models for rapid adaptation
- Balances innovation with ethical considerations`,
    lastModified: Date.now()
  },
  {
    filename: 'wall_st_journal_article.md',
    content: `# Wall Street Journal Article on Alex Karp

## Key Points from the Article

### Karp's Background and Philosophy
- CEO of Palantir Technologies
- Strong advocate for American technological leadership
- Believes in the importance of maintaining competitive advantage

### Views on AI and Competition
- AI systems will raise the floor of capabilities significantly
- Forces everyone to "do something unique, creative"
- Uses jazz metaphor of finding one's distinctive "blue note"
- Compares to long-range shooting: operating "outside the range of what a human can do"

### Support for Israel
- Unapologetic support for Israel and doing business with its government
- Acknowledges the risks for a publicly traded company
- Believes in taking principled stands even when controversial

### Business Philosophy
- Emphasizes the importance of hitting targets
- Believes value comes from operating beyond human capabilities
- Combines technological innovation with strategic thinking

### Response to October 7th Attack
- Coordinated efforts to help Israel after the attack
- Noted the rapid emergence of anti-Israel protests
- Demonstrates his commitment to action over rhetoric

## Relevance to "The Technological Republic"
This article shows Karp's practical application of the principles he discusses in his book - combining technological capability with strategic thinking and taking principled stands in the face of global challenges.`,
    lastModified: Date.now()
  }
];

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
  // Use pre-loaded context files
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