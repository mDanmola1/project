import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const login = () => {
    setIsAuthenticated(true);
    navigate('/tasks');
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const registerMessage = () => {
    setMessage('Account created, please log in.');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, message, registerMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
