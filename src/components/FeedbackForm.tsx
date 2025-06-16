
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Star, Send } from 'lucide-react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    favorite_chapter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual Supabase integration
      // const { data, error } = await supabase
      //   .from('book_feedback')
      //   .insert([formData]);

      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Thank you for your feedback!",
        description: "Your thoughts on The Technological Republic have been submitted.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        rating: 5,
        comment: '',
        favorite_chapter: '',
      });
    } catch (error) {
      toast({
        title: "Error submitting feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Share Your Thoughts</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Join the conversation about "The Technological Republic." Share your insights, 
          reflections, and questions about Karp's vision for the future.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardTitle className="text-blue-800">Book Feedback Form</CardTitle>
          <CardDescription className="text-blue-600">
            Your feedback helps build a community of readers exploring technology's role in democracy
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Overall Rating</Label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleInputChange('rating', star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm text-slate-600 ml-2">
                  {formData.rating} out of 5 stars
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="favorite_chapter">Favorite Chapter/Section</Label>
              <Input
                id="favorite_chapter"
                value={formData.favorite_chapter}
                onChange={(e) => handleInputChange('favorite_chapter', e.target.value)}
                placeholder="e.g., Chapter 3: The Digital Frontier"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Your Thoughts</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
                placeholder="Share your insights, questions, or reflections on the book..."
                className="min-h-[120px]"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">What happens to your feedback?</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• Your thoughts contribute to community discussions</li>
          <li>• Insights help other readers engage more deeply</li>
          <li>• Anonymous aggregated data may inform future analysis</li>
          <li>• All submissions are stored securely with Supabase</li>
        </ul>
      </div>
    </div>
  );
};

export default FeedbackForm;
