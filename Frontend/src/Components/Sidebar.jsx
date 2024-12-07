import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames'; // Add this import
import './Sidebar.css'; // Include styles for the sidebar

// Icons for navigation items
import { FaSeedling, FaClipboard, FaDatabase, FaClinicMedical, FaChartLine } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Set default state as collapsed

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const collapseSidebar = () => {
    setIsCollapsed(true);
  };

  return (
    <div className={classNames('sidebar', { 'collapsed': isCollapsed })}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? '➡️' : '⬅️'}
      </button>
      <ul className="nav-list">

        {/* Feed Management */}
        <li>
          <NavLink to="/feed-inventory" className="nav-item" activeClassName="active" onClick={collapseSidebar}>
            <FaSeedling className="icon" />
            {!isCollapsed && <span>Feed Management</span>}
          </NavLink>
        </li>

        {/* Cattle Management */}
        <li>
          <NavLink to="/cattle-list" className="nav-item" activeClassName="active" onClick={collapseSidebar}>
            <FaChartLine className="icon" />
            {!isCollapsed && <span>Cattle Management</span>}
          </NavLink>
        </li>

        {/* Milk Production */}
        <li>
          <NavLink to="/milk-production" className="nav-item" activeClassName="active" onClick={collapseSidebar}>
            <FaClipboard className="icon" />
            {!isCollapsed && <span>Milk Production</span>}
          </NavLink>
        </li>

        {/* Breeding Management */}
        <li>
          <NavLink to="/breeding-records" className="nav-item" activeClassName="active" onClick={collapseSidebar}>
            <FaDatabase className="icon" />
            {!isCollapsed && <span>Breeding Management</span>}
          </NavLink>
        </li>

        {/* Animal Health */}
        <li>
          <NavLink to="/veterinary-records" className="nav-item" activeClassName="active" onClick={collapseSidebar}>
            <FaClinicMedical className="icon" />
            {!isCollapsed && <span>Animal Health</span>}
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
