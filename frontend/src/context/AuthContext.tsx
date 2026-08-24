'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api, { backendEnabled, endpoints } from '@/lib/api';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) setToken(stored);
  }, []);

  const login = async (email: string, password: string) => {
    if (!backendEnabled) {
      throw new Error('Admin backend is disabled. Enable it in the environment to use the dashboard.');
    }

    const res = await api.post(endpoints.auth.login, { email, password });
    const { token: t } = res.data;
    localStorage.setItem('token', t);
    setToken(t);
    router.push('/admin/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
