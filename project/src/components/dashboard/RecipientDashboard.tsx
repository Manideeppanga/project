import React from 'react';
import { Search, AlertTriangle, Clock, CheckCircle, Users, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const availableFood = [
  {
    id: '1',
    title: 'Wedding Reception Leftovers',
    description: 'Assorted Indian cuisine including biryanis, curries, and desserts',
    quantity: '50 servings',
    donorName: 'Bella Vista Restaurant',
    location: '2.3 km away',
    expiryTime: '6 hours',
    status: 'available',
    category: 'prepared'
  },
  {
    id: '2',
    title: 'Fresh Bakery Items',
    description: 'Bread, pastries, and cakes from morning batch',
    quantity: '40 items',
    donorName: 'Golden Crust Bakery',
    location: '1.8 km away',
    expiryTime: '12 hours',
    status: 'available',
    category: 'packaged'
  }
];

const recentReceived = [
  {
    id: '1',
    title: 'Corporate Lunch Surplus',
    donorName: 'TechCorp Solutions',
    quantity: '25 servings',
    receivedAt: '2 days ago',
    rating: 5
  },
  {
    id: '2',
    title: 'Restaurant Evening Special',
    donorName: 'Spice Garden',
    quantity: '18 servings',
    receivedAt: '4 days ago',
    rating: 4
  }
];

const stats = [
  { label: 'Total Received', value: '89', icon: Users, color: 'text-emerald-600' },
  { label: 'Active Requests', value: '3', icon: Clock, color: 'text-orange-600' },
  { label: 'This Month', value: '12', icon: CheckCircle, color: 'text-green-600' },
  { label: 'Lives Impacted', value: '450', icon: Heart, color: 'text-red-600' }
];

interface RecipientDashboardProps {
  onTabChange: (tab: string) => void;
}

export function RecipientDashboard({ onTabChange }: RecipientDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recipient Dashboard</h1>
          <p className="text-gray-600 mt-1">Find and request food donations for your organization</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button
            variant="secondary"
            icon={AlertTriangle}
            onClick={() => onTabChange('emergency')}
          >
            Emergency Request
          </Button>
          <Button
            icon={Search}
            onClick={() => onTabChange('browse')}
          >
            Browse Food
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 mb-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Available Food Items */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Available Food Nearby</h2>
          <Button variant="outline" size="sm" onClick={() => onTabChange('browse')}>
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {availableFood.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>📍 {item.location}</span>
                      <span>🍽️ {item.quantity}</span>
                      <span>⏰ Expires in {item.expiryTime}</span>
                    </div>
                    <p className="text-sm font-medium text-emerald-700 mt-1">
                      Donated by {item.donorName}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Badge variant="success">Available</Badge>
                    <Button size="sm">Request</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Recent Received Items</h3>
          <div className="space-y-3">
            {recentReceived.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} from {item.donorName}
                  </p>
                  <p className="text-xs text-gray-500">{item.receivedAt}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4"
            onClick={() => onTabChange('received')}
          >
            View All Received Items
          </Button>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              icon={Search}
              onClick={() => onTabChange('browse')}
            >
              Browse Available Food
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              icon={AlertTriangle}
              onClick={() => onTabChange('emergency')}
            >
              Make Emergency Request
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              icon={Heart}
              onClick={() => onTabChange('feedback')}
            >
              Leave Feedback
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              icon={CheckCircle}
              onClick={() => onTabChange('received')}
            >
              View Received Items
            </Button>
          </div>
        </Card>
      </div>

      {/* Impact Summary */}
      <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Your Impact This Month</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-2xl font-bold">450</p>
              <p className="text-emerald-100">People Fed</p>
            </div>
            <div>
              <p className="text-2xl font-bold">89 kg</p>
              <p className="text-emerald-100">Food Rescued</p>
            </div>
            <div>
              <p className="text-2xl font-bold">52 kg</p>
              <p className="text-emerald-100">CO₂ Saved</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}