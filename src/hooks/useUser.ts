'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import { type UserProfile } from '@/lib/types';
import { UserContext } from '@/context/UserContext';

const USER_PROFILE_STORAGE_KEY = 'careconnectUserProfile';

const defaultUser: UserProfile = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '123-456-7890',
  address: '123 Health St, Wellness City',
  password: 'password123',
};

export function useUserHook() {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
      if (storedUser) {
        // Ensure all fields are present, falling back to defaults if not
        const parsedUser = JSON.parse(storedUser);
        setUser({ ...defaultUser, ...parsedUser });
      } else {
        setUser(defaultUser);
        localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(defaultUser));
      }
    } catch (error) {
      console.error('Failed to parse user profile from localStorage', error);
      setUser(defaultUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback((updatedProfile: Partial<UserProfile>) => {
    try {
      const newProfile = { ...user, ...updatedProfile };
      setUser(newProfile);
      localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(newProfile));
    } catch (error) {
      console.error('Failed to save user profile to localStorage', error);
    }
  }, [user]);

  return { user, updateUser, isLoading };
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
