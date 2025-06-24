// networkDiagramData.ts
// Enhanced data structures for creating more meaningful network visualizations.
// This file contains the interfaces and sample data for the graph.

/**
 * Represents a single node in the network graph.
 */
export interface GraphNode {
  id: string;
  label: string;
  type: 'Concept' | 'Actor' | 'Technology' | 'Event' | 'Policy';
  description?: string;
  importance?: number; // A score from 1-10 to influence size or centrality
  tags?: string[]; // For filtering and additional context
  color?: string; // Overrides default color
  size?: number; // Overrides default size
}

/**
 * Represents a relationship (or edge) between two nodes.
 */
export interface GraphRelationship {
  id: string;
  source: string;
  target: string;
  type: 'INFLUENCES' | 'ENABLES' | 'CHALLENGES' | 'REINFORCES' | 'OPPOSES' | 'CREATES' | 'DEPENDS_ON' | 'CONTRADICTS';
  description?: string;
  weight?: number; // Represents the strength of the connection (e.g., 1 to 5)
}

/**
 * The main container for all graph data.
 */
export interface GraphData {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
}

// --- SAMPLE DATA for "The Technological Republic" ---
export const conceptData: GraphData = {
  nodes: [
    // Core Concepts
    { 
      id: 'soft-belief', 
      label: 'Soft Belief', 
      type: 'Concept', 
      description: 'Framework for understanding modern ideological structures that shape behavior without explicit coercion.',
      importance: 9,
      tags: ['ideology', 'sociology', 'power']
    },
    { 
      id: 'data-sovereignty', 
      label: 'Data Sovereignty', 
      type: 'Concept', 
      description: 'The assertion of control over data flows and digital infrastructure as a form of national power.',
      importance: 8,
      tags: ['geopolitics', 'data', 'governance']
    },
    { 
      id: 'technological-power', 
      label: 'Technological Power', 
      type: 'Concept', 
      description: 'How technology reshapes power structures, creating new forms of influence and control.',
      importance: 10,
      tags: ['power', 'technology', 'geopolitics']
    },
    { 
      id: 'digital-transformation', 
      label: 'Digital Transformation', 
      type: 'Concept', 
      description: 'The society-wide changes driven by the adoption of digital technology.',
      importance: 7,
      tags: ['society', 'technology', 'economy']
    },
    {
      id: 'digital-public-sphere',
      label: 'Digital Public Sphere',
      type: 'Concept',
      description: 'Online spaces where political and social discourse occurs, shaping public opinion.',
      importance: 8,
      tags: ['discourse', 'politics', 'society']
    },

    // Actors
    { 
      id: 'western-democracies', 
      label: 'Western Democracies', 
      type: 'Actor', 
      description: 'Democratic nations navigating technological challenges and global competition.',
      importance: 8,
      tags: ['state-actor', 'governance']
    },
    { 
      id: 'authoritarian-regimes', 
      label: 'Authoritarian Regimes', 
      type: 'Actor', 
      description: 'States leveraging technology for centralized control, surveillance, and influence operations.',
      importance: 8,
      tags: ['state-actor', 'governance']
    },
    { 
      id: 'tech-companies', 
      label: 'Tech Companies', 
      type: 'Actor', 
      description: 'Multinational corporations that build and control key digital infrastructure and platforms.',
      importance: 9,
      tags: ['corporate-actor', 'economy']
    },
    
    // Technologies
    { 
      id: 'social-media', 
      label: 'Social Media', 
      type: 'Technology', 
      description: 'Platforms that mediate information dissemination and social interaction.',
      importance: 9,
      tags: ['communication', 'platform']
    },
    { 
      id: 'ai-systems', 
      label: 'AI Systems', 
      type: 'Technology', 
      description: 'Artificial intelligence and machine learning that power automation and personalization.',
      importance: 10,
      tags: ['automation', 'data-analysis']
    },
    { 
      id: 'digital-infrastructure', 
      label: 'Digital Infrastructure', 
      type: 'Technology', 
      description: 'The core digital systems, networks, cloud services, and platforms.',
      importance: 8,
      tags: ['network', 'platform']
    },
    { 
      id: 'surveillance-tech', 
      label: 'Surveillance Tech', 
      type: 'Technology', 
      description: 'Technologies used for monitoring, tracking, and social control.',
      importance: 7,
      tags: ['control', 'security']
    },
    {
      id: 'cybersecurity-tech',
      label: 'Cybersecurity Tech',
      type: 'Technology',
      description: 'Technologies and practices designed to protect networks and data from attack.',
      importance: 6,
      tags: ['security', 'defense']
    },

    // Events
    { 
      id: 'information-warfare', 
      label: 'Information Warfare', 
      type: 'Event', 
      description: 'State-sponsored or organized conflict through information manipulation and disinformation.',
      importance: 8,
      tags: ['conflict', 'geopolitics']
    },
    { 
      id: 'algorithmic-bias', 
      label: 'Algorithmic Bias', 
      type: 'Event', 
      description: 'Systematic and repeatable errors in a computer system that create unfair outcomes.',
      importance: 6,
      tags: ['ethics', 'fairness']
    },

    // Policies & Regulations
    {
      id: 'data-privacy-laws',
      label: 'Data Privacy Laws',
      type: 'Policy',
      description: 'Regulations like GDPR and CCPA that govern data collection and use.',
      importance: 7,
      tags: ['governance', 'law', 'data']
    }
  ],
  relationships: [
    // Connections between Core Concepts
    { id: 'r1', source: 'technological-power', target: 'data-sovereignty', type: 'INFLUENCES', weight: 4 },
    { id: 'r2', source: 'digital-transformation', target: 'digital-public-sphere', type: 'CREATES', weight: 5 },
    { id: 'r3', source: 'soft-belief', target: 'digital-public-sphere', type: 'INFLUENCES', weight: 5 },

    // How technology enables concepts and actors
    { id: 'r4', source: 'ai-systems', target: 'technological-power', type: 'REINFORCES', weight: 5, description: 'AI capabilities are a primary driver of modern technological power.' },
    { id: 'r5', source: 'digital-infrastructure', target: 'data-sovereignty', type: 'ENABLES', weight: 4, description: 'Control over infrastructure is a prerequisite for data sovereignty.' },
    { id: 'r6', source: 'social-media', target: 'soft-belief', type: 'REINFORCES', weight: 5, description: 'Social media algorithms shape belief systems at scale.' },
    { id: 'r7', source: 'surveillance-tech', target: 'authoritarian-regimes', type: 'ENABLES', weight: 5 },
    { id: 'r8', source: 'social-media', target: 'information-warfare', type: 'ENABLES', weight: 4 },
    
    // Challenges and Oppositions
    { id: 'r9', source: 'data-sovereignty', target: 'tech-companies', type: 'CHALLENGES', weight: 4, description: 'National data sovereignty policies can fragment the global market for tech companies.' },
    { id: 'r10', source: 'information-warfare', target: 'western-democracies', type: 'CHALLENGES', weight: 5, description: 'Disinformation campaigns erode trust in democratic institutions.' },
    { id: 'r11', source: 'algorithmic-bias', target: 'ai-systems', type: 'CHALLENGES', weight: 3, description: 'Bias is a fundamental technical and ethical challenge in AI development.' },
    { id: 'r12', source: 'western-democracies', target: 'authoritarian-regimes', type: 'OPPOSES', weight: 4 },
    { id: 'r13', source: 'cybersecurity-tech', target: 'information-warfare', type: 'OPPOSES', weight: 3 },

    // Policy and Regulation Connections
    { id: 'r14', source: 'data-privacy-laws', target: 'tech-companies', type: 'CHALLENGES', weight: 4, description: 'Privacy laws impose compliance costs and restrict data collection practices.' },
    { id: 'r15', source: 'data-privacy-laws', target: 'data-sovereignty', type: 'REINFORCES', weight: 3 },
    { id: 'r16', source: 'western-democracies', target: 'data-privacy-laws', type: 'CREATES', weight: 4 }
  ]
};


// --- HELPER FUNCTIONS ---

/**
 * Provides a default color based on the node's type.
 * @param type The type of the node.
 * @returns A hex color string.
 */
export const getNodeColor = (type: GraphNode['type']): string => {
  const colors = {
    'Concept': '#3B82F6',    // Blue
    'Actor': '#10B981',      // Green
    'Technology': '#F59E0B', // Amber
    'Event': '#EF4444',      // Red
    'Policy': '#8B5CF6',     // Violet
  };
  return colors[type] || '#6B7280'; // Default to gray
};

/**
 * Provides a default size based on the node's importance score.
 * @param importance The importance score of the node (1-10).
 * @returns A numerical size for the node.
 */
export const getNodeSize = (importance: number = 5): number => {
  return 10 + (importance * 2); // Base size 10, scales up to 30
};

/**
 * Provides a color for a relationship link based on its type.
 * @param type The type of the relationship.
 * @returns A hex color string.
 */
export const getLinkColor = (type: GraphRelationship['type']): string => {
    const colors = {
        'INFLUENCES': '#6B7280',    // Gray
        'ENABLES': '#10B981',       // Green
        'CHALLENGES': '#F59E0B',    // Amber
        'REINFORCES': '#3B82F6',    // Blue
        'OPPOSES': '#EF4444',       // Red
        'CREATES': '#8B5CF6',       // Violet
        'DEPENDS_ON': '#9CA3AF',    // Light Gray
        'CONTRADICTS': '#F87171',   // Light Red
    };
    return colors[type] || '#6B7280';
}; 