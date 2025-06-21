// Context loader for markdown files
interface ContextFile {
  filename: string;
  content: string;
  relevanceScore?: number;
}

// In a real implementation, you might want to pre-load these at build time
// For now, we'll simulate loading context files
const mockContextFiles: ContextFile[] = [
  {
    filename: 'key-themes.md',
    content: `# Key Themes from "The Technological Republic"

## Central Arguments

### Technological Power and Governance
- The book explores how technological capabilities reshape power structures
- Emphasis on the relationship between technology and democratic governance
- Analysis of how digital infrastructure affects sovereignty

### Soft Belief Systems
- Concept of "soft belief" as a framework for understanding modern ideological structures
- How technology influences belief formation and propagation
- The role of information systems in shaping public opinion

### Western Democratic Challenges
- Specific challenges facing Western democracies in the digital age
- Competition with authoritarian technological models
- The need for democratic adaptation to technological change

### Data and Geopolitics
- Data as a new form of geopolitical resource
- The importance of data sovereignty
- How data flows affect international relations

## Key Questions the Book Addresses

- How should democratic societies respond to technological authoritarianism?
- What role should the state play in regulating technology?
- How can Western democracies maintain their values while competing technologically?
- What is the relationship between technological innovation and democratic governance?`
  },
  {
    filename: 'soft-belief.md',
    content: `# Soft Belief Systems

## Definition and Core Concept

"Soft belief" represents a framework for understanding how beliefs are formed and maintained in the digital age, distinct from traditional "hard" ideological structures.

## Key Characteristics

### Flexibility and Adaptability
- Unlike rigid ideological systems, soft beliefs can evolve and adapt
- Responsive to new information and changing circumstances
- Allows for nuanced positions rather than binary thinking

### Information-Based Formation
- Beliefs shaped by information flows and digital environments
- Influenced by algorithmic curation and social media ecosystems
- Subject to manipulation through information warfare

### Democratic Implications
- Affects how democratic societies form consensus
- Challenges traditional political organizing models
- Creates opportunities and vulnerabilities for democratic discourse

## Relationship to Technology

### Digital Influence
- Social media platforms shape belief formation
- Algorithmic recommendations affect what information people see
- Echo chambers and filter bubbles reinforce existing beliefs

### Information Warfare
- Soft beliefs can be targeted and manipulated
- Foreign influence operations exploit flexible belief systems
- Disinformation campaigns more effective against soft belief structures

## Strategic Considerations

### For Democratic Societies
- Need to understand and work with soft belief systems
- Importance of information literacy and critical thinking
- Balancing openness with protection against manipulation

### For Policy Makers
- Traditional propaganda models insufficient
- Need new approaches to counter disinformation
- Importance of building resilient information ecosystems`
  }
];

// Simple keyword-based relevance scoring
function calculateRelevance(userQuery: string, content: string): number {
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
export function getRelevantContext(userQuery: string, maxContext: number = 2000): string {
  // Score all context files
  const scoredFiles = mockContextFiles.map(file => ({
    ...file,
    relevanceScore: calculateRelevance(userQuery, file.content)
  }));
  
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
  
  return combinedContext;
}

// TODO: In a real implementation, you would:
// 1. Load actual markdown files from the context directory
// 2. Use a more sophisticated similarity search (embeddings)
// 3. Cache loaded files for performance
// 4. Support file watching for updates 