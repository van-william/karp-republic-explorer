
import { ExternalLink, BookOpen, Globe, FileText, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const References = () => {
  const authorInfo = {
    alexanderKarp: {
      name: "Alexander C. Karp",
      title: "CEO, Palantir Technologies",
      bio: "Alexander Karp is the CEO and co-founder of Palantir Technologies, a leading data analytics company. He holds a PhD in Philosophy from the University of Frankfurt and has extensive experience in technology and philosophy.",
      expertise: ["Data Analytics", "Philosophy", "Technology Policy", "National Security"]
    },
    nicholasZamiska: {
      name: "Nicholas W. Zamiska",
      title: "Former Wall Street Journal Reporter",
      bio: "Nicholas Zamiska is a former reporter for The Wall Street Journal who covered technology, health care, and business. He has extensive experience in investigative journalism and policy analysis.",
      expertise: ["Journalism", "Technology", "Policy Analysis", "Business Strategy"]
    }
  };

  const furtherReading = [
    {
      title: "The Age of Surveillance Capitalism",
      author: "Shoshana Zuboff",
      description: "A comprehensive analysis of how technology companies extract value from human experience",
      type: "Book",
      relevance: "Complements the discussion of technological power and democratic values"
    },
    {
      title: "AI Superpowers: China, Silicon Valley, and the New World Order",
      author: "Kai-Fu Lee",
      description: "Examination of the AI competition between the US and China",
      type: "Book",
      relevance: "Provides context for the technological competition discussed in the book"
    },
    {
      title: "The Technology Trap",
      author: "Carl Benedikt Frey",
      description: "Historical perspective on technology's impact on employment and society",
      type: "Book",
      relevance: "Historical context for technological disruption"
    },
    {
      title: "Weapons of Math Destruction",
      author: "Cathy O'Neil",
      description: "How big data increases inequality and threatens democracy",
      type: "Book",
      relevance: "Explores the democratic challenges of algorithmic decision-making"
    }
  ];

  const academicSources = [
    {
      title: "The Ethics of Artificial Intelligence",
      source: "Stanford Encyclopedia of Philosophy",
      type: "Academic Paper",
      description: "Comprehensive overview of ethical considerations in AI development"
    },
    {
      title: "Digital Authoritarianism and Its Religious Challenges",
      source: "Journal of Democracy",
      type: "Academic Paper",
      description: "Analysis of how authoritarian regimes use technology for control"
    },
    {
      title: "Technological Sovereignty and Democratic Governance",
      source: "Foreign Affairs",
      type: "Policy Article",
      description: "Discussion of how democracies can maintain technological independence"
    }
  ];

  const relevantOrganizations = [
    {
      name: "Center for Strategic and International Studies (CSIS)",
      description: "Bipartisan policy research on technology and national security",
      focus: "Technology Policy"
    },
    {
      name: "Brookings Institution",
      description: "Research on governance, technology, and democracy",
      focus: "Democratic Governance"
    },
    {
      name: "Atlantic Council",
      description: "International relations and technology policy research",
      focus: "Global Technology"
    },
    {
      name: "Electronic Frontier Foundation",
      description: "Digital rights and civil liberties advocacy",
      focus: "Digital Rights"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Further Reading & References</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore additional resources to deepen your understanding of technological governance and democracy
        </p>
      </div>

      {/* Author Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {Object.values(authorInfo).map((author, index) => (
          <Card key={index} className="border-blue-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{author.name}</CardTitle>
                  <CardDescription>{author.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4 leading-relaxed">{author.bio}</p>
              <div className="flex flex-wrap gap-2">
                {author.expertise.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Further Reading */}
      <Card className="border-blue-200 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>Recommended Books</span>
          </CardTitle>
          <CardDescription>
            Essential reading to complement and expand on the book's themes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {furtherReading.map((book, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-800">{book.title}</h4>
                    <p className="text-slate-600">by {book.author}</p>
                  </div>
                  <Badge variant="outline">{book.type}</Badge>
                </div>
                <p className="text-slate-700 mb-2">{book.description}</p>
                <p className="text-blue-600 text-sm italic">{book.relevance}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Academic Sources */}
      <Card className="border-blue-200 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>Academic & Policy Sources</span>
          </CardTitle>
          <CardDescription>
            Scholarly articles and policy papers for deeper academic exploration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {academicSources.map((source, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-800">{source.title}</h4>
                    <p className="text-slate-600">{source.source}</p>
                  </div>
                  <Badge variant="outline">{source.type}</Badge>
                </div>
                <p className="text-slate-700">{source.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Relevant Organizations */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Globe className="w-6 h-6 text-blue-600" />
            <span>Research Organizations</span>
          </CardTitle>
          <CardDescription>
            Think tanks and organizations conducting relevant research
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {relevantOrganizations.map((org, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{org.name}</h4>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {org.focus}
                  </Badge>
                </div>
                <p className="text-slate-700 text-sm">{org.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default References;
