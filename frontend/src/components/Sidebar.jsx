import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Include styles for the sidebar

// Icons for navigation items
import { FaTachometerAlt, FaSeedling, FaClipboard, FaDatabase, FaClinicMedical } from 'react-icons/fa';

// Importing the useAuth hook to access authentication state
import { useAuth } from '../context/AuthContext'; 

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Use the useAuth hook to get login status and logout function
  const { loggedIn, logout } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // If not logged in, don't show the sidebar
  if (!loggedIn) {
    return null;  // This will hide the sidebar when logged out
  }

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? '➡️' : '⬅️'}
      </button>
      <ul className="nav-list">
        <li>
          <NavLink to="/dashboard" activeClassName="active">
            <FaTachometerAlt className="icon" />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>
        </li>

        {/* Milk Production Category */}
        <li className="category">
          <NavLink to="/milk-production" activeClassName="active">
            <FaSeedling className="icon" />
            {!isCollapsed && <span>Milk Production</span>}
          </NavLink>
          <ul className="sub-categories">
            <li>
              <NavLink to="/milk-production" activeClassName="active">Production List</NavLink>
            </li>
            <li>
              <NavLink to="/add-milk-production" activeClassName="active">Add Production</NavLink>
            </li>
          </ul>
        </li>

        {/* Animal Health Category */}
        <li className="category">
          <NavLink to="/veterinary-records" activeClassName="active">
            <FaClinicMedical className="icon" />
            {!isCollapsed && <span>Animal Health</span>}
          </NavLink>
          <ul className="sub-categories">
            <li>
              <NavLink to="/veterinary-records" activeClassName="active">Veterinary Records</NavLink>
            </li>
            <li>
              <NavLink to="/add-veterinary-record" activeClassName="active">Add Record</NavLink>
            </li>
          </ul>
        </li>

        {/* Feed Management Category */}
        <li className="category">
          <NavLink to="/feed-inventory" activeClassName="active">
            <FaClipboard className="icon" />
            {!isCollapsed && <span>Feed Management</span>}
          </NavLink>
          <ul className="sub-categories">
            <li>
              <NavLink to="/feed-inventory" activeClassName="active">Feed Inventory</NavLink>
            </li>
            <li>
              <NavLink to="/add-feed-inventory" activeClassName="active">Add Feed</NavLink>
            </li>
          </ul>
        </li>

        {/* Breeding Management Category */}
        <li className="category">
          <NavLink to="/add-breeding-record" activeClassName="active">
            <FaDatabase className="icon" />
            {!isCollapsed && <span>Breeding Management</span>}
          </NavLink>
          <ul className="sub-categories">
            <li>
              <NavLink to="/add-breeding-record" activeClassName="active">Add Breeding Record</NavLink>
            </li>
            <li>
              <NavLink to="/add-offspring" activeClassName="active">Add Offspring</NavLink>
            </li>
          </ul>
        </li>

        {/* Cattle Management Category */}
        {/* Add more categories as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
