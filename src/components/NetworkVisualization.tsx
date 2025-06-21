import { useState, useCallback, useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Info, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { conceptData, GraphNode, GraphData } from '@/lib/networkDiagramData';

interface NetworkVisualizationProps {
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

const NetworkVisualization = ({ className }: NetworkVisualizationProps) => {
  const [selectedNode, setSelectedNode] = useState<VizNode | null>(null);
  const [selectedLink, setSelectedLink] = useState<VizLink | null>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const graphRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphDimensions, setGraphDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial dimensions
    if (containerRef.current) {
      setGraphDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    // Update dimensions on resize
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setGraphDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

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

  // Reset camera to default position
  const handleResetCamera = useCallback(() => {
    console.log('Reset camera clicked');
    if (graphRef.current) {
      console.log('Graph ref available, methods:', Object.getOwnPropertyNames(graphRef.current));
      try {
        // Try different methods to reset the view
        if (graphRef.current.zoomToFit) {
          console.log('Using zoomToFit');
          graphRef.current.zoomToFit(600); // Increased for better fit
        } else if (graphRef.current.fitView) {
          console.log('Using fitView');
          graphRef.current.fitView(600); // Increased for better fit
        } else {
          console.log('Reset method not available');
        }
      } catch (error) {
        console.error('Error resetting camera:', error);
      }
    } else {
      console.log('Graph ref not available');
    }
  }, []);

  // Zoom in
  const handleZoomIn = useCallback(() => {
    console.log('Zoom in clicked');
    if (graphRef.current) {
      try {
        if (graphRef.current.zoom) {
          console.log('Using zoom method');
          graphRef.current.zoom(1.2);
        } else {
          console.log('Zoom method not available');
        }
      } catch (error) {
        console.error('Error zooming in:', error);
      }
    } else {
      console.log('Graph ref not available for zoom in');
    }
  }, []);

  // Zoom out
  const handleZoomOut = useCallback(() => {
    console.log('Zoom out clicked');
    if (graphRef.current) {
      try {
        if (graphRef.current.zoom) {
          console.log('Using zoom method');
          graphRef.current.zoom(0.8);
        } else {
          console.log('Zoom method not available');
        }
      } catch (error) {
        console.error('Error zooming out:', error);
      }
    } else {
      console.log('Graph ref not available for zoom out');
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

  // Auto-center and fit the graph when component mounts
  useEffect(() => {
    if (graphRef.current) {
      // Wait a bit for the graph to initialize
      setTimeout(() => {
        try {
          if (graphRef.current.zoomToFit) {
            graphRef.current.zoomToFit(400, 80);
          }
        } catch (error) {
          console.error('Error centering 3D graph:', error);
        }
      }, 200);
    }
  }, []);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        <div ref={containerRef} className="relative h-96 border border-slate-200 rounded-lg overflow-hidden">
          <ForceGraph3D
            ref={graphRef}
            graphData={graphDataForViz}
            width={graphDimensions.width}
            height={graphDimensions.height}
            nodeLabel="label"
            nodeColor="color"
            nodeRelSize={8}
            linkLabel="type"
            linkColor={() => '#999'}
            linkWidth={1.5}
            onNodeClick={handleNodeClick}
            onLinkClick={handleLinkClick}
            onBackgroundClick={handleBackgroundClick}
            backgroundColor="#ffffff"
            showNavInfo={true}
            enableNodeDrag={true}
            enableNavigationControls={true}
            enablePointerInteraction={true}
            cooldownTicks={300}
            d3AlphaDecay={0.0228}
            d3VelocityDecay={0.4}
            warmupTicks={100}
            onEngineStop={() => {
              // Only auto-center on initial load, not on every engine stop
              console.log('Engine stopped');
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
          <strong>How to explore:</strong> Click and drag nodes to explore. Use the built-in navigation controls (bottom right) to reset view, zoom in/out, and rotate. 
          The network shows how concepts from "The Technological Republic" relate to each other.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NetworkVisualization;