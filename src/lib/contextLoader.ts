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

// Pre-loaded context files from actual markdown files
const contextFiles: ContextFile[] = [
  {
    filename: 'key-themes.md',
    content: `# Key Themes from "The Technological Republic" by Alex Karp

## Central Arguments

### Part 1: Software Century - The Loss of Purpose in Tech
- **Unmoored Engineering**: The current generation of software engineers has become disconnected from any core purpose or grander meaning in their work
- **Defense Avoidance**: Many engineers are hesitant to even consider defense applications, despite the internet's origins in DARPA
- **Lost Valley**: Silicon Valley has strayed from its tradition of collaboration with the US Government, focusing primarily on consumer markets
- **Historical Irony**: The foundational technologies (internet) came from defense programs, but such collaboration would be unthinkable today

### Part 2: Hollowing Out of the American Mind - Identity Crisis
- **Dismantling of Western Identity**: There has been a fundamental breakdown of American/Western identity and shared cultural foundation
- **Technological Agnosticism**: People build technology because they enjoy building, detached from purpose, outcomes, or broader meaning
- **Educational Erosion**: The removal of Western Civilization from curricula has created ambiguity about American purpose and identity
- **Cultural Drift**: The abandonment of Western Civilization has led to loose anchoring of American purpose and destination
- **Opposition Without Alternatives**: People oppose Defense/Government projects but struggle to articulate what they actually stand for

### Part 3: Engineering Mindset - Organizational Innovation
- **Rejection of Traditional Structure**: Palantir and tech startups have fundamentally rejected traditional corporate hierarchies
- **Creative Friction**: Embracing productive conflict and rejecting intellectual fragility as vital to growth
- **Pragmatic Results**: Skepticism of ideology in favor of pursuing tangible results and outcomes
- **Decentralized Leadership**: Learning from natural systems (like bee swarms) that operate without strict top-down control
- **Procurement Innovation**: The need for faster, more agile processes to serve modern defense and intelligence needs

### Part 4: Rebuilding the Technological Republic - Cultural Reassertion
- **Public Domain Engagement**: Silicon Valley's reluctance to enter critical public domains (medicine, education, law, defense)
- **National Culture Revival**: The necessity of reasserting national culture and values for technological leadership
- **Shared Purpose**: Rebuilding requires a clearer collective identity and common purpose
- **Hard Power vs Soft Power**: Balancing America's military/technological strength with cultural influence
- **Civic Renewal**: Moving from entertainment-based shared experiences back to civic and political engagement

## Key Philosophical Tensions

### Hard Power vs. Soft Power
- **Hard Power**: Military strength, sanctions, coercive force - areas where Karp believes the US is neglecting investment
- **Soft Power**: Persuasion, diplomacy, cultural influence - important but insufficient without hard power backing
- **Silicon Valley Misdirection**: Talent directed toward "trivial pursuits" rather than national strategic priorities

### Post-Nationalism vs. National Purpose
- **Luxury Beliefs**: Elite positions that sound virtuous but are only sustainable due to privileged circumstances
- **Cultural Relativism**: Academic ideas that undermine belief in America's shared culture and values
- **Global vs. National**: Tension between post-nationalist ideologies and the need for national cohesion

### Innovation vs. Tradition
- **Founder-Led Organizations**: The superiority of vision-driven companies over traditional management structures
- **Western Civilization**: The importance of historical grounding for future innovation
- **Aesthetic Unity**: The need for shared cultural experiences and civic rituals to bind society together

## Strategic Implications

### For Technology Companies
- Responsibility to engage with national strategic priorities
- Balance between innovation and civic duty
- Importance of purpose-driven rather than purely profit-driven development

### For Government
- Need for faster, more agile procurement processes
- Attraction of top talent through competitive compensation
- Integration of private sector innovation with public sector needs

### For Society
- Restoration of shared cultural foundations
- Balance between diversity and unity
- Renewed emphasis on civic engagement and national purpose

## Key Questions the Book Addresses

- How should democratic societies respond to technological authoritarianism?
- What role should the state play in regulating technology?
- How can Western democracies maintain their values while competing technologically?
- What is the relationship between technological innovation and democratic governance?`,
    lastModified: Date.now()
  },
  {
    filename: 'rough_notes.md',
    content: `## Rough Notes

- Silicon Valley has gone from a vanguard of defense innovation to shying away from any collaboration with DoD / military / primes / etc.
- We (US) seem to think it's low brow to work on defense projects in tech but let other countries do it
- We (US) are essentially funding NATO's security through our defense budget
- We (US) won World War 2 through supreme manufacturing capacity
- China is our biggest political adversary right now
- Top image recognition / facial recognition companies are mostly based outside the US
- <0.2% of the DoD budget is targeting Artificial Intelligence; this is a concern of priorities
- Hypothesis: The cost-plus contracts were necessary to galvanize US's industrial base to enable military capacity; however, this also was later unchecked and grew into an unhealthy military industrial complex.
- Similar to Zero to One by Peter Thiel, Karp talks a lot about America's view of indefinite Optimism. Contrasted to Europe's definite pessimism, there's this indefinite optimism in the US that the US will cotninue to be a leader / great country. This does not come passively.
- US curriculum also stopped teaching Western Civilization
    - This seemed like a minro chnage but overall, it was difficult to ascribe clear meaning or purpose of the US. US history was no longer anchored by Europe history.
    - This "deconstruction" of a coherent western civilization led to later ambiguity in purpose
- THe idea of technological agnostics
    - Technological Agnostics: people building stuff because it's interesting; divorced from any broader or greater purpose
    - Karp quotes the rising employment of finance and management consulting careers
    - Mixing technological agnosticism with a concentrated supply base — how will these concentrated companies remain accountable to the american public?
- The technological agnostic idea is also related to overall misdirection of tech in silicon valley
    - Peter Thiel said we wanted flying cars and space travel but instead we got 140 characters (twitter)
    - With the removal of western civilization, there's a lack of grounding in terms of American history; why did we get here? where did we come from?
- Consolidation of power is also a concern with this level of ambiguity and ambivalence towards applications of tech
- Hard power vs. soft power
    - Hard power is coercive
    - Soft power is influential
    - Hard Power examples:
        - Military strength
        - Sanctions
        - Compelling force
        - Immediate
    - Soft power
        - persuasion
        - public diplomacy
        - Foreign policy
    - Karp views that the US is neglecting hard power. Military spending and investment has been misguided
    - Silicon Valley has engaged with trivial pursuits
    - The decline in teaching western civilization teaching has created this; there's a lack of grounding in terms of the American purpose and focus; there's a sense of aimlessness and drifting with a lack of western civ.
- Usage of Data:
    - It's super interesting that people decried the usage of Palantir for national security (e.g., Police) despite usage abroad. For example, New Orleans Police were using Palantir to investigate murders but then protests started around a "Surveillance State" concern. However, the people that don't want this… what are they for? it's an odd pushback
- Post-Nationalism
    - Karp talks about how liberalism in the left almost considers our culture a post-nationalism.
    - **Erosion of Western Identity and Purpose**: Karp believes that post-nationalist ideas, particularly those stemming from academia, have led to a "pagan religion" infiltrating universities. He argues that this ideology incorrectly teaches that "the West is inferior" and has fostered a sense of cultural relativism that undermines the belief in America's shared culture and national identity.
    - Luxury Beliefs: Simply put: if you live in a gated community, you can support defunding the police because of your neighborhood's private security force. it's a luxury belief because you have less need of these public services.
- What remained after the dot com bubble burst: A new organizational model
    - Lesser known result of the dot com bubble was a new organizational model. reduced middle management layers. focus on impact and outcomes
    - Karp highlights how ambiguity and voids in leadership are actually good. it's interesting to see who steps up and leads. this is a natural form of leadership development.
    - Karp highlights how IBM and other larger organizations had devolved into a top-down monolithic org. the dot com bubble dramatically shook this up.
- Additional themes:
    - Very similar to Team of Teams, using the same WW1 / WW2 thinking to address terrorists  and improvised explosive devices would not work. Spending $100k to address a $200 explosive was not sustainable. The Army needed a new culture, new processes, and new tools. Palantir was a tool but also ushered in a new culture of enabling the right stakeholders with the right tools
- Military Procurement Process:
    - Karp gives the example of how complex and opaque the military procurement process can be: for the Gulf War, the Military required thousands of additional two-way radios. They had the best fighter jets, best weapons, best intelligence tools, but they fell apart becauase they didn't have enough radios.. why? they needed to procure them from Motorola but Motorola couldn't provide detailed costing information in order to go forward with the the procurement process. Because of this, the military had to later go through Japan's ministry of defense to procure the radios. This was insane.
    - Broader view: A lot of regulation was ideal for WW2 but has slowed down the US ever since.
        - cost-plus contracts: this was intended to accelerate production during WW2 from industrial companies not familiar with defense production
        - detailed cost accounting: this was the audit process for the cost-plus contracts, but now this had become a critical bottleneck in the procurement process.
- Bees and other animals:
    - In one chapter, Karp notes how several animals did not necessarily rely on a strict top-down order and structure. Everyone typically thikns of Bees as a hierarchical society with the Queen Bee on top. However, the bee movements and communications are actually fairly decentralized.
    - Similar to this, Karp notes how most orgs can retain at most 150 people. This was also quoted by Malcom Gladwell. (Seen in WL Gore and other companies too)
    - Larger orgs will require so many more layers of middle management
    - There is a large communication radius now with social media and digital forms of communication too which can distract from face to face communications
- Singapore
    - What a crazy event: a small island originally part of Malaysia which was originally a british colony eventually grows to become a globally influential country…
    - Singapore aims to pay its governemnt officials wages in line with the private sector in hopes of attracting top talent — Karp thinks that paying such influential people like Jerome Powell ~$190k is limiting the number of people who are actually pursuing these jobs.
    - Singapore made a key decision to have a focused language approach around Chinese and English. Before, there were 10-12 languages spoken (Hainanese, Shanghainese, etc.)
    - There's this balance of university and diversity. Has the left pushed for diversity so much in that it has abandoned any sense of university? There's even this push to be "post national" and "post American". is this too far?
- Founder Led Companies
    - Karp also talks about how founder led companies dominate. there's a founder mentality and vision. the Old VC way was to replace the founder with a traditional operating CEO around series B / C raises.
- An Aesthetic Point of View
    - Shared american experiences have moved from civic and political to entertainement, celebrities, sports, etc.
    - In some ways, Silicon Valley filled a void — it filled a void of a craving for build, have ownership of success, and a commitment to results.
    - Many nations affirm the value of shared cultural traditions, mythologies. overly nationalistic nations have risks but the opposite is also a risk.
- What do we need to re-embrace a technological republic?
    - re-embrace of the collective experience
    - shared purpose and identity
    - civic rituals capable of bringing us together

## Other books that had related themes:"

- Network State: some related ideas on hard power vs. soft power
- Abolition of Man: the removal of western civilization reminded me a lot about the whole facts vs. values and seeking to remove objective truth from curriculum
- Team of Teams: the bee movements and decentralized structures made me think a lot about bee movement and communications discussed in the book as well.`,
    lastModified: Date.now()
  },
  {
    filename: 'rough_chapter_summaries.md',
    content: `# Rough Chapter Summaries

## Chapter 1: The Software Century
- Discusses how software engineers have become disconnected from purpose
- Historical context of defense origins of the internet
- Silicon Valley's shift away from government collaboration

## Chapter 2: The Hollowing Out of the American Mind
- Examines the breakdown of Western identity and cultural foundation
- Impact of removing Western Civilization from education
- Rise of technological agnosticism

## Chapter 3: The Engineering Mindset
- Palantir's organizational philosophy
- Rejection of traditional corporate hierarchies
- Importance of creative friction and decentralized leadership

## Chapter 4: Rebuilding the Technological Republic
- Need for public domain engagement
- Balancing hard power with soft power
- Cultural reassertion and civic renewal`,
    lastModified: Date.now()
  },
  {
    filename: 'hard-power_soft-power.md',
    content: `# Hard Power vs Soft Power

## Hard Power
- Military strength and capabilities
- Economic sanctions and coercion
- Direct force and immediate impact
- Areas where Karp believes the US is neglecting investment

## Soft Power
- Cultural influence and persuasion
- Diplomatic relationships
- Shared values and democratic principles
- Important but insufficient without hard power backing

## The Challenge
The West has traditionally relied on soft power but now faces competitors who combine both approaches effectively. Silicon Valley talent is directed toward "trivial pursuits" rather than national strategic priorities.`,
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