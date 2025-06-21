import { useState, useCallback, useRef } from 'react';
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
  source: VizNode;
  target: VizNode;
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
    links: conceptData.relationships.map(rel => ({
      source: {
        id: rel.source,
        label: conceptData.nodes.find(node => node.id === rel.source)?.label || '',
        type: conceptData.nodes.find(node => node.id === rel.source)?.type || '',
        description: conceptData.nodes.find(node => node.id === rel.source)?.description,
        color: conceptData.nodes.find(node => node.id === rel.source)?.color,
        size: conceptData.nodes.find(node => node.id === rel.source)?.size
      },
      target: {
        id: rel.target,
        label: conceptData.nodes.find(node => node.id === rel.target)?.label || '',
        type: conceptData.nodes.find(node => node.id === rel.target)?.type || '',
        description: conceptData.nodes.find(node => node.id === rel.target)?.description,
        color: conceptData.nodes.find(node => node.id === rel.target)?.color,
        size: conceptData.nodes.find(node => node.id === rel.target)?.size
      },
      type: rel.type,
      description: rel.description
    }))
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
                    {selectedLink.source.label} → {selectedLink.target.label}
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
          <br /><br />
          <strong>To modify:</strong> Edit the data in <code>src/lib/networkDiagramData.ts</code>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NetworkVisualization2D; 