
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';

interface FeedbackFormProps {
  onSubmit: (feedback: { rating: number; comment: string }) => void;
}

const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    onSubmit({
      rating,
      comment,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Rate your experience</Label>
        <div className="flex justify-center">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={i <= (hoverRating || rating) ? "currentColor" : "none"}
                  stroke={i <= (hoverRating || rating) ? "none" : "currentColor"}
                  className={`w-8 h-8 transition-colors ${
                    i <= (hoverRating || rating) ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="text-center text-sm mt-1">
          {rating === 0 ? (
            <span className="text-muted-foreground">Select a rating</span>
          ) : (
            <span className="font-medium">
              {rating === 1
                ? "Poor"
                : rating === 2
                ? "Fair"
                : rating === 3
                ? "Good"
                : rating === 4
                ? "Very Good"
                : "Excellent"}
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="comment">Your Feedback</Label>
        <Textarea
          id="comment"
          placeholder="Share your experience and suggestions for improvement..."
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      
      <DialogFooter>
        <Button type="submit" disabled={rating === 0 || !comment}>
          Submit Feedback
        </Button>
      </DialogFooter>
    </form>
  );
};

export default FeedbackForm;
