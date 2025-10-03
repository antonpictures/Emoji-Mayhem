import { useState, useCallback, useEffect } from 'react';
import { User } from '../types';

const MOCK_USER: User = {
  id: '12345',
  name: 'PlayerOne',
  avatar: '🤠',
};
const STORAGE_KEY = 'emojiMayhem_user';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for a saved user session on initial load
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = useCallback(() => {
    // In a real app, this would involve an OAuth flow.
    // Here, we'll just set a mock user.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USER));
    setCurrentUser(MOCK_USER);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentUser(null);
  }, []);

  return {
    currentUser,
    login,
    logout,
  };
};
