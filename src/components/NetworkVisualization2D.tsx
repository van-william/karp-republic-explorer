import { useState, useCallback, useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { conceptData, GraphNode, GraphData } from '@/lib/networkDiagramData';

interface NetworkVisualization2DProps {
  className?: string;
}

// Types for the visualization library
interface VizNode {
  id: string;
  label: string;
  type: string;
  description?: string;
  color?: string;
  size?: number;
}

interface VizLink {
  source: string | VizNode;
  target: string | VizNode;
  type: string;
  description?: string;
}

interface VizGraphData {
  nodes: VizNode[];
  links: VizLink[];
}

const NetworkVisualization2D = ({ className }: NetworkVisualization2DProps) => {
  const [selectedNode, setSelectedNode] = useState<VizNode | null>(null);
  const [selectedLink, setSelectedLink] = useState<VizLink | null>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);

  // Handle node click
  const handleNodeClick = useCallback((node: VizNode) => {
    setSelectedNode(node);
    setSelectedLink(null);
  }, []);

  // Handle link click
  const handleLinkClick = useCallback((link: VizLink) => {
    setSelectedLink(link);
    setSelectedNode(null);
  }, []);

  // Handle background click
  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedLink(null);
  }, []);

  // Auto-center and fit the graph when component mounts
  useEffect(() => {
    if (graphRef.current) {
      // Wait a bit for the graph to initialize
      setTimeout(() => {
        try {
          if (graphRef.current.zoomToFit) {
            // Add 80px padding for a better fit
            graphRef.current.zoomToFit(200, 80);
          } else if (graphRef.current.fitView) {
            graphRef.current.fitView(600);
          }
        } catch (error) {
          console.error('Error centering 2D graph:', error);
        }
      }, 100);
    }
  }, []);

  // Convert data for react-force-graph
  const graphDataForViz: VizGraphData = {
    nodes: conceptData.nodes.map(node => ({
      id: node.id,
      label: node.label,
      type: node.type,
      description: node.description,
      color: node.color,
      size: node.size
    })),
    links: conceptData.relationships.map(rel => {
      const sourceNode = conceptData.nodes.find(node => node.id === rel.source);
      const targetNode = conceptData.nodes.find(node => node.id === rel.target);
      
      if (!sourceNode || !targetNode) {
        console.warn(`Missing node for relationship: ${rel.source} -> ${rel.target}`);
        return null;
      }
      
      return {
        source: rel.source, // Use the node ID as string reference
        target: rel.target, // Use the node ID as string reference
        type: rel.type,
        description: rel.description
      };
    }).filter(Boolean) as VizLink[] // Filter out null values
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        <div className="h-96 border border-slate-200 rounded-lg overflow-hidden">
          <ForceGraph2D
            ref={graphRef}
            graphData={graphDataForViz}
            nodeLabel="label"
            nodeColor="color"
            nodeRelSize={6}
            linkLabel="type"
            linkColor={() => '#999'}
            linkWidth={2}
            onNodeClick={handleNodeClick}
            onLinkClick={handleLinkClick}
            onBackgroundClick={handleBackgroundClick}
            backgroundColor="#ffffff"
            enableNodeDrag={true}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            cooldownTicks={300}
            d3AlphaDecay={0.0228}
            d3VelocityDecay={0.4}
            warmupTicks={100}
            onEngineStop={() => {
              // Only log when engine stops, don't auto-zoom
              console.log('2D Engine stopped');
            }}
          />
        </div>
        
        {selectedNode && (
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{selectedNode.label}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {selectedNode.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedNode.description && (
                <p className="text-slate-600">{selectedNode.description}</p>
              )}
            </CardContent>
          </Card>
        )}

        {selectedLink && (
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {typeof selectedLink.source === 'string' 
                      ? conceptData.nodes.find(n => n.id === selectedLink.source)?.label 
                      : selectedLink.source.label} 
                    → 
                    {typeof selectedLink.target === 'string' 
                      ? conceptData.nodes.find(n => n.id === selectedLink.target)?.label 
                      : selectedLink.target.label}
                  </CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {selectedLink.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedLink.description && (
                <p className="text-slate-600">{selectedLink.description}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>How to explore:</strong> Click and drag nodes to explore. Click on a node or connection to see details. 
          The network shows how concepts from "The Technological Republic" relate to each other.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NetworkVisualization2D; 