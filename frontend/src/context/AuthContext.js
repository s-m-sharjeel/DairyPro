import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage for user data on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [timer, setTimer] = useState(null); // Timer for session timeout

  const sessionTimeout = 15 * 60 * 1000; // 15 minutes of inactivity

  // Function to logout user
  const logout = () => {
    setUser(null); // Set user to null on logout
    localStorage.removeItem('user'); // Remove user from localStorage
    clearTimeout(timer); // Clear the session timeout timer
  };

  // Function to reset session timer
  const resetSessionTimer = () => {
    if (timer) clearTimeout(timer); // Clear existing timer
    setTimer(setTimeout(logout, sessionTimeout)); // Set new timer
  };

  const login = async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { isAuthenticated: true, ...credentials };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser)); // Persist user in localStorage
        resetSessionTimer(); // Start session timeout on login
        resolve();
      }, 1000); // Simulate async login
    });
  };

  const logoutOnInactivity = () => {
    if (user) {
      resetSessionTimer(); // Reset session timer if user is active
    }
  };

  useEffect(() => {
    // Detect user activity to reset the session timer
    const activityEvents = ['mousemove', 'keydown', 'click'];

    const handleUserActivity = () => {
      logoutOnInactivity();
    };

    activityEvents.forEach((event) =>
      window.addEventListener(event, handleUserActivity)
    );

    return () => {
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleUserActivity)
      );
    };
  }, [user]);

  useEffect(() => {
    if (user) {
      resetSessionTimer(); // Reset the session timer when the user state is initialized
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
