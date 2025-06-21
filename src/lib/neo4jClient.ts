import neo4j, { Driver, Session, Record } from 'neo4j-driver';

// Types for our graph data
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

class Neo4jClient {
  private driver: Driver | null = null;
  private isConnected = false;

  constructor() {
    // Initialize with default connection (will be set up later)
  }

  async connect(uri: string = 'bolt://localhost:7687', username: string = 'neo4j', password: string = 'neo4j'): Promise<boolean> {
    try {
      this.driver = neo4j.driver(uri, neo4j.auth.basic(username, password));
      
      // Test the connection
      const session = this.driver.session();
      await session.run('RETURN 1 as test');
      await session.close();
      
      this.isConnected = true;
      console.log('Successfully connected to Neo4j');
      return true;
    } catch (error) {
      console.error('Failed to connect to Neo4j:', error);
      this.isConnected = false;
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.driver) {
      await this.driver.close();
      this.driver = null;
      this.isConnected = false;
    }
  }

  async isDatabaseConnected(): Promise<boolean> {
    if (!this.driver) return false;
    
    try {
      const session = this.driver.session();
      await session.run('RETURN 1 as test');
      await session.close();
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }

  // Initialize the database with sample data for "The Technological Republic"
  async initializeDatabase(): Promise<void> {
    if (!this.driver) throw new Error('Not connected to Neo4j');

    const session = this.driver.session();
    
    try {
      // Create constraints for unique nodes
      await session.run('CREATE CONSTRAINT concept_id IF NOT EXISTS FOR (c:Concept) REQUIRE c.id IS UNIQUE');
      await session.run('CREATE CONSTRAINT actor_id IF NOT EXISTS FOR (a:Actor) REQUIRE a.id IS UNIQUE');
      await session.run('CREATE CONSTRAINT technology_id IF NOT EXISTS FOR (t:Technology) REQUIRE t.id IS UNIQUE');
      await session.run('CREATE CONSTRAINT event_id IF NOT EXISTS FOR (e:Event) REQUIRE e.id IS UNIQUE');

      // Create sample nodes for "The Technological Republic"
      const sampleNodes = [
        // Concepts
        { id: 'soft-belief', label: 'Soft Belief', type: 'Concept', description: 'Framework for understanding modern ideological structures' },
        { id: 'data-sovereignty', label: 'Data Sovereignty', type: 'Concept', description: 'Control over data flows and digital infrastructure' },
        { id: 'technological-power', label: 'Technological Power', type: 'Concept', description: 'How technology reshapes power structures' },
        
        // Actors
        { id: 'western-democracies', label: 'Western Democracies', type: 'Actor', description: 'Democratic nations facing technological challenges' },
        { id: 'authoritarian-regimes', label: 'Authoritarian Regimes', type: 'Actor', description: 'Authoritarian states using technology for control' },
        
        // Technologies
        { id: 'social-media', label: 'Social Media', type: 'Technology', description: 'Platforms that shape belief formation' },
        { id: 'ai-systems', label: 'AI Systems', type: 'Technology', description: 'Artificial intelligence and machine learning' },
        { id: 'digital-infrastructure', label: 'Digital Infrastructure', type: 'Technology', description: 'Core digital systems and networks' },
        
        // Events
        { id: 'information-warfare', label: 'Information Warfare', type: 'Event', description: 'Conflict through information manipulation' },
        { id: 'digital-transformation', label: 'Digital Transformation', type: 'Event', description: 'Society-wide digital changes' }
      ];

      // Create nodes
      for (const node of sampleNodes) {
        await session.run(
          `MERGE (n:${node.type} {id: $id}) 
           SET n.label = $label, n.description = $description`,
          node
        );
      }

      // Create relationships
      const relationships = [
        { source: 'soft-belief', target: 'social-media', type: 'INFLUENCES', description: 'Social media platforms shape soft belief formation' },
        { source: 'social-media', target: 'information-warfare', type: 'ENABLES', description: 'Social media enables information warfare' },
        { source: 'data-sovereignty', target: 'western-democracies', type: 'CHALLENGES', description: 'Data sovereignty challenges democratic governance' },
        { source: 'ai-systems', target: 'technological-power', type: 'REINFORCES', description: 'AI systems reinforce technological power structures' },
        { source: 'authoritarian-regimes', target: 'digital-infrastructure', type: 'OPPOSES', description: 'Authoritarian regimes oppose open digital infrastructure' },
        { source: 'digital-transformation', target: 'soft-belief', type: 'INFLUENCES', description: 'Digital transformation influences belief systems' },
        { source: 'information-warfare', target: 'western-democracies', type: 'CHALLENGES', description: 'Information warfare challenges democratic discourse' }
      ];

      for (const rel of relationships) {
        await session.run(
          `MATCH (source), (target) 
           WHERE source.id = $source AND target.id = $target
           MERGE (source)-[r:${rel.type}]->(target)
           SET r.description = $description`,
          rel
        );
      }

      console.log('Database initialized with sample data');
    } finally {
      await session.close();
    }
  }

  // Get all nodes and relationships for visualization
  async getGraphData(): Promise<GraphData> {
    if (!this.driver) throw new Error('Not connected to Neo4j');

    const session = this.driver.session();
    
    try {
      const result = await session.run(`
        MATCH (n)
        OPTIONAL MATCH (n)-[r]->(m)
        RETURN n, r, m
        ORDER BY n.id
      `);

      const nodes = new Map<string, GraphNode>();
      const relationships: GraphRelationship[] = [];

      result.records.forEach((record: Record) => {
        const node = record.get('n');
        const relationship = record.get('r');
        const targetNode = record.get('m');

        if (node) {
          const nodeData: GraphNode = {
            id: node.properties.id,
            label: node.properties.label,
            type: node.labels[0] as GraphNode['type'],
            description: node.properties.description,
            color: this.getNodeColor(node.labels[0]),
            size: this.getNodeSize(node.labels[0])
          };
          nodes.set(nodeData.id, nodeData);
        }

        if (relationship && targetNode) {
          const relData: GraphRelationship = {
            id: `${relationship.start.identity}-${relationship.end.identity}`,
            source: relationship.start.properties.id,
            target: relationship.end.properties.id,
            type: relationship.type as GraphRelationship['type'],
            description: relationship.properties.description
          };
          relationships.push(relData);
        }
      });

      return {
        nodes: Array.from(nodes.values()),
        relationships: relationships
      };
    } finally {
      await session.close();
    }
  }

  // Add a new node
  async addNode(node: Omit<GraphNode, 'id'>): Promise<string> {
    if (!this.driver) throw new Error('Not connected to Neo4j');

    const session = this.driver.session();
    const id = node.label.toLowerCase().replace(/\s+/g, '-');
    
    try {
      await session.run(
        `CREATE (n:${node.type} {id: $id, label: $label, description: $description})`,
        { ...node, id }
      );
      return id;
    } finally {
      await session.close();
    }
  }

  // Add a new relationship
  async addRelationship(sourceId: string, targetId: string, type: GraphRelationship['type'], description?: string): Promise<void> {
    if (!this.driver) throw new Error('Not connected to Neo4j');

    const session = this.driver.session();
    
    try {
      await session.run(
        `MATCH (source {id: $sourceId}), (target {id: $targetId})
         CREATE (source)-[r:${type}]->(target)
         SET r.description = $description`,
        { sourceId, targetId, description }
      );
    } finally {
      await session.close();
    }
  }

  // Remove a node and all its relationships
  async removeNode(nodeId: string): Promise<void> {
    if (!this.driver) throw new Error('Not connected to Neo4j');

    const session = this.driver.session();
    
    try {
      await session.run(
        `MATCH (n {id: $nodeId})
         DETACH DELETE n`,
        { nodeId }
      );
    } finally {
      await session.close();
    }
  }

  // Remove a specific relationship
  async removeRelationship(sourceId: string, targetId: string, type: GraphRelationship['type']): Promise<void> {
    if (!this.driver) throw new Error('Not connected to Neo4j');

    const session = this.driver.session();
    
    try {
      await session.run(
        `MATCH (source {id: $sourceId})-[r:${type}]->(target {id: $targetId})
         DELETE r`,
        { sourceId, targetId }
      );
    } finally {
      await session.close();
    }
  }

  private getNodeColor(type: string): string {
    const colors = {
      'Concept': '#3B82F6', // Blue
      'Actor': '#10B981',   // Green
      'Technology': '#F59E0B', // Yellow
      'Event': '#EF4444'    // Red
    };
    return colors[type as keyof typeof colors] || '#6B7280';
  }

  private getNodeSize(type: string): number {
    const sizes = {
      'Concept': 20,
      'Actor': 18,
      'Technology': 16,
      'Event': 14
    };
    return sizes[type as keyof typeof sizes] || 15;
  }
}

// Export a singleton instance
export const neo4jClient = new Neo4jClient(); 