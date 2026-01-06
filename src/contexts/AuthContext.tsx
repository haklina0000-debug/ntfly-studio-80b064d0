import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'lrsoufyane2007@gmail.com': {
    password: 'admin123',
    user: {
      id: 'admin-1',
      email: 'lrsoufyane2007@gmail.com',
      name: 'Soufiane Admin',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
    },
  },
  'user@ntfly.com': {
    password: 'user123',
    user: {
      id: 'user-1',
      email: 'user@ntfly.com',
      name: 'مستخدم تجريبي',
      role: 'user',
      createdAt: new Date('2024-06-01'),
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('ntfly-user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        parsed.createdAt = new Date(parsed.createdAt);
        setUser(parsed);
      } catch {
        localStorage.removeItem('ntfly-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      localStorage.setItem('ntfly-user', JSON.stringify(demoUser.user));
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate Google login
    const googleUser: User = {
      id: 'google-' + Date.now(),
      email: 'google.user@gmail.com',
      name: 'مستخدم Google',
      role: 'user',
      createdAt: new Date(),
    };
    
    setUser(googleUser);
    localStorage.setItem('ntfly-user', JSON.stringify(googleUser));
    setIsLoading(false);
  };

  const loginWithGithub = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate GitHub login
    const githubUser: User = {
      id: 'github-' + Date.now(),
      email: 'github.user@github.com',
      name: 'مستخدم GitHub',
      role: 'user',
      createdAt: new Date(),
    };
    
    setUser(githubUser);
    localStorage.setItem('ntfly-user', JSON.stringify(githubUser));
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (DEMO_USERS[email.toLowerCase()]) {
      setIsLoading(false);
      throw new Error('البريد الإلكتروني مستخدم مسبقاً');
    }
    
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
      role: 'user',
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('ntfly-user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('ntfly-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        loginWithGoogle,
        loginWithGithub,
        register,
        logout,
      }}
    >
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
