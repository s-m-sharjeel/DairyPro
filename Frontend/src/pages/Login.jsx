import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user?.isAuthenticated) {
      navigate('/home');
    }
  }, [user, navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error state before each login attempt
  
    // Log form data before submitting
    console.log('Form Data:', formData);
  
    // Validate form inputs
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }
  
    try {
      const credentials = {
        contactInfo: formData.email, // Change 'email' to 'contactInfo' to match backend
        password: formData.password,
      };
      await login(credentials); // Call login from AuthContext
      navigate('/home'); // Navigate to home page on successful login
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.'); // Handle error from login
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '20px' }}>
          Login
        </Typography>

        {error && <Typography color="error" sx={{ marginBottom: '10px' }}>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            fullWidth
            sx={{ marginBottom: '25px' }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#007BFF', color: 'white', '&:hover': { backgroundColor: '#0056b3' } }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
