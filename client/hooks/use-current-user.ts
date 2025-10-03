'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface CurrentUser {
  id: string;
  email: string;
}

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get('/api/users/currentuser');
        setCurrentUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user', err);
        setCurrentUser(null);
      }
    }

    fetchUser();
  }, []);

  return currentUser;
}