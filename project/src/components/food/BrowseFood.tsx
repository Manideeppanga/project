import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Search, Filter, MapPin, Clock, Users } from 'lucide-react';

const mockFoodItems = [
  {
    id: '1',
    title: 'Wedding Reception Leftovers',
    description: 'Assorted Indian cuisine including biryanis, curries, and desserts. Freshly prepared this afternoon.',
    quantity: '50 servings',
    category: 'prepared',
    expiryTime: '6 hours',
    donorName: 'Bella Vista Restaurant',
    donorRating: 4.8,
    location: '2.3 km away',
    status: 'available',
    peopleServed: 50,
    createdAt: '2 hours ago',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    title: 'Corporate Event Surplus',
    description: 'Sandwiches, salads, and beverages from tech conference. All items properly refrigerated.',
    quantity: '30 servings',
    category: 'prepared',
    expiryTime: '4 hours',
    donorName: 'TechCorp Solutions',
    donorRating: 4.9,
    location: '1.8 km away',
    status: 'available',
    peopleServed: 30,
    createdAt: '1 hour ago',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    title: 'Fresh Bakery Items',
    description: 'Bread, pastries, and cakes from morning batch. Perfect for breakfast or snacks.',
    quantity: '40 items',
    category: 'packaged',
    expiryTime: '12 hours',
    donorName: 'Golden Crust Bakery',
    donorRating: 4.7,
    location: '3.1 km away',
    status: 'available',
    peopleServed: 25,
    createdAt: '3 hours ago',
    image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    title: 'Restaurant Evening Special',
    description: 'Italian dishes including pasta, pizza, and desserts. Prepared with organic ingredients.',
    quantity: '25 servings',
    category: 'prepared',
    expiryTime: '8 hours',
    donorName: 'Mama Mia Trattoria',
    donorRating: 4.6,
    location: '4.2 km away',
    status: 'requested',
    peopleServed: 25,
    createdAt: '1 hour ago',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export function BrowseFood() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('nearest');
  const [showFilters, setShowFilters] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'requested': return 'warning';
      default: return 'neutral';
    }
  };

  const handleRequest = (itemId: string) => {
    alert(`Request sent for food item ${itemId}. The donor will be notified and will respond soon.`);
  };

  const filteredItems = mockFoodItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.donorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Browse Available Food</h1>
        <p className="text-gray-600 mt-1">Discover food donations near you and make requests</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search food, donor, or cuisine type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              variant="outline"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Categories</option>
                  <option value="prepared">Prepared Food</option>
                  <option value="raw">Raw Ingredients</option>
                  <option value="packaged">Packaged Items</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="nearest">Nearest First</option>
                  <option value="expiry">Expiring Soon</option>
                  <option value="quantity">Largest Quantity</option>
                  <option value="newest">Most Recent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="5">Within 5 km</option>
                  <option value="10">Within 10 km</option>
                  <option value="20">Within 20 km</option>
                  <option value="50">Within 50 km</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredItems.length} food donation{filteredItems.length !== 1 ? 's' : ''} available
        </p>
        <div className="text-sm text-gray-500">
          Updates every 5 minutes
        </div>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200" hoverable>
            <div className="space-y-4">
              {/* Food Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant={getStatusColor(item.status)} className="capitalize">
                    {item.status}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge variant="info" className="bg-black bg-opacity-50 text-white border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.expiryTime} left
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.description}</p>
                
                {/* Donor Info */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-medium text-sm">
                      {item.donorName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.donorName}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400 text-xs">⭐</span>
                      <span className="text-xs text-gray-500">{item.donorRating}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{item.quantity}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full"
                  disabled={item.status !== 'available'}
                  onClick={() => handleRequest(item.id)}
                >
                  {item.status === 'available' ? 'Request This Food' : 'Already Requested'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No food items found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or check back later for new donations.
          </p>
        </Card>
      )}
    </div>
  );
}