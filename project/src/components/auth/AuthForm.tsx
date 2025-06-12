import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Heart, Building, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'donor' | 'recipient'>('donor');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    organization: '',
    phone: '',
    address: ''
  });
  const [error, setError] = useState('');

  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password, userType);
      } else {
        await register({
          ...formData,
          type: userType,
          location: {
            address: formData.address,
            lat: 40.7128,
            lng: -74.0060
          }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-emerald-600 p-3 rounded-xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">FoodBridge</span>
          </div>
          <p className="text-gray-600">Connecting hearts through food sharing</p>
        </div>

        <Card>
          <div className="space-y-6">
            {/* User Type Selection */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setUserType('donor')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  userType === 'donor'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Food Donor</span>
              </button>
              <button
                type="button"
                onClick={() => setUserType('recipient')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  userType === 'recipient'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Recipient</span>
              </button>
            </div>

            {/* Login/Register Toggle */}
            <div className="text-center">
              <div className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <Input
                    label="Organization Name"
                    placeholder="Enter your organization name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  <Input
                    label="Organization Type"
                    placeholder="e.g., Restaurant, NGO, Orphanage"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                  <Input
                    label="Address"
                    placeholder="Enter your full address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </>
              )}

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                loading={isLoading}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            {isLogin && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">Demo Accounts:</p>
                <div className="text-xs text-blue-700 space-y-1">
                  <p><strong>Donor:</strong> contact@bellavista.com / demo123</p>
                  <p><strong>Recipient:</strong> admin@sunshineorphanage.org / demo123</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}