import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { FaTachometerAlt, FaSeedling, FaClipboard, FaDatabase, FaClinicMedical, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './NavbarWithSidebar.css'; // Add CSS for Drawer & Navbar

const NavbarWithSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = React.useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNotificationsOpen = (event) => setAnchorElNotifications(event.currentTarget);
  const handleNotificationsClose = () => setAnchorElNotifications(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate('/setting');
    handleMenuClose();
  };

  return (
    <>
      {/* AppBar (Navbar) */}
      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        {/* Menu Icon to Toggle Sidebar */}
        <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>

        {/* App name */}
        <Typography component={Link} to="/home" variant="h6" sx={{ flexGrow: 1 }}>
          DairyPro
        </Typography>

        {/* Right side profile and navigation buttons */}
        <Box sx={{ display: 'flex' }}>
          {user?.isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/home"
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/dashboard"
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                Dashboard
              </Button>
              
              {/* Button for Notifications with Badge */}
              <IconButton 
                color="inherit" 
                onClick={handleNotificationsOpen}
                sx={{ marginRight: 2 }}
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* Button for Settings */}
              <IconButton
                color="inherit"
                component={Link}
                to="/settings"
                sx={{ marginRight: 2 }}
              >
                <SettingsIcon />
              </IconButton>

              {/* Profile button with dropdown menu */}
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ marginRight: 2 }}
              >
                {user?.name}
              </Button>

              {/* Dropdown menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

              {/* Notifications Dropdown */}
              <Menu
                anchorEl={anchorElNotifications}
                open={Boolean(anchorElNotifications)}
                onClose={handleNotificationsClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-notifications-button',
                }}
              >
                <MenuItem onClick={handleNotificationsClose}>Notification 1</MenuItem>
                <MenuItem onClick={handleNotificationsClose}>Notification 2</MenuItem>
                <MenuItem onClick={handleNotificationsClose}>Notification 3</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{ marginRight: 2 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                color="inherit"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>

      {/* Sidebar as a Drawer */}
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 250, padding: 2, backgroundColor: '#2c3e50', color: 'white', height: '100%' }}>
          {/* Sidebar Links */}
          <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
            Navigation
          </Typography>
          <ul className="sidebar-links">
            <li>
              <Link to="/dashboard">
                <FaTachometerAlt className="icon" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/milk-production">
                <FaSeedling className="icon" /> Milk Production
              </Link>
            </li>
            <li>
              <Link to="/veterinary-records">
                <FaClinicMedical className="icon" /> Animal Health
              </Link>
            </li>
            <li>
              <Link to="/feed-inventory">
                <FaClipboard className="icon" /> Feed Management
              </Link>
            </li>
            <li>
              <Link to="/breeding-management">
                <FaDatabase className="icon" /> Breeding Management
              </Link>
            </li>
            <li>
              <Link to="/cattle-list">
                <FaChartLine className="icon" /> Cattle Management
              </Link>
            </li>
          </ul>
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarWithSidebar;
