"use client"

// Simple authentication utility for demonstration purposes
// In a real app, you would use a proper auth provider like NextAuth.js

export type User = {
  email: string;
  name: string;
}

const STORAGE_KEY = 'ews_auth';

export const login = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    // Hardcoded credentials for demo
    if (email === 'user@yesbnak.in' && password === 'password') {
      const user = { email, name: 'Yes Bank User' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      resolve(user);
    } else {
      resolve(null);
    }
  });
};

export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = '/login';
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem(STORAGE_KEY);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as User;
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return getUser() !== null;
}; 