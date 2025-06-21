import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BookOpen, MessageCircle, Users, ExternalLink, ChevronDown, ChevronUp, Quote, Network, Volume2 } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import BookSummary from '@/components/BookSummary';
import ChapterBreakdown from '@/components/ChapterBreakdown';
import References from '@/components/References';
import NetworkVisualization from '@/components/NetworkVisualization';
import NetworkVisualization2D from '@/components/NetworkVisualization2D';
import AudioSummary from '@/components/AudioSummary';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('summary');

  const navigationItems = [
    { id: 'summary', label: 'Book Overview', icon: BookOpen },
    { id: 'audio', label: 'Audio Summary', icon: Volume2 },
    { id: 'chat', label: 'AI Discussion', icon: MessageCircle },
    { id: 'network', label: 'Topic Map', icon: Network },
    { id: 'references', label: 'Further Reading', icon: ExternalLink },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'summary':
        return <BookSummary />;
      case 'audio':
        return <AudioSummary />;
      case 'chat':
        return <ChatInterface />;
      case 'network':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Topic Map</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Explore the interconnected themes and concepts from "The Technological Republic" through interactive network visualizations
              </p>
            </div>
            
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Network className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>2D Network View</CardTitle>
                    <CardDescription>Interactive 2D visualization of book concepts and relationships</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <NetworkVisualization2D />
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Network className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>3D Network View</CardTitle>
                    <CardDescription>Interactive 3D visualization of book concepts and relationships</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <NetworkVisualization />
              </CardContent>
            </Card>
          </div>
        );
      case 'chapters':
        return <ChapterBreakdown />;
      case 'references':
        return <References />;
      default:
        return <BookSummary />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">The Technological Republic</h1>
                <p className="text-sm text-slate-600">Interactive Book Explorer</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Interactive Explorer
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          {/* <div className="mb-8">
            <Quote className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <blockquote className="text-xl text-slate-700 italic mb-4">
              "No less ambitious than a new treatise in political theory."
            </blockquote>
            <cite className="text-slate-500">—The Wall Street Journal</cite>
          </div> */}

          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            The Technological Republic
          </h2>
          <h3 className="text-2xl md:text-3xl text-slate-600 mb-8 italic">
            Hard Power, Soft Belief, and the Future of the West
          </h3>
          
          <div className="flex items-center justify-center space-x-2 mb-8">
            <span className="text-lg text-slate-700">by</span>
            <span className="text-lg font-semibold text-slate-800">Alexander C. Karp</span>
            <span className="text-slate-500">and</span>
            <span className="text-lg font-semibold text-slate-800">Nicholas W. Zamiska</span>
          </div>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore an interactive analysis of technology, power, 
            and Western civilization's future in an increasingly complex global landscape.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <nav className="px-6 mb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'outline'}
                  className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                    activeSection === item.id 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'border-blue-200 hover:bg-blue-50'
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium text-center">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 pb-16">
        <div className="container mx-auto max-w-4xl">
          {renderActiveSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-slate-300">
            Interactive analysis tool for "The Technological Republic" • Built for deep exploration
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
