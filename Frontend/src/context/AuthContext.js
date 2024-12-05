import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

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
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [timer, setTimer] = useState(null);
  const sessionTimeout = 15 * 60 * 1000;

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    clearTimeout(timer);
  };

  const resetSessionTimer = () => {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(logout, sessionTimeout));
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/farmer/login', credentials); // Updated URL
      if (data.success) {
        const newUser = { isAuthenticated: true, ...data.farmer };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resetSessionTimer();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };
  
  useEffect(() => {
    const activityEvents = ['mousemove', 'keydown', 'click'];

    const handleUserActivity = () => resetSessionTimer();

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
    if (user) resetSessionTimer();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
