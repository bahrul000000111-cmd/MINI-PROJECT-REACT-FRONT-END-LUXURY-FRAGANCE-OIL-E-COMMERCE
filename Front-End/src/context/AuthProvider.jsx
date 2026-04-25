import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './auth';
import api from '../services/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { user: userData, token } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, message: response.data.message };
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data.message || 'Login failed',
          errors: error.response.data.errors || null,
        };
      }
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation,
      });
      const { user: userData, token } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, message: response.data.message };
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          message: error.response.data.message || 'Registration failed',
          errors: error.response.data.errors || null,
        };
      }
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch {
      // Ignore logout API errors
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

