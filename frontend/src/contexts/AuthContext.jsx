import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from sessionStorage on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedEmail = sessionStorage.getItem('email');
    const storedUsername = sessionStorage.getItem('username');
    
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setUser({ email: storedEmail, username: storedUsername });
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    sessionStorage.setItem('token', authToken);
    sessionStorage.setItem('email', userData.email);
    if (userData.username) {
      sessionStorage.setItem('username', userData.username);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

