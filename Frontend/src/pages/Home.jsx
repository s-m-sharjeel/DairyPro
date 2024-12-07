import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; 

const Home = () => {
  // const navigate = useNavigate();
  // const { logout } = useAuth();

  // const handleLogout = () => {
  //   logout();
  //   navigate('/login');
  // };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f4f7fa', padding: 2 }}>
      <Typography variant="h3" sx={{ marginBottom: 3, color: '#1976d2' }}>Welcome to DairyPro</Typography>
      <Typography variant="h5" sx={{ marginBottom: 4, color: '#555' }}>Your Dairy Farm Management Solution</Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Button component={Link} to="/cattle-list" variant="contained" fullWidth sx={{ backgroundColor: '#0288d1', color: 'white', '&:hover': { backgroundColor: '#0277bd' }, boxShadow: 3 }}>Cattle Management</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button component={Link} to="/milk-production" variant="contained" fullWidth sx={{ backgroundColor: '#0288d1', color: 'white', '&:hover': { backgroundColor: '#0277bd' }, boxShadow: 3 }}>Milk Production</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button component={Link} to="/veterinary-records" variant="contained" fullWidth sx={{ backgroundColor: '#0288d1', color: 'white', '&:hover': { backgroundColor: '#0277bd' }, boxShadow: 3 }}>Animal Health</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button component={Link} to="/feed-inventory" variant="contained" fullWidth sx={{ backgroundColor: '#0288d1', color: 'white', '&:hover': { backgroundColor: '#0277bd' }, boxShadow: 3 }}>Feed Management</Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button component={Link} to="/breeding-records" variant="contained" fullWidth sx={{ backgroundColor: '#0288d1', color: 'white', '&:hover': { backgroundColor: '#0277bd' }, boxShadow: 3 }}>Breeding Management</Button>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" fullWidth sx={{ backgroundColor: '#d32f2f', color: 'white', '&:hover': { backgroundColor: '#c62828' }, boxShadow: 3 }} onClick={handleLogout}>Logout</Button>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Home;
