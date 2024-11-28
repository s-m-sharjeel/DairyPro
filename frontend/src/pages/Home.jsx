import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct path based on your folder structure

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();  // Accessing the logout function from the context

  const handleLogout = () => {
    logout();  // Call logout function
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f7fa',
        padding: 2,
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: 3 }}>
        Welcome to DairyPro
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        Manage your cattle efficiently with our comprehensive tracking system.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Button
            component={Link}
            to="/dashboard"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            Go to Dashboard
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button
            component={Link}
            to="/milk-production"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#388e3c',
              color: 'white',
              '&:hover': { backgroundColor: '#2c6e29' },
            }}
          >
            Milk Production
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button
            component={Link}
            to="/animal-health"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#0288d1',
              color: 'white',
              '&:hover': { backgroundColor: '#0277bd' },
            }}
          >
            Animal Health
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button
            component={Link}
            to="/feed-management"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#7b1fa2',
              color: 'white',
              '&:hover': { backgroundColor: '#6a1b9a' },
            }}
          >
            Feed Management
          </Button>
        </Grid>

        {/* Logout Button */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#d32f2f',
              color: 'white',
              '&:hover': { backgroundColor: '#c62828' },
            }}
            onClick={handleLogout} // Trigger logout function
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
