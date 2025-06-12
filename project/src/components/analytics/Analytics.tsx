import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, Users, Utensils, Leaf, Calendar, Award, MapPin, Heart } from 'lucide-react';

const stats = [
  { label: 'Total Donations', value: '156', change: '+12%', icon: Utensils, color: 'text-emerald-600' },
  { label: 'People Fed', value: '2,340', change: '+18%', icon: Users, color: 'text-blue-600' },
  { label: 'Food Rescued', value: '847 kg', change: '+15%', icon: TrendingUp, color: 'text-orange-600' },
  { label: 'CO₂ Reduced', value: '421 kg', change: '+22%', icon: Leaf, color: 'text-green-600' }
];

const monthlyData = [
  { month: 'Jan', donations: 12, people: 180, food: 68 },
  { month: 'Feb', donations: 15, people: 225, food: 89 },
  { month: 'Mar', donations: 18, people: 270, food: 102 },
  { month: 'Apr', donations: 22, people: 330, food: 125 },
  { month: 'May', donations: 28, people: 420, food: 156 },
  { month: 'Jun', donations: 31, people: 465, food: 178 }
];

const topRecipients = [
  { name: 'Sunshine Orphanage', donations: 24, people: 480, rating: 4.9 },
  { name: 'Hope Foundation', donations: 18, people: 360, rating: 4.8 },
  { name: 'City Food Bank', donations: 15, people: 300, rating: 4.7 },
  { name: 'Elder Care Center', donations: 12, people: 240, rating: 4.9 },
  { name: 'Homeless Shelter', donations: 10, people: 200, rating: 4.6 }
];

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Impact</h1>
        <p className="text-gray-600 mt-1">Track your donation impact and community contribution</p>
      </div>

      {/* Key Stats */}
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
              <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} this month
              </p>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Donations</span>
                    <span className="text-sm font-medium">{data.donations}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(data.donations / 35) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Impact Breakdown */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Impact Breakdown</h3>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-2">2,340</div>
              <div className="text-sm text-emerald-700">Total People Fed</div>
              <div className="text-xs text-emerald-600 mt-1">Equivalent to feeding a small town</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">847 kg</div>
                <div className="text-xs text-blue-700">Food Rescued</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">421 kg</div>
                <div className="text-xs text-green-700">CO₂ Saved</div>
              </div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">156 Donations</div>
              <div className="text-xs text-orange-700">Across 6 months</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Recipients & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Recipients */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Recipients</h3>
            <Heart className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {topRecipients.map((recipient, index) => (
              <div key={recipient.name} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{recipient.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{recipient.donations} donations</span>
                    <span>{recipient.people} people fed</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-sm font-medium">{recipient.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Location Insights */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Location Insights</h3>
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <h4 className="font-medium text-emerald-900 mb-2">Coverage Area</h4>
              <p className="text-sm text-emerald-800">Your donations reach organizations within a 15 km radius</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Downtown District</span>
                <span className="text-sm font-medium">45 donations</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Eastside Community</span>
                <span className="text-sm font-medium">38 donations</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">North Valley</span>
                <span className="text-sm font-medium">32 donations</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">South Hills</span>
                <span className="text-sm font-medium">28 donations</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">West End</span>
                <span className="text-sm font-medium">13 donations</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <div className="text-center">
          <Award className="w-12 h-12 text-emerald-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Community Champion</h3>
          <p className="text-emerald-100 mb-4">
            You've made an incredible impact! Your donations have helped feed over 2,000 people.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="text-lg font-bold">🏆</div>
              <div className="text-sm">Gold Donor</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="text-lg font-bold">🌟</div>
              <div className="text-sm">Community Star</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-3">
              <div className="text-lg font-bold">💚</div>
              <div className="text-sm">Eco Warrior</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}