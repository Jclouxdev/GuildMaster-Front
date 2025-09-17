'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, name: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const demoUser = localStorage.getItem('demo_user');
    const demoUserName = localStorage.getItem('demo_user_name');
    const demoUserRole = localStorage.getItem('demo_user_role');
    
    if (demoUser && demoUserName && demoUserRole) {
      setUser({
        email: demoUser,
        name: demoUserName,
        role: demoUserRole
      });
      setIsLoggedIn(true);
    }
  }, []);

  const login = (email: string, name: string, role: string) => {
    localStorage.setItem('demo_user', email);
    localStorage.setItem('demo_user_name', name);
    localStorage.setItem('demo_user_role', role);
    
    setUser({ email, name, role });
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('demo_user');
    localStorage.removeItem('demo_user_name');
    localStorage.removeItem('demo_user_role');
    
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
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
