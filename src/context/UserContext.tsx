'use client';

import React, { createContext, ReactNode } from 'react';
import { useUserHook } from '@/hooks/useUser';
import type { UserProfile } from '@/lib/types';

interface UserContextType {
  user: UserProfile;
  updateUser: (updatedProfile: Partial<UserProfile>) => void;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const userState = useUserHook();

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
}
