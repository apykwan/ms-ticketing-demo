'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface CurrentUser {
  email: string;
  id: string;
}

interface CurrUserContextType {
  currUser: CurrentUser | null;
  setCurrUser: (user: CurrentUser | null) => void;
  refetchUser: () => Promise<void>;
}

const CurrUserContext = createContext<CurrUserContextType | null>(null);

export default function CurrUserProvider({ children }: { children: React.ReactNode }) {
  const [currUser, setCurrUser] = useState<CurrentUser | null>(null);

  const refetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/users/currentuser', {
        credentials: 'include',
      });
      if (!res.ok) {
        setCurrUser(null);
        return;
      }
      const data = await res.json();
      setCurrUser(data.currentUser || null);
    } catch (err) {
      console.error('Failed to fetch current user:', err);
      setCurrUser(null);
    }
  }, []);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  return (
    <CurrUserContext.Provider value={{ currUser, setCurrUser, refetchUser }}>
      {children}
    </CurrUserContext.Provider>
  );
}

export const useCurrUser = () => {
  const context = useContext(CurrUserContext);
  if (!context) {
    throw new Error('useCurrUser must be used within a CurrUserProvider');
  }
  return context;
};