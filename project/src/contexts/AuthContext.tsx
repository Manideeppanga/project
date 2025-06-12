import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'donor' | 'recipient') => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Bella Vista Restaurant',
    email: 'contact@bellavista.com',
    password: 'demo123',
    type: 'donor',
    organization: 'Bella Vista Restaurant',
    location: {
      address: '123 Main St, Downtown',
      lat: 40.7128,
      lng: -74.0060
    },
    phone: '+1 (555) 123-4567',
    verified: true,
    rating: 4.8,
    totalDonations: 156
  },
  {
    id: '2',
    name: 'Sunshine Orphanage',
    email: 'admin@sunshineorphanage.org',
    password: 'demo123',
    type: 'recipient',
    organization: 'Sunshine Orphanage',
    location: {
      address: '456 Hope Street, Eastside',
      lat: 40.7589,
      lng: -73.9851
    },
    phone: '+1 (555) 987-6543',
    verified: true,
    rating: 4.9,
    totalReceived: 89
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, userType: 'donor' | 'recipient') => {
    setIsLoading(true);
    try {
      // Mock authentication
      const foundUser = mockUsers.find(u => u.email === email && u.password === password && u.type === userType);
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // Mock registration
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || '',
        email: userData.email || '',
        type: userData.type || 'donor',
        organization: userData.organization || '',
        location: userData.location || {
          address: '',
          lat: 0,
          lng: 0
        },
        phone: userData.phone || '',
        verified: false,
        rating: 0,
        totalDonations: 0,
        totalReceived: 0
      };
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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