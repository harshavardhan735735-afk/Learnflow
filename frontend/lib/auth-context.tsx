'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { loginUser, signupUser, getUserProfile } from '@/lib/api';
import type { User, AuthResponse, ExamType } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, examType: ExamType) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('learnflow_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { token: string; studentId: number };
        setToken(parsed.token);
        getUserProfile(parsed.studentId)
          .then(setUser)
          .catch(() => {
            localStorage.removeItem('learnflow_auth');
          })
          .finally(() => setLoading(false));
      } catch {
        localStorage.removeItem('learnflow_auth');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleAuthResponse = useCallback((res: AuthResponse) => {
    const authData = { token: res.access_token, studentId: res.student_id };
    localStorage.setItem('learnflow_auth', JSON.stringify(authData));
    setToken(res.access_token);
    // Fetch full profile
    return getUserProfile(res.student_id).then(setUser);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginUser({ email, password });
    await handleAuthResponse(res);
  }, [handleAuthResponse]);

  const signup = useCallback(async (name: string, email: string, password: string, examType: ExamType) => {
    const res = await signupUser({ name, email, password, exam_type: examType });
    await handleAuthResponse(res);
  }, [handleAuthResponse]);

  const logout = useCallback(() => {
    localStorage.removeItem('learnflow_auth');
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
