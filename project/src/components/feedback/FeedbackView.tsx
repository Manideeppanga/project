import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Star, Heart, MessageSquare, Camera, Send, ThumbsUp } from 'lucide-react';

const mockFeedbackItems = [
  {
    id: '1',
    donationTitle: 'Wedding Reception Feast',
    donorName: 'Bella Vista Restaurant',
    rating: 5,
    comment: 'Absolutely wonderful! The food was fresh and delicious. Our children were so happy and well-fed. Thank you for your generosity!',
    photos: ['https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300'],
    submittedDate: '2024-01-15T14:30:00',
    status: 'submitted',
    donorResponse: 'Thank you so much for the wonderful feedback! It makes our day to know we made a difference.'
  },
  {
    id: '2',
    donationTitle: 'Corporate Lunch Surplus',
    donorName: 'TechCorp Solutions',
    rating: 4,
    comment: 'Great variety and very fresh. Perfect for our lunch program. The sandwiches were particularly appreciated.',
    photos: [],
    submittedDate: '2024-01-12T16:45:00',
    status: 'submitted',
    donorResponse: ''
  }
];

const pendingFeedback = [
  {
    id: '4',
    donationTitle: 'Restaurant Evening Special',
    donorName: 'Mama Mia Trattoria',
    receivedDate: '2024-01-08T19:30:00',
    quantity: '25 servings'
  }
];

export function FeedbackView() {
  const [activeTab, setActiveTab] = useState<'submitted' | 'pending'>('submitted');
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    comment: '',
    photos: []
  });
  const [selectedDonation, setSelectedDonation] = useState<string | null>(null);

  const handleRatingChange = (rating: number) => {
    setNewFeedback(prev => ({ ...prev, rating }));
  };

  const handleSubmitFeedback = () => {
    alert('Feedback submitted successfully! The donor will be notified.');
    setNewFeedback({ rating: 0, comment: '', photos: [] });
    setSelectedDonation(null);
  };

  const renderStars = (rating: number, interactive: boolean = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : interactive
                ? 'text-gray-300 hover:text-yellow-400 cursor-pointer'
                : 'text-gray-300'
            } ${interactive ? 'transition-colors' : ''}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feedback & Reviews</h1>
        <p className="text-gray-600 mt-1">Share your experience and help improve food donations</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-2xl font-bold text-emerald-600">23</div>
          <div className="text-sm text-gray-600">Feedback Submitted</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-yellow-500">4.8</div>
          <div className="text-sm text-gray-600">Average Rating Given</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-blue-600">98%</div>
          <div className="text-sm text-gray-600">Positive Feedback</div>
        </Card>
      </div>

      {/* Tabs */}
      <Card padding="none">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('submitted')}
            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'submitted'
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Submitted Feedback ({mockFeedbackItems.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'pending'
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Pending Feedback ({pendingFeedback.length})
          </button>
        </div>
      </Card>

      {/* Content */}
      {activeTab === 'submitted' && (
        <div className="space-y-6">
          {mockFeedbackItems.map((feedback) => (
            <Card key={feedback.id}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{feedback.donationTitle}</h3>
                    <p className="text-sm text-gray-600">Donated by {feedback.donorName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Submitted on {new Date(feedback.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStars(feedback.rating)}
                    <span className="text-sm font-medium text-gray-600">({feedback.rating}/5)</span>
                  </div>
                </div>

                {/* Comment */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Your Review</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">{feedback.comment}</p>
                    </div>
                  </div>
                </div>

                {/* Photos */}
                {feedback.photos.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Photos</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {feedback.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Feedback photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Donor Response */}
                {feedback.donorResponse && (
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Heart className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-emerald-900 mb-1">Response from {feedback.donorName}</h4>
                        <p className="text-emerald-800 text-sm">{feedback.donorResponse}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    Edit Feedback
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Donor
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'pending' && (
        <div className="space-y-6">
          {pendingFeedback.map((item) => (
            <Card key={item.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.donationTitle}</h3>
                  <p className="text-sm text-gray-600">From {item.donorName}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Received on {new Date(item.receivedDate).toLocaleDateString()} • {item.quantity}
                  </p>
                </div>
                <Button
                  icon={Star}
                  onClick={() => setSelectedDonation(item.id)}
                >
                  Leave Feedback
                </Button>
              </div>
            </Card>
          ))}

          {pendingFeedback.length === 0 && (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">You've provided feedback for all received donations.</p>
            </Card>
          )}
        </div>
      )}

      {/* Feedback Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">Share Your Experience</h3>
                <p className="text-gray-600 mt-1">Help other recipients and donors with your feedback</p>
              </div>

              {/* Rating */}
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate this donation?
                </label>
                <div className="flex justify-center">
                  {renderStars(newFeedback.rating, true, handleRatingChange)}
                </div>
                {newFeedback.rating > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {newFeedback.rating === 5 ? 'Excellent!' : 
                     newFeedback.rating === 4 ? 'Very Good' :
                     newFeedback.rating === 3 ? 'Good' :
                     newFeedback.rating === 2 ? 'Fair' : 'Poor'}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comments
                </label>
                <textarea
                  placeholder="Share details about the food quality, freshness, quantity, and impact on your organization..."
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Add photos to show the impact
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG up to 5MB each
                  </p>
                </div>
              </div>

              {/* Quick Templates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Templates
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'The food was fresh and delicious! Our community really appreciated it.',
                    'Great quality and quantity. Perfect for our meal program.',
                    'The children loved the food. Thank you for your generosity!',
                    'Well-packaged and delivered on time. Excellent donation!'
                  ].map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setNewFeedback(prev => ({ ...prev, comment: template }))}
                      className="text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded border border-gray-200"
                    >
                      "{template}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  className="flex-1"
                  icon={Send}
                  onClick={handleSubmitFeedback}
                  disabled={newFeedback.rating === 0}
                >
                  Submit Feedback
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedDonation(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Impact Section */}
      <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <div className="text-center">
          <ThumbsUp className="w-12 h-12 text-emerald-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Your Feedback Matters</h3>
          <p className="text-emerald-100 mb-4">
            Your reviews help donors understand their impact and encourage more food donations in the community.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-emerald-100 text-sm">Reviews Submitted</div>
            </div>
            <div>
              <div className="text-2xl font-bold">15</div>
              <div className="text-emerald-100 text-sm">Donors Helped</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}