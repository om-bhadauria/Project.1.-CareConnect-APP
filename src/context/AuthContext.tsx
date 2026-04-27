'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserProfile } from '@/lib/types';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: Partial<UserProfile>) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'careconnect_auth';
const USER_PROFILE_STORAGE_KEY = 'careconnectUserProfile';


export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem(AUTH_KEY);
      if (storedAuth) {
        setIsAuthenticated(JSON.parse(storedAuth));
      }
    } catch (e) {
      console.error("Failed to parse auth status from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (user: Partial<UserProfile>) => {
    setIsAuthenticated(true);
    localStorage.setItem(AUTH_KEY, JSON.stringify(true));
    localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
    // Do not remove user profile on logout so login details persist.
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
