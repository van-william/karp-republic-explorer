import { useState } from 'react';
import { Send, Bot, User, MessageCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { generateStreamingResponse } from '@/lib/geminiApi';
import { getRelevantContext } from '@/lib/contextLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant for "The Technological Republic" by Alex Karp. I can discuss key themes, analyze arguments, and help you explore the book\'s concepts using context from your notes and materials. What would you like to explore?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "What is Karp's main argument about technological power?",
    "How does the book define 'soft belief'?",
    "What challenges face Western democracies?",
    "How should the West approach technological competition?",
    "What role does data play in modern geopolitics?"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Create initial bot message for streaming
    const botMessageId = (Date.now() + 1).toString();
    const initialBotMessage: Message = {
      id: botMessageId,
      content: '',
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, initialBotMessage]);

    try {
      // Get relevant context for the user's question
      const context = await getRelevantContext(userMessage.content);
      
      // Generate streaming response using Gemini API
      await generateStreamingResponse(
        userMessage.content, 
        context,
        (chunk: string) => {
          // Update the bot message with the new chunk
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessageId 
                ? { ...msg, content: chunk }
                : msg
            )
          );
        }
      );
      
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Update the bot message with error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === botMessageId 
            ? { 
                ...msg, 
                content: 'I apologize, but I encountered an error while processing your request. Please check your API key configuration and try again.' 
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">AI Discussion Interface</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Engage in thoughtful conversation about the book's themes and arguments with context-aware AI
        </p>
      </div>

      {/* <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          This chat interface uses Gemini AI and can incorporate context from your markdown files in the `/context` directory. 
          Add your book notes and materials there for more informed discussions.
        </AlertDescription>
      </Alert> */}

      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Book Discussion</CardTitle>
                <CardDescription>AI-powered analysis with contextual knowledge</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Gemini AI + Context
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto border border-slate-200 rounded-lg p-4 mb-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.sender === 'bot' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-xs opacity-75">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {message.sender === 'bot' ? (
                    <div className="text-sm leading-relaxed prose prose-sm max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Customize markdown components for better styling
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="text-sm">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          code: ({ children }) => <code className="bg-slate-200 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                          pre: ({ children }) => <pre className="bg-slate-200 p-2 rounded text-xs font-mono overflow-x-auto">{children}</pre>,
                          blockquote: ({ children }) => <blockquote className="border-l-4 border-slate-300 pl-3 italic">{children}</blockquote>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs opacity-75">Thinking...</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Suggested Questions:</h4>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs border-blue-200 hover:bg-blue-50"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the book's themes, arguments, or implications..."
              className="flex-1 border-blue-200 focus:border-blue-400"
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
              disabled={loading}
            />
            <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
