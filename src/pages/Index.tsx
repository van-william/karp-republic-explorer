
import { useState } from 'react';
import { BookOpen, Quote, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BookSummary from '@/components/BookSummary';
import ChatInterface from '@/components/ChatInterface';
import ChapterBreakdown from '@/components/ChapterBreakdown';
import References from '@/components/References';
import FeedbackForm from '@/components/FeedbackForm';
import FloatingParticles from '@/components/FloatingParticles';
import SimpleNavigation from '@/components/SimpleNavigation';

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('summary');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'summary':
        return <BookSummary />;
      case 'chat':
        return <ChatInterface />;
      case 'chapters':
        return <ChapterBreakdown />;
      case 'feedback':
        return <FeedbackForm />;
      case 'references':
        return <References />;
      default:
        return <BookSummary />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 font-inter relative overflow-x-hidden">
      <FloatingParticles />
      
      {/* Simple Top Navigation */}
      <SimpleNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Hero Section - Full viewport height with top padding for fixed nav */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-blue-100/80 text-blue-800 backdrop-blur-sm px-4 py-2 text-sm font-medium">
                  #1 NY Times Bestseller
                </Badge>
                
                <h1 className="font-playfair text-5xl lg:text-7xl font-bold text-slate-800 leading-tight">
                  The Technological
                  <span className="text-blue-600 block">Republic</span>
                </h1>
                
                <h2 className="font-playfair text-2xl lg:text-3xl text-slate-600 italic font-light leading-relaxed">
                  Hard Power, Soft Belief, and the Future of the West
                </h2>
                
                <div className="flex flex-wrap items-center gap-2 text-lg text-slate-700">
                  <span className="font-medium">by</span>
                  <span className="font-semibold">Alexander C. Karp</span>
                  <span className="text-slate-400">&</span>
                  <span className="font-semibold">Nicholas W. Zamiska</span>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <Quote className="w-8 h-8 text-blue-500 mb-4" />
                <blockquote className="font-playfair text-xl text-slate-700 italic leading-relaxed mb-4">
                  "No less ambitious than a new treatise in political theory."
                </blockquote>
                <cite className="text-slate-600 font-medium">—The Wall Street Journal</cite>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed font-light max-w-xl">
                Explore an interactive analysis of this groundbreaking work on technology, power, 
                and Western civilization's future in an increasingly complex global landscape.
              </p>
            </div>

            {/* Right Column - Book Visual */}
            <div className="relative lg:pl-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl"></div>
                <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-12 border border-white/30 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-playfair text-2xl font-bold text-slate-800 mb-2">Interactive Analysis</h3>
                    <p className="text-slate-600 font-light">Dive deep into Karp's vision for the future</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-slate-400" />
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
            <div className="p-8 lg:p-12">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-900/95 backdrop-blur-lg text-white py-12 px-6 mt-24">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-bold">The Technological Republic</h3>
            <p className="text-slate-300 font-light">
              Interactive analysis tool • Built for deep exploration
            </p>
            <p className="text-slate-400 text-sm">
              Ready for deployment on Netlify
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
