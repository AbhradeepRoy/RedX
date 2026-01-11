import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Register } from './components/Register';
import { ProfileSetup } from './components/ProfileSetup';
import { RoleSelection } from './components/RoleSelection';
import { RecipientDashboard } from './components/RecipientDashboard';
import { DashboardView } from './components/DashboardView';
import { UserProfile } from './types';
import { AppProvider } from './contexts/AppContext';

// App Stages
type AppStage = 'register' | 'profile' | 'role' | 'dashboard' | 'edit-profile';

const MainApp: React.FC = () => {
  const [stage, setStage] = useState<AppStage>('register');
  const [user, setUser] = useState<Partial<UserProfile> | null>(null);

  const handleRegister = (email: string) => {
    setUser({ email });
    setStage('profile');
  };

  const handleProfileComplete = (profileData: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profileData }));
    if (stage === 'edit-profile') {
        setStage('dashboard');
    } else {
        setStage('role');
    }
  };

  const handleRoleComplete = (roleData: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...roleData }));
    setStage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setStage('register');
  };

  const handleEditProfile = () => {
      setStage('edit-profile');
  };

  const renderContent = () => {
    switch (stage) {
      case 'register':
        return <Register onRegister={handleRegister} />;
      
      case 'profile':
        if (!user?.email) return null;
        return <ProfileSetup email={user.email} onComplete={handleProfileComplete} />;
        
      case 'edit-profile':
        if (!user?.email) return null;
        return <ProfileSetup email={user.email} onComplete={handleProfileComplete} initialData={user} />;
      
      case 'role':
        return <RoleSelection onRoleComplete={handleRoleComplete} />;
      
      case 'dashboard':
        if (!user || !user.role) return null;
        
        if (user.role === 'recipient') {
          return <RecipientDashboard user={user as UserProfile} />;
        }
        
        // Extended dashboard for Donor, Hospital, Bloodbank
        return <DashboardView user={user as UserProfile} />;
      
      default:
        return <div>Unknown state</div>;
    }
  };

  return (
    <Layout user={user as UserProfile} onLogout={handleLogout} onEditProfile={handleEditProfile}>
      {/* Key prop ensures the animation triggers when stage changes */}
      <div key={stage} className="animate-fade-in w-full">
        {renderContent()}
      </div>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;