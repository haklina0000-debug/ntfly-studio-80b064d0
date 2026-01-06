import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  sanitizeInput, 
  isValidEmail, 
  isValidPassword, 
  containsMaliciousPatterns,
  checkRateLimit,
  resetRateLimit 
} from '@/lib/security';
import { recordLogin } from '@/lib/loginTracker';

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

// Admin account - protected and cannot be modified
const ADMIN_EMAIL = 'lrsoufyane2007@gmail.com';

// Demo users for testing (admin credentials hidden from UI)
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  [ADMIN_EMAIL]: {
    password: 'admin123',
    user: {
      id: 'admin-1',
      email: ADMIN_EMAIL,
      name: 'Soufiane Admin',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
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
    // Security: Sanitize inputs
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    
    // Security: Check for malicious patterns
    if (containsMaliciousPatterns(email) || containsMaliciousPatterns(password)) {
      throw new Error('تم اكتشاف محتوى غير آمن');
    }
    
    // Security: Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      throw new Error('صيغة البريد الإلكتروني غير صحيحة');
    }
    
    // Security: Rate limiting
    const rateLimitKey = `login_${sanitizedEmail}`;
    const rateCheck = checkRateLimit(rateLimitKey);
    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil((rateCheck.blockedUntil! - Date.now()) / 60000);
      throw new Error(`محاولات كثيرة. يرجى الانتظار ${waitMinutes} دقيقة`);
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser = DEMO_USERS[sanitizedEmail];
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      localStorage.setItem('ntfly-user', JSON.stringify(demoUser.user));
      
      // Track login
      recordLogin(demoUser.user.id, demoUser.user.email, demoUser.user.role === 'admin' ? 'admin' : 'dashboard');
      
      // Reset rate limit on success
      resetRateLimit(rateLimitKey);
      
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
    // Security: Sanitize inputs
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedName = sanitizeInput(name);
    
    // Security: Check for malicious patterns
    if (containsMaliciousPatterns(email) || containsMaliciousPatterns(password) || containsMaliciousPatterns(name)) {
      throw new Error('تم اكتشاف محتوى غير آمن');
    }
    
    // Security: Validate email
    if (!isValidEmail(sanitizedEmail)) {
      throw new Error('صيغة البريد الإلكتروني غير صحيحة');
    }
    
    // Security: Validate password
    const passwordCheck = isValidPassword(password);
    if (!passwordCheck.valid) {
      throw new Error(passwordCheck.message || 'كلمة المرور غير صالحة');
    }
    
    // Security: Rate limiting
    const rateLimitKey = `register_${sanitizedEmail}`;
    const rateCheck = checkRateLimit(rateLimitKey);
    if (!rateCheck.allowed) {
      throw new Error('محاولات كثيرة. يرجى المحاولة لاحقاً');
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (DEMO_USERS[sanitizedEmail]) {
      setIsLoading(false);
      throw new Error('البريد الإلكتروني مستخدم مسبقاً');
    }
    
    const newUser: User = {
      id: 'user-' + Date.now(),
      email: sanitizedEmail,
      name: sanitizedName,
      role: 'user',
      createdAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('ntfly-user', JSON.stringify(newUser));
    
    // Track login
    recordLogin(newUser.id, newUser.email, 'dashboard');
    
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
