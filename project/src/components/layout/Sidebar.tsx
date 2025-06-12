import React from 'react';
import { 
  Home, 
  Plus, 
  Search, 
  BarChart3, 
  MessageSquare, 
  Settings,
  Gift,
  Heart,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ activeTab, onTabChange, isOpen = true, onClose }: SidebarProps) {
  const { user } = useAuth();

  const donorTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'add-food', label: 'Add Food', icon: Plus },
    { id: 'requests', label: 'Requests', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const recipientTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'browse', label: 'Browse Food', icon: Search },
    { id: 'emergency', label: 'Emergency Request', icon: AlertTriangle },
    { id: 'received', label: 'Received', icon: Gift },
    { id: 'feedback', label: 'Feedback', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const tabs = user?.type === 'donor' ? donorTabs : recipientTabs;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out z-50 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <nav className="h-full px-4 py-6 overflow-y-auto">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    onClose?.();
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}