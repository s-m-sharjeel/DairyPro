import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // For handling dropdown menu on the right side
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = React.useState(null);
  const open = Boolean(anchorEl);
  const openNotifications = Boolean(anchorElNotifications);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        {/* Left side menu icon */}
        <IconButton component={Link} to="/dashboard" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
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
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

              {/* Notifications Dropdown */}
              <Menu
                anchorEl={anchorElNotifications}
                open={openNotifications}
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
  );
};

export default Navbar;
