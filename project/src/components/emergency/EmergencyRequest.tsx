import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AlertTriangle, Clock, Users, MapPin, Send } from 'lucide-react';

export function EmergencyRequest() {
  const [formData, setFormData] = useState({
    urgencyLevel: 'high',
    peopleCount: '',
    timeframe: '',
    reason: '',
    dietaryRestrictions: '',
    contactPerson: '',
    contactPhone: '',
    deliveryAddress: '',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    alert('Emergency request submitted successfully! We are notifying nearby donors and will respond within 30 minutes.');
    
    // Reset form
    setFormData({
      urgencyLevel: 'high',
      peopleCount: '',
      timeframe: '',
      reason: '',
      dietaryRestrictions: '',
      contactPerson: '',
      contactPhone: '',
      deliveryAddress: '',
      additionalNotes: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Emergency Food Request</h1>
        <p className="text-gray-600 mt-2">
          Submit an urgent request for food assistance. We'll notify nearby donors immediately.
        </p>
      </div>

      {/* Alert Banner */}
      <Card className="bg-red-50 border-red-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-900">Emergency Request Protocol</h3>
            <p className="text-sm text-red-800 mt-1">
              This form is for urgent food needs only. Our team will prioritize your request and 
              notify all available donors within a 15km radius within 30 minutes.
            </p>
          </div>
        </div>
      </Card>

      {/* Emergency Request Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Urgency and Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-red-600" />
              Emergency Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urgency Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.urgencyLevel}
                  onChange={(e) => handleInputChange('urgencyLevel', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                >
                  <option value="emergency">Critical Emergency</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                </select>
              </div>

              <Input
                label="Number of People"
                placeholder="e.g., 50"
                value={formData.peopleCount}
                onChange={(e) => handleInputChange('peopleCount', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Timeframe <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.timeframe}
                onChange={(e) => handleInputChange('timeframe', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">Select timeframe</option>
                <option value="immediate">Immediate (within 2 hours)</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this-week">This week</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Emergency <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Please describe the emergency situation and why immediate food assistance is needed..."
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Food Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-red-600" />
              Food Requirements
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dietary Restrictions/Preferences
              </label>
              <textarea
                placeholder="Any dietary restrictions, allergies, or specific food preferences..."
                value={formData.dietaryRestrictions}
                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Person"
                placeholder="Name of person to contact"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                required
              />

              <Input
                label="Contact Phone"
                type="tel"
                placeholder="Emergency contact number"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-red-600" />
              Delivery Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <select
                value={formData.deliveryAddress}
                onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="registered">Use my registered address</option>
                <option value="different">Different address</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                placeholder="Any additional information that might help donors (accessibility, preferred delivery time, etc.)..."
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500"
              loading={isSubmitting}
              icon={Send}
            >
              {isSubmitting ? 'Submitting Emergency Request...' : 'Submit Emergency Request'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>

      {/* Help Information */}
      <Card className="bg-blue-50 border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">Need Immediate Help?</h3>
        <p className="text-sm text-blue-800 mb-3">
          If this is a life-threatening emergency, please contact emergency services immediately.
        </p>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Emergency Hotline:</strong> +1 (555) 911-FOOD</p>
          <p><strong>24/7 Support:</strong> support@foodbridge.org</p>
          <p><strong>Response Time:</strong> Emergency requests are processed within 30 minutes</p>
        </div>
      </Card>
    </div>
  );
}