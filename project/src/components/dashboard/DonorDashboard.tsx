import React from 'react';
import { Plus, Clock, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const mockFoodItems = [
  {
    id: '1',
    title: 'Wedding Reception Leftovers',
    description: 'Assorted Indian cuisine including biryanis, curries, and desserts',
    quantity: '50 servings',
    category: 'prepared',
    expiryTime: '6 hours',
    status: 'available',
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    title: 'Corporate Event Catering',
    description: 'Sandwiches, salads, and beverages from tech conference',
    quantity: '30 servings',
    category: 'prepared',
    expiryTime: '4 hours',
    status: 'requested',
    createdAt: '1 hour ago'
  },
  {
    id: '3',
    title: 'Fresh Produce Surplus',
    description: 'Vegetables and fruits nearing expiry from restaurant stock',
    quantity: '25 kg',
    category: 'raw',
    expiryTime: '2 days',
    status: 'delivered',
    createdAt: '1 day ago'
  }
];

const stats = [
  { label: 'Total Donations', value: '156', icon: TrendingUp, color: 'text-emerald-600' },
  { label: 'Active Listings', value: '12', icon: Clock, color: 'text-orange-600' },
  { label: 'Completed', value: '144', icon: CheckCircle, color: 'text-green-600' },
  { label: 'People Fed', value: '2,340', icon: Users, color: 'text-blue-600' }
];

interface DonorDashboardProps {
  onTabChange: (tab: string) => void;
}

export function DonorDashboard({ onTabChange }: DonorDashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'requested': return 'warning';
      case 'delivered': return 'info';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your food donations and track impact</p>
        </div>
        <Button
          icon={Plus}
          onClick={() => onTabChange('add-food')}
          className="mt-4 sm:mt-0"
        >
          Add Food Item
        </Button>
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

      {/* Recent Food Items */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Food Items</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {mockFoodItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Quantity: {item.quantity}</span>
                      <span>Expires in: {item.expiryTime}</span>
                      <span>Posted: {item.createdAt}</span>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(item.status)} className="ml-4 capitalize">
                    {item.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Pending Requests</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Sunshine Orphanage</p>
                <p className="text-sm text-gray-600">Wedding Reception Leftovers</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Decline</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Hope Foundation</p>
                <p className="text-sm text-gray-600">Corporate Event Catering</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Decline</Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Impact This Month</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Meals Provided</span>
              <span className="font-semibold text-gray-900">342</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Organizations Helped</span>
              <span className="font-semibold text-gray-900">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Food Waste Reduced</span>
              <span className="font-semibold text-gray-900">156 kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Environmental Impact</span>
              <span className="font-semibold text-emerald-600">-89 kg CO₂</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}