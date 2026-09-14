import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type Role, students, teachers } from '../data/mockData';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  studentId?: string;
  teacherId?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_ACCOUNTS: Record<string, { password: string; user: AuthUser }> = {
  'admin@college.edu': {
    password: 'admin123',
    user: { id: 'u1', name: 'Admin User', email: 'admin@college.edu', role: 'ADMIN' },
  },
  'teacher@college.edu': {
    password: 'teacher123',
    user: { id: 'u2', name: 'Dr. Ramesh Kumar', email: 'teacher@college.edu', role: 'TEACHER', teacherId: 't1' },
  },
  'student@college.edu': {
    password: 'student123',
    user: { id: 'u3', name: 'Arjun Krishnamurthy', email: 'student@college.edu', role: 'STUDENT', studentId: 's1' },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = sessionStorage.getItem('saprs_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    const account = DEMO_ACCOUNTS[email.toLowerCase().trim()];
    if (!account) return { success: false, message: 'No account found with this email.' };
    if (account.password !== password) return { success: false, message: 'Incorrect password.' };
    setUser(account.user);
    sessionStorage.setItem('saprs_user', JSON.stringify(account.user));
    return { success: true, message: 'Login successful.' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('saprs_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export function useCurrentStudent() {
  const { user } = useAuth();
  if (!user?.studentId) return null;
  return students.find((s) => s.id === user.studentId) ?? null;
}

export function useCurrentTeacher() {
  const { user } = useAuth();
  if (!user?.teacherId) return null;
  return teachers.find((t) => t.id === user.teacherId) ?? null;
}
