
import { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Lightbulb, Globe, Shield, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BookSummary = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'core-thesis': true,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const summaryData = [
    {
      id: 'core-thesis',
      title: 'Core Thesis',
      icon: Lightbulb,
      description: 'The central argument of the technological republic',
      content: [
        'Technology has become the defining force in modern geopolitical power structures',
        'Western democracies must balance technological advancement with democratic values',
        'The future of Western civilization depends on mastering this technological-political synthesis',
        'Traditional notions of power must evolve to incorporate technological capabilities'
      ]
    },
    {
      id: 'hard-power',
      title: 'Hard Power in the Digital Age',
      icon: Shield,
      description: 'How traditional power structures adapt to technology',
      content: [
        'Military capabilities increasingly depend on technological superiority',
        'Economic power flows through technological infrastructure and innovation',
        'Data and algorithms become new forms of strategic assets',
        'Technological dependencies create new vulnerabilities and strengths'
      ]
    },
    {
      id: 'soft-belief',
      title: 'Soft Belief Systems',
      icon: Globe,
      description: 'The role of ideology and culture in technological governance',
      content: [
        'Democratic values must be preserved while embracing technological change',
        'Cultural narratives shape how societies adopt and regulate technology',
        'Belief systems influence technological development and deployment',
        'The West\'s liberal democratic traditions face challenges from authoritarian tech models'
      ]
    },
    {
      id: 'future-west',
      title: 'Future of the West',
      icon: Cpu,
      description: 'Implications for Western civilization and global leadership',
      content: [
        'Western nations must maintain technological competitiveness',
        'Democratic institutions need to evolve for the digital age',
        'Alliance structures must incorporate technological cooperation',
        'Educational and cultural systems require fundamental updates'
      ]
    }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Interactive Book Summary</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore the key themes and arguments through expandable sections with detailed analysis
          </p>
        </div>

        <div className="grid gap-6">
          {summaryData.map((section) => {
            const Icon = section.icon;
            const isOpen = openSections[section.id];

            return (
              <Card key={section.id} className="border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                <Collapsible open={isOpen} onOpenChange={() => toggleSection(section.id)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-blue-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <CardTitle className="text-xl text-slate-800">{section.title}</CardTitle>
                            <CardDescription className="text-slate-600">
                              {section.description}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-slate-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Click to {isOpen ? 'collapse' : 'expand'} this section</p>
                            </TooltipContent>
                          </Tooltip>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {section.content.map((point, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-slate-700 leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Key Takeaway</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 leading-relaxed">
              "The Technological Republic" argues that the West must develop new frameworks for 
              integrating technological power with democratic governance, creating a synthesis 
              that preserves liberal values while maintaining competitive advantage in an 
              increasingly complex global landscape.
            </p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default BookSummary;
