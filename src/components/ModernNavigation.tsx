
import { useState } from 'react';
import { BookOpen, MessageCircle, Users, ExternalLink, MessageSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const ModernNavigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'summary', label: 'Interactive Summary', icon: BookOpen },
    { id: 'chat', label: 'AI Discussion', icon: MessageCircle },
    { id: 'chapters', label: 'Chapter Analysis', icon: Users },
    { id: 'feedback', label: 'Share Feedback', icon: MessageSquare },
    { id: 'references', label: 'Further Reading', icon: ExternalLink },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden bg-white/80 backdrop-blur-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Desktop Floating Navigation */}
      <nav className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="flex flex-col space-y-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="icon"
                  className={`w-12 h-12 rounded-xl transition-all duration-300 group relative ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                      : 'text-slate-600 hover:bg-white/20 hover:text-blue-600'
                  }`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="absolute left-16 bg-slate-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Navigation */}
      <div className={`fixed inset-y-0 right-0 z-40 w-80 bg-white/95 backdrop-blur-lg transform transition-transform duration-300 md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 pt-16">
          <h3 className="font-playfair text-xl font-bold text-slate-800 mb-6">Navigation</h3>
          <div className="space-y-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start h-12 rounded-xl transition-all ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-700 hover:bg-blue-50'
                  }`}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsOpen(false);
                  }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-inter font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ModernNavigation;
