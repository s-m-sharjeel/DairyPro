import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';

import Sidebar from './components/Sidebar'; // Import Sidebar
import Navbar from './components/Navbar'; // Import Navbar
import Home from './pages/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Settings  from './components/settings/settings';
import MilkProductionList from './components/MilkProduction/MilkProductionList';
import AddMilkProduction from './components/MilkProduction/AddMilkProduction';
import AddBreedingRecord from './components/BreedingManagement/AddBreedingRecord';
import AddOffspringRecord from './components/BreedingManagement/AddOffspringRecord';
import VeterinaryRecordsList from './components/AnimalHealth/VeterinaryRecordsList';
import AddVeterinaryRecord from './components/AnimalHealth/AddVeterinaryRecord';
import FeedInventoryList from './components/FeedManagement/FeedInventoryList';
import AddFeedInventory from './components/FeedManagement/AddFeedInventory';
import CattleList from './components/CattleManagement/CattleList';
import AddCattle from './components/CattleManagement/AddCattle';
import OffspringList from './components/CattleManagement/OffSpringList';
import Login from './pages/Login';
import Register from './pages/Register';

// AuthWrapper Component to protect routes
const AuthWrapper = ({ children }) => {
  const { user } = useAuth();  // Get user state from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate('/login'); // If user is not authenticated, navigate to login
    }
  }, [user, navigate]);

  return <>{children}</>;
};

// App Component
const App = () => {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="app-layout" style={{ display: 'flex', flexDirection: 'column' }}>
            <Navbar /> {/* Adding Navbar at the top */}
            <div style={{ display: 'flex', flex: 1 }}>
              <SidebarWithAuth /> {/* Sidebar conditionally rendered based on authentication */}
              <div className="content" style={{ flex: 1, padding: '20px' }}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/" 
                    element={<AuthWrapper><Home /></AuthWrapper>} 
                  />
                  <Route 
                    path="/dashboard" 
                    element={<AuthWrapper><Dashboard /></AuthWrapper>} 
                  />
                  <Route 
                    path="/milk-production" 
                    element={<AuthWrapper><MilkProductionList /></AuthWrapper>} 
                  />
                  <Route 
                    path="/add-milk-production" 
                    element={<AuthWrapper><AddMilkProduction /></AuthWrapper>} 
                  />
                  <Route 
                    path="/add-breeding-record" 
                    element={<AuthWrapper><AddBreedingRecord /></AuthWrapper>} 
                  />
                  <Route 
                    path="/add-offspring" 
                    element={<AuthWrapper><AddOffspringRecord /></AuthWrapper>} 
                  />
                  <Route 
                    path="/veterinary-records" 
                    element={<AuthWrapper><VeterinaryRecordsList /></AuthWrapper>} 
                  />
                  <Route 
                    path="/add-veterinary-record" 
                    element={<AuthWrapper><AddVeterinaryRecord /></AuthWrapper>} 
                  />
                  <Route 
                    path="/feed-inventory" 
                    element={<AuthWrapper><FeedInventoryList /></AuthWrapper>} 
                  />
                  <Route 
                    path="/add-feed-inventory" 
                    element={<AuthWrapper><AddFeedInventory /></AuthWrapper>} 
                  />
                  <Route 
                    path="/cattle-list" 
                    element={<AuthWrapper><CattleList /></AuthWrapper>} 
                  />
                  <Route 
                    path="/add-cattle" 
                    element={<AuthWrapper><AddCattle /></AuthWrapper>} 
                  />
                  <Route 
                    path="/offspring-list" 
                    element={<AuthWrapper><OffspringList /></AuthWrapper>} 
                  />
                  <Route 
                    path="/settings" 
                    element={<AuthWrapper><Settings /></AuthWrapper>} 
                  />

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

// Sidebar component, only rendered if authenticated
const SidebarWithAuth = () => {
  const { user } = useAuth(); // Get authentication status
  const location = useLocation(); // Get current location

  // Conditionally render Sidebar based on authentication and route
  if (user?.isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register') {
    return <Sidebar />;
  }

  return null; // Return null if user is not authenticated or on login/register page
};

export default App;
