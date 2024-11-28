import React, { createContext, useContext, useState } from 'react';

// Creating a Context for Authentication
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,  // assuming user is not logged in by default
    username: '',
  });

  const login = (username, password) => {
    if (username === 'testuser@dairy.com' && password === 'pass') {
      setUser({ isAuthenticated: true, username });
      return { success: true };
    } else {
      console.log('Invalid credentials');
      return { success: false };
    }
  };

  const logout = () => {
    setUser({ isAuthenticated: false, username: '' });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
