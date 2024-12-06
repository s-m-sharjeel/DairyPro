import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // Import QueryClientProvider
import { AuthProvider, useAuth } from './context/AuthContext';

import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Settings from './Components/settings/settings';
import MilkProductionList from './Components/MilkProduction/MilkProductionList';
import AddMilkProduction from './Components/MilkProduction/AddMilkProduction';
import AddBreedingRecord from './Components/BreedingManagement/AddBreedingRecord';
import AddOffspringRecord from './Components/BreedingManagement/AddOffspringRecord';
import VeterinaryRecordsList from './Components/AnimalHealth/VeterinaryRecordsList';
import AddVeterinaryRecord from './Components/AnimalHealth/AddVeterinaryRecord';
import FeedInventoryList from './Components/FeedManagement/FeedInventoryList';
import AddFeedInventory from './Components/FeedManagement/AddFeedInventory';
import CattleList from './Components/CattleManagement/CattleList';
import AddCattle from './Components/CattleManagement/AddCattle';
import OffspringList from './Components/CattleManagement/OffSpringList';
import Login from './pages/Login';
import Register from './pages/Register';

// AuthWrapper Component to protect routes
const AuthWrapper = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate('/login');
    }
  }, [user, navigate]);

  return <>{children}</>;
};

// SidebarWithAuth Component
const SidebarWithAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user?.isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register') {
    return <Sidebar />;
  }

  return null;
};

// App Component
const App = () => {
  const queryClient = new QueryClient(); // Create QueryClient instance

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}> {/* Ensure the QueryClientProvider wraps the app */}
        <Router>
          <div className="app-layout" style={{ display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ display: 'flex', flex: 1 }}>
              <SidebarWithAuth />
              <div className="content" style={{ flex: 1, padding: '20px' }}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<AuthWrapper><Home /></AuthWrapper>} />
                  <Route path="/dashboard" element={<AuthWrapper><Dashboard /></AuthWrapper>} />
                  <Route path="/milk-production" element={<AuthWrapper><MilkProductionList /></AuthWrapper>} />
                  <Route path="/add-milk-production" element={<AuthWrapper><AddMilkProduction /></AuthWrapper>} />
                  <Route path="/add-breeding-record" element={<AuthWrapper><AddBreedingRecord /></AuthWrapper>} />
                  <Route path="/add-offspring" element={<AuthWrapper><AddOffspringRecord /></AuthWrapper>} />
                  <Route path="/veterinary-records" element={<AuthWrapper><VeterinaryRecordsList /></AuthWrapper>} />
                  <Route path="/add-veterinary-record" element={<AuthWrapper><AddVeterinaryRecord /></AuthWrapper>} />
                  <Route path="/feed-inventory" element={<AuthWrapper><FeedInventoryList /></AuthWrapper>} />
                  <Route path="/add-feed-inventory" element={<AuthWrapper><AddFeedInventory /></AuthWrapper>} />
                  <Route path="/cattle-list" element={<AuthWrapper><CattleList /></AuthWrapper>} />
                  <Route path="/add-cattle" element={<AuthWrapper><AddCattle /></AuthWrapper>} />
                  <Route path="/offspring-list" element={<AuthWrapper><OffspringList /></AuthWrapper>} />
                  <Route path="/settings" element={<AuthWrapper><Settings /></AuthWrapper>} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
