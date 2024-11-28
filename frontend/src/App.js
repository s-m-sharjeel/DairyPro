import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';  // Correct import
import Login from './pages/Login';  // Correct import
import Register from './pages/Register';  // Correct import
import Sidebar from './components/Sidebar'; // Sidebar with links
import Home from './pages/Home'; // Import the Home page
import Dashboard from './components/Dashboard/Dashboard'; // Import the Dashboard page
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
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const App = () => {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1 }}>
              {/* Wrap all Route components inside a Routes element */}
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/milk-production" element={<MilkProductionList />} />
                  <Route path="/add-milk-production" element={<AddMilkProduction />} />
                  <Route path="/add-breeding-record" element={<AddBreedingRecord />} />
                  <Route path="/add-offspring-record" element={<AddOffspringRecord />} />
                  <Route path="/veterinary-records" element={<VeterinaryRecordsList />} />
                  <Route path="/add-veterinary-record" element={<AddVeterinaryRecord />} />
                  <Route path="/feed-inventory" element={<FeedInventoryList />} />
                  <Route path="/add-feed-inventory" element={<AddFeedInventory />} />
                  <Route path="/cattle-list" element={<CattleList />} />
                  <Route path="/add-cattle" element={<AddCattle />} />
                  <Route path="/offspring-list" element={<OffspringList />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
