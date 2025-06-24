import { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Lightbulb, Globe, Shield, Cpu, Building } from 'lucide-react';
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
      description: 'The central argument about America\'s technological and cultural drift',
      content: [
        'Silicon Valley has abandoned its foundational collaboration with defense and government',
        'The removal of Western Civilization from education has created a crisis of American identity and purpose',
        'Current engineers build technology without connection to broader meaning or national strategic goals',
        'America must rebuild a "Technological Republic" that combines innovation with clear national purpose and values'
      ]
    },
    {
      id: 'software-century',
      title: 'Part 1: Software Century',
      icon: Cpu,
      description: 'The loss of purpose and meaning in modern technology work',
      content: [
        'Current generation of software engineers has become unmoored from core purpose or grander meaning',
        'Engineers are hesitant to work on defense applications, despite the internet\'s origins in DARPA',
        'Silicon Valley has strayed from its tradition of collaboration with the US Government',
        'Focus has shifted primarily to consumer markets while avoiding defense altogether',
        'Historical irony: foundational technologies came from defense programs, but such collaboration is now unthinkable'
      ]
    },
    {
      id: 'american-mind',
      title: 'Part 2: Hollowing Out of the American Mind',
      icon: Globe,
      description: 'The fundamental dismantling of American and Western identity',
      content: [
        'Technological Agnosticism: people build because they enjoy building, detached from purpose and outcomes',
        'The abandonment of Western Civilization education led to loose anchoring of American purpose',
        'People oppose Defense/Government projects but struggle to articulate what they actually stand for',
        'Post-nationalist ideologies have created cultural relativism that undermines shared national identity',
        'Academic ideas incorrectly teach that "the West is inferior" and foster luxury beliefs among elites'
      ]
    },
    {
      id: 'engineering-mindset',
      title: 'Part 3: Engineering Mindset',
      icon: Building,
      description: 'Applying engineering principles to organizational and governmental structures',
      content: [
        'Palantir and tech startups have fundamentally rejected traditional corporate hierarchies',
        'Creative friction and rejecting intellectual fragility are vital to organizational growth',
        'Skepticism of ideology in favor of pursuit of tangible results and outcomes',
        'Learning from decentralized systems like bee swarms that operate without strict top-down control',
        'Military needs better intelligence tools and faster procurement processes, not just better weapons'
      ]
    },
    {
      id: 'rebuilding-republic',
      title: 'Part 4: Rebuilding the Technological Republic',
      icon: Shield,
      description: 'Reasserting national culture and engaging with critical public domains',
      content: [
        'Silicon Valley remains reticent to enter public domains: medicine, education, law, and defense',
        'Rebuilding requires reassertion of national culture and clear American values',
        'Need for clearer collective identity and common purpose beyond entertainment and consumption',
        'Emphasis on hard power (military, technological strength) balanced with cultural influence',
        'Restoration of civic rituals and shared experiences that bind society together'
      ]
    }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Interactive Book Summary</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore the key themes and arguments from Alex Karp's analysis of America's technological and cultural challenges
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
              "The Technological Republic" argues that America must reconnect its technological innovation 
              with national purpose and Western values. Karp believes that without this reconnection—through 
              restored civic education, defense collaboration, and purpose-driven engineering—the United States 
              risks losing both its technological edge and cultural foundation to more unified adversaries.
            </p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default BookSummary;
