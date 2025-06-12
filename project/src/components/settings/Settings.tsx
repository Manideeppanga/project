import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { User, Bell, Shield, MapPin, Save, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    organization: user?.organization || '',
    address: user?.location?.address || ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReport: true,
    emergencyAlerts: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'location', label: 'Location', icon: MapPin }
  ];

  const handleSaveProfile = () => {
    // Simulate API call
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
        <Button
          variant="outline"
          size="sm"
          icon={Edit}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Organization Name"
          value={profileData.name}
          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
          disabled={!isEditing}
        />
        <Input
          label="Email Address"
          type="email"
          value={profileData.email}
          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
          disabled={!isEditing}
        />
        <Input
          label="Phone Number"
          type="tel"
          value={profileData.phone}
          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
          disabled={!isEditing}
        />
        <Input
          label="Organization Type"
          value={profileData.organization}
          onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
          disabled={!isEditing}
        />
      </div>

      <Input
        label="Address"
        value={profileData.address}
        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
        disabled={!isEditing}
      />

      {isEditing && (
        <div className="flex space-x-3">
          <Button icon={Save} onClick={handleSaveProfile}>
            Save Changes
          </Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      )}

      <div className="pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Account Statistics</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {user?.type === 'donor' ? user?.totalDonations || 156 : user?.totalReceived || 89}
            </div>
            <div className="text-sm text-emerald-700">
              {user?.type === 'donor' ? 'Total Donations' : 'Items Received'}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{user?.rating || 4.8}</div>
            <div className="text-sm text-blue-700">Rating</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">
              {user?.verified ? 'Verified' : 'Pending'}
            </div>
            <div className="text-sm text-orange-700">Status</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
      
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </h4>
              <p className="text-sm text-gray-600">
                {key === 'emailNotifications' && 'Receive updates via email'}
                {key === 'pushNotifications' && 'Browser push notifications'}
                {key === 'smsNotifications' && 'Text message alerts'}
                {key === 'weeklyReport' && 'Weekly impact summary'}
                {key === 'emergencyAlerts' && 'Urgent food request notifications'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleNotificationChange(key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
      
      <div className="space-y-4">
        <Card padding="sm">
          <h4 className="font-medium text-gray-900 mb-2">Password</h4>
          <p className="text-sm text-gray-600 mb-4">Update your password regularly for better security</p>
          <Button variant="outline" size="sm">Change Password</Button>
        </Card>

        <Card padding="sm">
          <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
          <Button variant="outline" size="sm">Enable 2FA</Button>
        </Card>

        <Card padding="sm">
          <h4 className="font-medium text-gray-900 mb-2">Data Export</h4>
          <p className="text-sm text-gray-600 mb-4">Download your account data and donation history</p>
          <Button variant="outline" size="sm">Export Data</Button>
        </Card>

        <Card padding="sm">
          <h4 className="font-medium text-gray-900 mb-2">Account Deletion</h4>
          <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all associated data</p>
          <Button variant="danger" size="sm">Delete Account</Button>
        </Card>
      </div>
    </div>
  );

  const renderLocationTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Location Settings</h3>
      
      <div className="space-y-4">
        <Card padding="sm">
          <h4 className="font-medium text-gray-900 mb-2">Current Location</h4>
          <p className="text-sm text-gray-600 mb-4">{user?.location?.address}</p>
          <Button variant="outline" size="sm">Update Location</Button>
        </Card>

        <Card padding="sm">
          <h4 className="font-medium text-gray-900 mb-2">Service Radius</h4>
          <p className="text-sm text-gray-600 mb-4">
            {user?.type === 'donor' 
              ? 'How far recipients can be from your location'
              : 'How far you can travel to pick up donations'
            }
          </p>
          <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
            <option value="5">5 km</option>
            <option value="10" selected>10 km</option>
            <option value="20">20 km</option>
            <option value="50">50 km</option>
          </select>
        </Card>

        <Card padding="sm">
          <h4 className="font-medium text-gray-900 mb-2">Location Sharing</h4>
          <p className="text-sm text-gray-600 mb-4">
            Allow the platform to use your location for better matching
          </p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </Card>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'notifications': return renderNotificationsTab();
      case 'privacy': return renderPrivacyTab();
      case 'location': return renderLocationTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:w-64" padding="sm">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Main Content */}
        <Card className="flex-1">
          {renderTabContent()}
        </Card>
      </div>
    </div>
  );
}