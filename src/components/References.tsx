import { ExternalLink, BookOpen, Globe, FileText, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const References = () => {
  // Data updated based on the provided analysis of the Palantir Doctrine
  const authorInfo = {
    alexanderKarp: {
      name: "Alexander C. Karp",
      title: "Co-Founder and CEO, Palantir Technologies",
      bio: "With a Ph.D. in neoclassical social theory, Karp frames Palantir's mission in grand, philosophical terms. He champions a fervent 'techno-nationalism,' arguing for a renewed, deep partnership between the technology sector and the state to ensure the West's geopolitical dominance.",
      expertise: ["Neoclassical Social Theory", "Philosophy", "Corporate Strategy", "Techno-Nationalism"]
    },
    nicholasZamiska: {
      name: "Nicholas W. Zamiska",
      title: "Head of Corporate Affairs and Legal Counsel, Office of the CEO",
      bio: "A graduate of Yale College and Yale Law School, Zamiska provides the institutional and legal framework for Palantir's operations. He navigates complex legal, ethical, and public policy landscapes, translating visionary rhetoric into corporate reality.",
      expertise: ["Corporate Law", "Public Policy", "Legal Strategy", "Institutional Governance"]
    }
  };

  const furtherReading = [
    {
      title: "The Age of Surveillance Capitalism",
      author: "Shoshana Zuboff",
      description: "Analyzes how tech companies monetize human experience through data extraction, creating new forms of power and control.",
      type: "Book",
      relevance: "Acknowledges and co-opts a major critique, implicitly redirecting it toward consumer tech (Google, Facebook) to frame Palantir's state-sponsored surveillance as a morally superior alternative."
    },
    {
      title: "AI Superpowers: China, Silicon Valley, and the New World Order",
      author: "Kai-Fu Lee",
      description: "Examines the intense AI competition between the US and China, arguing China's advantages could lead to its dominance.",
      type: "Book",
      relevance: "Defines the external threat, framing a zero-sum tech arms race with China to create the urgency needed to justify Palantir's mission."
    },
    {
      title: "Zero to One",
      author: "Peter Thiel",
      description: "Argues that true innovation is creating new things (monopolies), not competing. Critiques Silicon Valley's lack of ambition.",
      type: "Book",
      relevance: "An 'in-group' critique from Palantir's co-founder that lends authenticity to the narrative of a fallen tech industry."
    },
    {
      title: "The Pentagon's Brain",
      author: "Annie Jacobsen",
      description: "Chronicles the history of DARPA and its central role in creating breakthrough technologies for U.S. national security.",
      type: "Book",
      relevance: "Provides the nostalgic model—a 'golden age' of tech-government collaboration that the West must return to."
    },
    {
      title: "Team of Teams",
      author: "Gen. Stanley McChrystal et al.",
      description: "Argues that complex, modern environments require decentralized organizational structures modeled on special operations forces.",
      type: "Book",
      relevance: "Codifies the corporate ethos with a heroic, military-validated framework, making controversial work more attractive to elite talent."
    },
    {
        title: "Extreme Ownership",
        author: "Jocko Willink & Leif Babin",
        description: "Applies Navy SEAL leadership principles of absolute responsibility and decentralized command to business and life.",
        type: "Book",
        relevance: "Reinforces the military ethos, aligning Palantir's identity with the discipline and heroic image of elite U.S. Special Forces."
    },
    {
      title: "The Abolition of Man",
      author: "C.S. Lewis",
      description: "A philosophical critique of moral relativism, arguing it ultimately 'dehumanizes' man by rejecting objective truth.",
      type: "Book",
      relevance: "Provides a respected intellectual foundation for the critique of modern culture and academia's 'moral decay'."
    },
    {
      title: "The Soul of the American University",
      author: "George M. Marsden",
      description: "A historical account of the secularization of American higher education and its shift away from its moral foundations.",
      type: "Book",
      relevance: "Historicizes moral decline by chronicling how a core Western institution allegedly lost its way, requiring an external corrective."
    },
    {
      title: "Wanting",
      author: "Luke Burgis",
      description: "Popularizes René Girard's theory of mimetic desire, explaining that human wants are largely imitative and drive social dynamics.",
      type: "Book",
      relevance: "Pathologizes opposition by framing critics as victims of irrational herd behavior, while positioning Palantir as operating from authentic purpose."
    },
    {
        title: "The Foundation Series",
        author: "Isaac Asimov",
        description: "A science fiction epic about an elite group using a predictive science ('psychohistory') to guide civilization through a galactic dark age.",
        type: "Book",
        relevance: "An act of self-mythologizing. Casts Palantir as a modern Foundation using data analytics (the new psychohistory) to save a declining West."
    },
  ];

  const academicSources = [
    {
      title: "Technological Sovereignty and Democratic Governance",
      source: "Foreign Affairs",
      type: "Policy Article",
      description: "Lends scholarly credibility to the core concepts of the Palantir Doctrine, framing the need for democracies to maintain technological independence in an era of geopolitical competition."
    },
    {
      title: "The Military-Industrial-Technological Complex",
      source: "Journal of National Security Studies (Representative)",
      type: "Academic Framing",
      description: "Represents a body of work that legitimizes a deep, collaborative partnership between the state's security apparatus and its most advanced technology firms as a strategic necessity."
    },
    {
      title: "Digital Authoritarianism and Its Religious Challenges",
      source: "Journal of Democracy",
      type: "Academic Paper",
      description: "Analysis of how authoritarian regimes use technology for control, reinforcing the 'us vs. them' framing of the doctrine and highlighting the stakes of the technological arms race."
    }
  ];

  const relevantOrganizations = [
    {
      name: "Center for Strategic and International Studies (CSIS)",
      description: "Bipartisan policy research on technology and national security.",
      focus: "National Security"
    },
    {
      name: "Hoover Institution",
      description: "A public policy think tank known for its focus on national security and generally hawkish geopolitical perspectives.",
      focus: "National Security"
    },
    {
      name: "Council on Foreign Relations (CFR)",
      description: "An influential foreign policy think tank whose work often focuses on geopolitical competition and U.S. strategy.",
      focus: "Foreign Policy"
    },
    {
      name: "Brookings Institution",
      description: "Research on governance, technology, and democracy.",
      focus: "Democratic Governance"
    },
    {
      name: "Atlantic Council",
      description: "International relations and technology policy research.",
      focus: "Global Technology"
    },
    {
      name: "Electronic Frontier Foundation (EFF)",
      description: "Digital rights and civil liberties advocacy. Its inclusion acknowledges, while also containing, the primary counter-narrative.",
      focus: "Digital Rights"
    }
  ];

  return (
    <div className="bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">The Palantir Doctrine: An Intellectual Arsenal</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A curated canon designed to build an ideological fortress around a controversial mission. Explore the books, papers, and organizations that form its foundation.
          </p>
        </div>

        {/* Author Information */}
        <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 pb-2">The Architects</h3>
            <div className="grid md:grid-cols-2 gap-8">
                {Object.values(authorInfo).map((author, index) => (
                <Card key={index} className="bg-white shadow-lg border-l-4 border-blue-500">
                    <CardHeader>
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-700" />
                        </div>
                        <div>
                        <CardTitle className="text-xl font-semibold text-slate-900">{author.name}</CardTitle>
                        <CardDescription className="text-blue-800 font-medium">{author.title}</CardDescription>
                        </div>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <p className="text-slate-700 mb-4 leading-relaxed">{author.bio}</p>
                    <div className="flex flex-wrap gap-2">
                        {author.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-800 font-medium">
                            {skill}
                        </Badge>
                        ))}
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>


        {/* Further Reading */}
        <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-green-500 pb-2">Related Books</h3>
            <div className="space-y-6">
              {furtherReading.map((book, index) => (
                <Card key={index} className="bg-white shadow-md border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{book.title}</h4>
                        <p className="text-slate-500 font-medium">by {book.author}</p>
                      </div>
                      <Badge variant="outline" className="mt-2 sm:mt-0 text-green-700 border-green-400">{book.type}</Badge>
                    </div>
                    <p className="text-slate-700 mb-3">{book.description}</p>
                    <p className="text-green-800 bg-green-50 p-3 rounded-md text-sm"><span className="font-bold">Strategic Value:</span> {book.relevance}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>

        {/* Combined Academic Sources & Organizations */}
        <div className="grid lg:grid-cols-2 gap-8">
            {/* Academic Sources */}
            <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-purple-500 pb-2">Academic & Policy Sources</h3>
                <div className="space-y-6">
                    {academicSources.map((source, index) => (
                    <Card key={index} className="bg-white shadow-md border-l-4 border-purple-500">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold text-slate-900">{source.title}</h4>
                                <p className="text-slate-500 text-sm">{source.source}</p>
                            </div>
                            <Badge variant="outline" className="text-purple-700 border-purple-400">{source.type}</Badge>
                            </div>
                            <p className="text-slate-700">{source.description}</p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </div>

            {/* Relevant Organizations */}
            <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-yellow-500 pb-2">The Intellectual Ecosystem</h3>
                <div className="space-y-6">
                    {relevantOrganizations.map((org, index) => (
                    <Card key={index} className="bg-white shadow-md border-l-4 border-yellow-500">
                        <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-slate-900 w-3/4">{org.name}</h4>
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 whitespace-nowrap">
                                {org.focus}
                            </Badge>
                        </div>
                        <p className="text-slate-700 text-sm">{org.description}</p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default References;
