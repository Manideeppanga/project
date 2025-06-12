import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CheckCircle, Star, Calendar, Package, MapPin, MessageSquare } from 'lucide-react';

const mockReceivedItems = [
  {
    id: '1',
    title: 'Wedding Reception Feast',
    description: 'Delicious Indian cuisine including biryanis, curries, and sweets',
    quantity: '50 servings',
    donorName: 'Bella Vista Restaurant',
    donorRating: 4.8,
    receivedDate: '2024-01-15T14:30:00',
    category: 'prepared',
    status: 'completed',
    rating: 5,
    feedback: 'Absolutely wonderful! The food was fresh and delicious. Our children were so happy.',
    peopleServed: 45,
    photos: ['https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300'],
    location: '2.3 km away',
    nutritionalValue: 'High protein, balanced nutrition'
  },
  {
    id: '2',
    title: 'Corporate Lunch Surplus',
    description: 'Assorted sandwiches, salads, and fresh fruits',
    quantity: '30 servings',
    donorName: 'TechCorp Solutions',
    donorRating: 4.9,
    receivedDate: '2024-01-12T16:45:00',
    category: 'prepared',
    status: 'completed',
    rating: 4,
    feedback: 'Great variety and very fresh. Perfect for our lunch program.',
    peopleServed: 28,
    photos: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300'],
    location: '1.8 km away',
    nutritionalValue: 'Fresh vegetables, whole grains'
  },
  {
    id: '3',
    title: 'Fresh Bakery Items',
    description: 'Bread, pastries, and morning baked goods',
    quantity: '40 items',
    donorName: 'Golden Crust Bakery',
    donorRating: 4.7,
    receivedDate: '2024-01-10T09:15:00',
    category: 'packaged',
    status: 'completed',
    rating: 5,
    feedback: 'Perfect for breakfast! The kids loved the sweet pastries.',
    peopleServed: 35,
    photos: ['https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=300'],
    location: '3.1 km away',
    nutritionalValue: 'Carbohydrates, energy boost'
  },
  {
    id: '4',
    title: 'Restaurant Evening Special',
    description: 'Italian dishes with pasta, pizza, and desserts',
    quantity: '25 servings',
    donorName: 'Mama Mia Trattoria',
    donorRating: 4.6,
    receivedDate: '2024-01-08T19:30:00',
    category: 'prepared',
    status: 'pending-feedback',
    rating: 0,
    feedback: '',
    peopleServed: 25,
    photos: ['https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300'],
    location: '4.2 km away',
    nutritionalValue: 'Balanced meal with proteins and carbs'
  }
];

export function ReceivedItems() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'completed' | 'pending-feedback'>('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filteredItems = selectedTab === 'all' 
    ? mockReceivedItems 
    : mockReceivedItems.filter(item => item.status === selectedTab);

  const handleProvideFeedback = (itemId: string) => {
    setSelectedItem(itemId);
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
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
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending-feedback': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Received Food Items</h1>
        <p className="text-gray-600 mt-1">Track your received donations and provide feedback to donors</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-2xl font-bold text-emerald-600">89</div>
          <div className="text-sm text-gray-600">Total Items Received</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-blue-600">1,247</div>
          <div className="text-sm text-gray-600">People Fed</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-orange-600">4.8</div>
          <div className="text-sm text-gray-600">Average Donation Rating</div>
        </Card>
      </div>

      {/* Tabs */}
      <Card padding="none">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'all', label: 'All Items', count: mockReceivedItems.length },
            { key: 'completed', label: 'Completed', count: mockReceivedItems.filter(i => i.status === 'completed').length },
            { key: 'pending-feedback', label: 'Pending Feedback', count: mockReceivedItems.filter(i => i.status === 'pending-feedback').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === tab.key
                  ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </Card>

      {/* Items List */}
      <div className="space-y-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow duration-200">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={item.photos[0]}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Package className="w-4 h-4" />
                        <span>{item.quantity}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.receivedDate).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={getStatusColor(item.status)} className="mt-3 sm:mt-0 capitalize">
                  {item.status.replace('-', ' ')}
                </Badge>
              </div>

              {/* Donor Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-medium">
                        {item.donorName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Donated by {item.donorName}</h4>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400 text-sm">⭐</span>
                        <span className="text-sm text-gray-500">{item.donorRating} rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">{item.peopleServed}</div>
                    <div className="text-sm text-gray-500">people fed</div>
                  </div>
                </div>
              </div>

              {/* Nutrition Info */}
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 mb-1">Nutritional Value</h4>
                <p className="text-sm text-blue-800">{item.nutritionalValue}</p>
              </div>

              {/* Feedback Section */}
              {item.status === 'completed' && item.feedback && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-green-900">Your Feedback</h4>
                        {renderStars(item.rating)}
                      </div>
                      <p className="text-green-800 text-sm">{item.feedback}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              {item.status === 'pending-feedback' && (
                <div className="flex space-x-3">
                  <Button
                    icon={Star}
                    onClick={() => handleProvideFeedback(item.id)}
                    className="flex-1"
                  >
                    Provide Feedback
                  </Button>
                  <Button variant="outline">
                    Contact Donor
                  </Button>
                </div>
              )}

              {item.status === 'completed' && (
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    View Full Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Donor
                  </Button>
                  <Button variant="outline" size="sm">
                    Share Impact
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">
            {selectedTab === 'all' 
              ? 'You haven\'t received any food donations yet.'
              : selectedTab === 'completed'
              ? 'No completed items to display.'
              : 'No items pending feedback.'
            }
          </p>
        </Card>
      )}

      {/* Feedback Modal Placeholder */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Provide Feedback</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                {renderStars(0, true)}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                <textarea
                  placeholder="Share your experience with this donation..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex space-x-3">
                <Button className="flex-1">Submit Feedback</Button>
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}