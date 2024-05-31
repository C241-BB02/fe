'use client'

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface JwtPayload {
  exp: number,
  iat: number,
  jti: string,
  role: string,
  token_type: string,
  user_id: number
}

interface UserData {
  id: number;
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

// TODO: use enum for user role
export enum UserRole {
  Admin = "ADMIN",
  Seller = "SELLER",
  Customer = "CUSTOMER",
  Guest = "GUEST",
}

interface AuthContextType {
  user: UserData;
  login: (id: number, username: string, role: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (id: number, username: string, role: string, accessToken: string, refreshToken: string) => {
    const user = { id, username, role, accessToken, refreshToken };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user: user || { id: -1, username: '', role: 'GUEST', accessToken: '', refreshToken: '' }, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
