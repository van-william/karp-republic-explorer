
import { BookOpen, MessageCircle, Users, ExternalLink, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SimpleNavigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const navigationItems = [
    { id: 'summary', label: 'Summary', icon: BookOpen },
    { id: 'chat', label: 'Discussion', icon: MessageCircle },
    { id: 'chapters', label: 'Chapters', icon: Users },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'references', label: 'References', icon: ExternalLink },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="font-playfair text-xl font-bold text-slate-800">
            The Technological Republic
          </div>
          
          <div className="flex items-center space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                      : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="font-inter font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavigation;
