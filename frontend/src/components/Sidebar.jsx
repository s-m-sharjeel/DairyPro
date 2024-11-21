import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Include styles for the sidebar

// Icons for navigation items
import { FaTachometerAlt, FaSeedling, FaClipboard, FaDatabase, FaClinicMedical, FaChartLine } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
        <li>
          <NavLink to="/milk-production" activeClassName="active">
            <FaSeedling className="icon" />  {/* Use alternative icon */}
            {!isCollapsed && <span>Milk Production</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/animal-health" activeClassName="active">
            <FaClinicMedical className="icon" />
            {!isCollapsed && <span>Animal Health</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/feed-management" activeClassName="active">
            <FaClipboard className="icon" />
            {!isCollapsed && <span>Feed Management</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/breeding-management" activeClassName="active">
            <FaDatabase className="icon" />
            {!isCollapsed && <span>Breeding Management</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/cattle-management" activeClassName="active">
            <FaChartLine className="icon" />
            {!isCollapsed && <span>Cattle Management</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
