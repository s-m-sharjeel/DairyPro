import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames'; // Add this import
import './Sidebar.css'; // Include styles for the sidebar

// Icons for navigation items
import { FaTachometerAlt, FaSeedling, FaClipboard, FaDatabase, FaClinicMedical, FaChartLine } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Set default state as collapsed
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMouseEnter = (category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <div className={classNames('sidebar', { 'collapsed': isCollapsed })}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? '➡️' : '⬅️'}
      </button>
      <ul className="nav-list">

        {/* Milk Production */}
        <li
          onMouseEnter={() => handleMouseEnter('milk-production')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="nav-item">
            <FaSeedling className="icon" />
            {!isCollapsed && <span>Milk Production</span>}
          </div>
          {activeCategory === 'milk-production' && !isCollapsed && (
            <ul className="sub-menu">
              <li>
                <NavLink to="/milk-production" activeClassName="active">
                  Milk Production List
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-milk-production" activeClassName="active">
                  Add Milk Production
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Animal Health */}
        <li
          onMouseEnter={() => handleMouseEnter('animal-health')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="nav-item">
            <FaClinicMedical className="icon" />
            {!isCollapsed && <span>Animal Health</span>}
          </div>
          {activeCategory === 'animal-health' && !isCollapsed && (
            <ul className="sub-menu">
              <li>
                <NavLink to="/veterinary-records" activeClassName="active">
                  Veterinary Records
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-veterinary-record" activeClassName="active">
                  Add Veterinary Record
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Feed Management */}
        <li
          onMouseEnter={() => handleMouseEnter('feed-management')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="nav-item">
            <FaClipboard className="icon" />
            {!isCollapsed && <span>Feed Management</span>}
          </div>
          {activeCategory === 'feed-management' && !isCollapsed && (
            <ul className="sub-menu">
              <li>
                <NavLink to="/feed-inventory" activeClassName="active">
                  Feed Inventory
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-feed-inventory" activeClassName="active">
                  Add Feed Inventory
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Breeding Management */}
        <li
          onMouseEnter={() => handleMouseEnter('breeding-management')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="nav-item">
            <FaDatabase className="icon" />
            {!isCollapsed && <span>Breeding Management</span>}
          </div>
          {activeCategory === 'breeding-management' && !isCollapsed && (
            <ul className="sub-menu">
              <li>
                <NavLink to="/add-breeding-record" activeClassName="active">
                  Add Breeding Record
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-offspring" activeClassName="active">
                  Add Offspring Record
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Cattle Management */}
        <li
          onMouseEnter={() => handleMouseEnter('cattle-management')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="nav-item">
            <FaChartLine className="icon" />
            {!isCollapsed && <span>Cattle Management</span>}
          </div>
          {activeCategory === 'cattle-management' && !isCollapsed && (
            <ul className="sub-menu">
              <li>
                <NavLink to="/cattle-list" activeClassName="active">
                  Cattle List
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-cattle" activeClassName="active">
                  Add Cattle
                </NavLink>
              </li>
              <li>
                <NavLink to="/offspring-list" activeClassName="active">
                  Offspring List
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
