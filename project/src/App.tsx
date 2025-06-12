import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/auth/AuthForm';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DonorDashboard } from './components/dashboard/DonorDashboard';
import { RecipientDashboard } from './components/dashboard/RecipientDashboard';
import { AddFoodForm } from './components/forms/AddFoodForm';
import { BrowseFood } from './components/food/BrowseFood';
import { RequestsView } from './components/requests/RequestsView';
import { Analytics } from './components/analytics/Analytics';
import { Settings } from './components/settings/Settings';
import { EmergencyRequest } from './components/emergency/EmergencyRequest';
import { ReceivedItems } from './components/received/ReceivedItems';
import { FeedbackView } from './components/feedback/FeedbackView';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <AuthForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user.type === 'donor' 
          ? <DonorDashboard onTabChange={setActiveTab} />
          : <RecipientDashboard onTabChange={setActiveTab} />;
      case 'add-food':
        return <AddFoodForm />;
      case 'browse':
        return <BrowseFood />;
      case 'requests':
        return <RequestsView />;
      case 'analytics':
        return <Analytics />;
      case 'emergency':
        return <EmergencyRequest />;
      case 'received':
        return <ReceivedItems />;
      case 'feedback':
        return <FeedbackView />;
      case 'settings':
        return <Settings />;
      default:
        return user.type === 'donor' 
          ? <DonorDashboard onTabChange={setActiveTab} />
          : <RecipientDashboard onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        showMenuButton={true}
      />
      
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;