import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Clock, Users, MapPin, CheckCircle, X, MessageSquare } from 'lucide-react';

const mockRequests = [
  {
    id: '1',
    recipientName: 'Sunshine Orphanage',
    recipientRating: 4.9,
    foodItem: 'Wedding Reception Leftovers',
    quantity: '50 servings',
    urgencyLevel: 'medium',
    message: 'We have 45 children who would really benefit from this meal. We can pick up within 2 hours.',
    expectedPickupTime: '2024-01-15T18:00:00',
    status: 'pending',
    createdAt: '2024-01-15T14:30:00',
    distance: '2.3 km',
    organization: 'Orphanage'
  },
  {
    id: '2',
    recipientName: 'Hope Foundation',
    recipientRating: 4.7,
    foodItem: 'Corporate Event Catering',
    quantity: '30 servings',
    urgencyLevel: 'high',
    message: 'Emergency situation - we have elderly people who need immediate food assistance.',
    expectedPickupTime: '2024-01-15T17:00:00',
    status: 'pending',
    createdAt: '2024-01-15T15:00:00',
    distance: '1.8 km',
    organization: 'NGO'
  },
  {
    id: '3',
    recipientName: 'City Food Bank',
    recipientRating: 4.8,
    foodItem: 'Fresh Produce Surplus',
    quantity: '25 kg',
    urgencyLevel: 'low',
    message: 'This would supplement our weekly distribution to local families in need.',
    expectedPickupTime: '2024-01-16T10:00:00',
    status: 'approved',
    createdAt: '2024-01-15T12:00:00',
    distance: '4.2 km',
    organization: 'Food Bank'
  }
];

export function RequestsView() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved' | 'completed'>('pending');

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'emergency': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'neutral';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'completed': return 'info';
      default: return 'neutral';
    }
  };

  const handleApprove = (requestId: string) => {
    alert(`Request ${requestId} approved! The recipient will be notified with pickup details.`);
  };

  const handleReject = (requestId: string) => {
    alert(`Request ${requestId} rejected. The recipient will be notified.`);
  };

  const filteredRequests = mockRequests.filter(request => request.status === selectedTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Food Requests</h1>
        <p className="text-gray-600 mt-1">Manage requests from recipients for your food donations</p>
      </div>

      {/* Tabs */}
      <Card padding="none">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'pending', label: 'Pending', count: 2 },
            { key: 'approved', label: 'Approved', count: 1 },
            { key: 'completed', label: 'Completed', count: 12 }
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

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow duration-200">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.recipientName}</h3>
                    <p className="text-sm text-gray-600">{request.organization}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-sm text-gray-500">{request.recipientRating}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{request.distance} away</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3 sm:mt-0">
                  <Badge variant={getUrgencyColor(request.urgencyLevel)} className="capitalize">
                    {request.urgencyLevel} Priority
                  </Badge>
                  <Badge variant={getStatusColor(request.status)} className="capitalize">
                    {request.status}
                  </Badge>
                </div>
              </div>

              {/* Food Item Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Requested Food Item</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Item:</span>
                    <p className="font-medium">{request.foodItem}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <p className="font-medium">{request.quantity}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Pickup Time:</span>
                    <p className="font-medium">
                      {new Date(request.expectedPickupTime).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Message from Recipient</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">{request.message}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {request.status === 'pending' && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    icon={CheckCircle}
                    onClick={() => handleApprove(request.id)}
                    className="flex-1"
                  >
                    Approve Request
                  </Button>
                  <Button
                    variant="outline"
                    icon={X}
                    onClick={() => handleReject(request.id)}
                    className="flex-1"
                  >
                    Decline Request
                  </Button>
                  <Button variant="ghost" size="sm">
                    Contact Recipient
                  </Button>
                </div>
              )}

              {request.status === 'approved' && (
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Request Approved</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    The recipient has been notified and will pick up the food at the scheduled time.
                  </p>
                  <div className="flex space-x-3 mt-3">
                    <Button size="sm" variant="outline">
                      Contact Recipient
                    </Button>
                    <Button size="sm" variant="outline">
                      View Pickup Details
                    </Button>
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                <span>Request submitted {new Date(request.createdAt).toLocaleString()}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>
                    Pickup in {Math.ceil((new Date(request.expectedPickupTime).getTime() - Date.now()) / (1000 * 60 * 60))} hours
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">
            {selectedTab === 'pending' ? '⏳' : selectedTab === 'approved' ? '✅' : '🎉'}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {selectedTab} requests
          </h3>
          <p className="text-gray-600">
            {selectedTab === 'pending' 
              ? 'New requests will appear here when recipients are interested in your food donations.'
              : selectedTab === 'approved'
              ? 'Approved requests will be shown here.'
              : 'Completed requests will appear here after successful pickups.'
            }
          </p>
        </Card>
      )}
    </div>
  );
}