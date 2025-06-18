// Developer-only backend selector
// Set to 'huggingface' or 'openai' to choose the backend for chat
const CHAT_BACKEND: 'huggingface' | 'openai' = 'huggingface';

import { useState } from 'react';
import { Send, Bot, User, MessageCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
      content: 'Hello! I\'m your AI assistant for "The Technological Republic". I can discuss key themes, analyze arguments, and help you explore the book\'s concepts. What would you like to explore?',
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

  // Helper to call the backend (developer-only, not visible to end users)
  async function fetchBotResponse(userInput: string): Promise<string> {
    if (CHAT_BACKEND === 'huggingface') {
      // Example: call your local Hugging Face backend
      try {
        const res = await fetch('/api/huggingface-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput })
        });
        if (res.ok) {
          const data = await res.json();
          return data.response || '[No response from Hugging Face backend]';
        }
        return '[Error from Hugging Face backend]';
      } catch (e) {
        return '[Failed to reach Hugging Face backend]';
      }
    } else if (CHAT_BACKEND === 'openai') {
      // Example: call your OpenAI REST API backend
      try {
        const res = await fetch('/api/openai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput })
        });
        if (res.ok) {
          const data = await res.json();
          return data.response || '[No response from OpenAI backend]';
        }
        return '[Error from OpenAI backend]';
      } catch (e) {
        return '[Failed to reach OpenAI backend]';
      }
    }
    // Fallback placeholder
    return 'This is a placeholder response. Once you integrate the PDF and book materials, I\'ll be able to provide detailed analysis and discussion based on the actual text. For now, I can help structure your questions and thoughts about the book.';
  }

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

    // Get bot response (from backend or placeholder)
    const botContent = await fetchBotResponse(userMessage.content);
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: botContent,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botResponse]);
    setLoading(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">AI Discussion Interface</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Engage in thoughtful conversation about the book's themes and arguments
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          This chat interface is ready for integration with your PDF and book materials. 
          Currently showing placeholder responses for demonstration.
        </AlertDescription>
      </Alert>

      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Book Discussion</CardTitle>
                <CardDescription>AI-powered analysis and conversation</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Ready for Integration
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
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
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
