import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Components/Dashboard/Dashboard';
import MilkProductionList from './Components/MilkProduction/MilkProductionList';
//import AnimalHealth from './components/AnimalHealth/VeterinaryRecordsList';
// Import other components...

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/milk-production" element={<MilkProductionList />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
