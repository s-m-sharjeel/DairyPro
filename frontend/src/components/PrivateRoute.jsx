import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the auth context

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth(); // Get user authentication state

  // Check if the user is authenticated
  return user.isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
