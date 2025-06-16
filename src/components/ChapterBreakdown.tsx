
import { useState } from 'react';
import { ChevronRight, Clock, BookOpen, Key, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ChapterBreakdown = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const chapters = [
    {
      number: 1,
      title: "The Technological Imperative",
      readTime: "25 min",
      keyThemes: ["Digital Transformation", "Power Structures", "Historical Context"],
      summary: "Establishes the foundational premise that technology has become the primary driver of geopolitical power, examining how digital capabilities reshape traditional notions of sovereignty and influence.",
      keyPoints: [
        "Technology as the new basis of state power",
        "Historical parallels to industrial revolution",
        "The obsolescence of traditional military metrics",
        "Digital infrastructure as national security"
      ]
    },
    {
      number: 2,
      title: "Democracy in the Digital Realm",
      readTime: "30 min",
      keyThemes: ["Democratic Governance", "Technology Regulation", "Civil Liberties"],
      summary: "Explores the tension between democratic principles and technological efficiency, questioning how liberal institutions can maintain legitimacy in an increasingly automated world.",
      keyPoints: [
        "Algorithmic decision-making vs. democratic process",
        "Privacy rights in surveillance states",
        "The challenge of regulating global tech platforms",
        "Maintaining human agency in automated systems"
      ]
    },
    {
      number: 3,
      title: "The Chinese Model",
      readTime: "35 min",
      keyThemes: ["Authoritarian Tech", "State Capitalism", "Competition"],
      summary: "Analyzes China's approach to technological development, examining how authoritarian systems leverage technology for control and competitive advantage.",
      keyPoints: [
        "State-directed technological development",
        "Social credit systems and population control",
        "Economic integration of surveillance technology",
        "Challenges to Western technological leadership"
      ]
    },
    {
      number: 4,
      title: "Soft Belief and Hard Reality",
      readTime: "28 min",
      keyThemes: ["Cultural Values", "Ideology", "Implementation"],
      summary: "Examines how cultural beliefs and values shape technological adoption and governance, contrasting idealistic visions with practical realities.",
      keyPoints: [
        "The role of cultural narratives in tech adoption",
        "Bridging ideological divides through pragmatism",
        "Values-based approaches to AI governance",
        "Cultural resistance to technological change"
      ]
    },
    {
      number: 5,
      title: "Alliance in the Age of Algorithms",
      readTime: "32 min",
      keyThemes: ["International Cooperation", "Tech Alliances", "Standards"],
      summary: "Discusses how traditional alliances must evolve to address technological challenges, including data sharing, cybersecurity, and joint technology development.",
      keyPoints: [
        "Technological interoperability between allies",
        "Shared standards for AI and data governance",
        "Collective defense against cyber threats",
        "Technology transfer and security concerns"
      ]
    },
    {
      number: 6,
      title: "The Path Forward",
      readTime: "26 min",
      keyThemes: ["Future Strategy", "Policy Recommendations", "Western Renewal"],
      summary: "Outlines a strategic framework for Western democracies to maintain technological leadership while preserving democratic values and institutions.",
      keyPoints: [
        "Investment priorities for democratic technology",
        "Regulatory frameworks that enable innovation",
        "Education and workforce development",
        "Long-term strategic thinking in tech policy"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Chapter Analysis</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Detailed breakdown of each chapter with key themes and insights
        </p>
      </div>

      <div className="grid gap-6">
        {chapters.map((chapter) => (
          <Card key={chapter.number} className="border-blue-200 shadow-md hover:shadow-lg transition-shadow">
            <Collapsible open={selectedChapter === chapter.number} onOpenChange={(open) => setSelectedChapter(open ? chapter.number : null)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-blue-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-600">{chapter.number}</span>
                      </div>
                      <div className="text-left">
                        <CardTitle className="text-xl text-slate-800">{chapter.title}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{chapter.readTime}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Key className="w-4 h-4" />
                            <span>{chapter.keyThemes.length} key themes</span>
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${selectedChapter === chapter.number ? 'rotate-90' : ''}`} />
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {/* Key Themes */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Key Themes
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {chapter.keyThemes.map((theme, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Chapter Summary
                      </h4>
                      <p className="text-slate-700 leading-relaxed">{chapter.summary}</p>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-3">Key Points</h4>
                      <div className="space-y-2">
                        {chapter.keyPoints.map((point, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-slate-700">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChapterBreakdown;
