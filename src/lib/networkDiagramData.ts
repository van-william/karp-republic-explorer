// Simple concept data for "The Technological Republic" network visualization
// Easy to modify - just update this file to change the network

export interface GraphNode {
  id: string;
  label: string;
  type: 'Concept' | 'Actor' | 'Technology' | 'Event';
  description?: string;
  color?: string;
  size?: number;
}

export interface GraphRelationship {
  id: string;
  source: string;
  target: string;
  type: 'INFLUENCES' | 'ENABLES' | 'CHALLENGES' | 'REINFORCES' | 'OPPOSES';
  description?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
}

// Sample data for "The Technological Republic"
export const conceptData: GraphData = {
  nodes: [
    // Core Concepts
    { 
      id: 'soft-belief', 
      label: 'Soft Belief', 
      type: 'Concept', 
      description: 'Framework for understanding modern ideological structures and how they shape behavior without explicit coercion',
      color: '#3B82F6', 
      size: 20 
    },
    { 
      id: 'data-sovereignty', 
      label: 'Data Sovereignty', 
      type: 'Concept', 
      description: 'Control over data flows and digital infrastructure as a form of national power',
      color: '#3B82F6', 
      size: 20 
    },
    { 
      id: 'technological-power', 
      label: 'Technological Power', 
      type: 'Concept', 
      description: 'How technology reshapes power structures and creates new forms of influence',
      color: '#3B82F6', 
      size: 20 
    },
    { 
      id: 'digital-transformation', 
      label: 'Digital Transformation', 
      type: 'Concept', 
      description: 'Society-wide changes driven by digital technology adoption',
      color: '#3B82F6', 
      size: 18 
    },
    
    // Actors
    { 
      id: 'western-democracies', 
      label: 'Western Democracies', 
      type: 'Actor', 
      description: 'Democratic nations facing technological challenges and competition',
      color: '#10B981', 
      size: 18 
    },
    { 
      id: 'authoritarian-regimes', 
      label: 'Authoritarian Regimes', 
      type: 'Actor', 
      description: 'Authoritarian states using technology for control and surveillance',
      color: '#10B981', 
      size: 18 
    },
    { 
      id: 'tech-companies', 
      label: 'Tech Companies', 
      type: 'Actor', 
      description: 'Large technology corporations with significant influence over digital infrastructure',
      color: '#10B981', 
      size: 16 
    },
    
    // Technologies
    { 
      id: 'social-media', 
      label: 'Social Media', 
      type: 'Technology', 
      description: 'Platforms that shape belief formation and information dissemination',
      color: '#F59E0B', 
      size: 16 
    },
    { 
      id: 'ai-systems', 
      label: 'AI Systems', 
      type: 'Technology', 
      description: 'Artificial intelligence and machine learning systems',
      color: '#F59E0B', 
      size: 16 
    },
    { 
      id: 'digital-infrastructure', 
      label: 'Digital Infrastructure', 
      type: 'Technology', 
      description: 'Core digital systems, networks, and platforms',
      color: '#F59E0B', 
      size: 16 
    },
    { 
      id: 'surveillance-tech', 
      label: 'Surveillance Technology', 
      type: 'Technology', 
      description: 'Technologies used for monitoring and control',
      color: '#F59E0B', 
      size: 14 
    },
    
    // Events
    { 
      id: 'information-warfare', 
      label: 'Information Warfare', 
      type: 'Event', 
      description: 'Conflict through information manipulation and disinformation',
      color: '#EF4444', 
      size: 14 
    },
    { 
      id: 'data-breaches', 
      label: 'Data Breaches', 
      type: 'Event', 
      description: 'Security incidents involving unauthorized access to data',
      color: '#EF4444', 
      size: 12 
    },
    { 
      id: 'algorithmic-bias', 
      label: 'Algorithmic Bias', 
      type: 'Event', 
      description: 'Systematic discrimination in automated decision-making systems',
      color: '#EF4444', 
      size: 12 
    }
  ],
  relationships: [
    // Soft Belief connections
    { 
      id: '1', 
      source: 'soft-belief', 
      target: 'social-media', 
      type: 'INFLUENCES', 
      description: 'Social media platforms shape soft belief formation through algorithmic curation' 
    },
    { 
      id: '2', 
      source: 'digital-transformation', 
      target: 'soft-belief', 
      type: 'INFLUENCES', 
      description: 'Digital transformation influences belief systems and social norms' 
    },
    { 
      id: '3', 
      source: 'ai-systems', 
      target: 'soft-belief', 
      type: 'INFLUENCES', 
      description: 'AI systems can influence belief formation through personalized content' 
    },
    
    // Data Sovereignty connections
    { 
      id: '4', 
      source: 'data-sovereignty', 
      target: 'western-democracies', 
      type: 'CHALLENGES', 
      description: 'Data sovereignty challenges democratic governance and privacy rights' 
    },
    { 
      id: '5', 
      source: 'data-sovereignty', 
      target: 'tech-companies', 
      type: 'CHALLENGES', 
      description: 'Data sovereignty challenges tech company business models' 
    },
    { 
      id: '6', 
      source: 'digital-infrastructure', 
      target: 'data-sovereignty', 
      type: 'ENABLES', 
      description: 'Digital infrastructure enables data sovereignty through control mechanisms' 
    },
    
    // Technological Power connections
    { 
      id: '7', 
      source: 'ai-systems', 
      target: 'technological-power', 
      type: 'REINFORCES', 
      description: 'AI systems reinforce technological power structures' 
    },
    { 
      id: '8', 
      source: 'surveillance-tech', 
      target: 'technological-power', 
      type: 'REINFORCES', 
      description: 'Surveillance technology reinforces technological power through monitoring' 
    },
    { 
      id: '9', 
      source: 'tech-companies', 
      target: 'technological-power', 
      type: 'REINFORCES', 
      description: 'Tech companies reinforce technological power through platform control' 
    },
    
    // Information Warfare connections
    { 
      id: '10', 
      source: 'social-media', 
      target: 'information-warfare', 
      type: 'ENABLES', 
      description: 'Social media enables information warfare through rapid dissemination' 
    },
    { 
      id: '11', 
      source: 'information-warfare', 
      target: 'western-democracies', 
      type: 'CHALLENGES', 
      description: 'Information warfare challenges democratic discourse and trust' 
    },
    { 
      id: '12', 
      source: 'authoritarian-regimes', 
      target: 'information-warfare', 
      type: 'ENABLES', 
      description: 'Authoritarian regimes enable information warfare for control' 
    },
    
    // Opposition and Challenges
    { 
      id: '13', 
      source: 'authoritarian-regimes', 
      target: 'digital-infrastructure', 
      type: 'OPPOSES', 
      description: 'Authoritarian regimes oppose open digital infrastructure' 
    },
    { 
      id: '14', 
      source: 'algorithmic-bias', 
      target: 'western-democracies', 
      type: 'CHALLENGES', 
      description: 'Algorithmic bias challenges democratic principles of fairness' 
    },
    { 
      id: '15', 
      source: 'data-breaches', 
      target: 'data-sovereignty', 
      type: 'CHALLENGES', 
      description: 'Data breaches challenge data sovereignty and security' 
    }
  ]
};

// Helper function to get node color by type
export const getNodeColor = (type: string): string => {
  const colors = {
    'Concept': '#3B82F6', // Blue
    'Actor': '#10B981',   // Green
    'Technology': '#F59E0B', // Yellow
    'Event': '#EF4444'    // Red
  };
  return colors[type as keyof typeof colors] || '#6B7280';
};

// Helper function to get node size by type
export const getNodeSize = (type: string): number => {
  const sizes = {
    'Concept': 20,
    'Actor': 18,
    'Technology': 16,
    'Event': 14
  };
  return sizes[type as keyof typeof sizes] || 15;
}; 