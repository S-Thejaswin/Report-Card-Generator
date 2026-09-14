import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GraduationCap, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      const role = email.toLowerCase().includes('admin') ? 'ADMIN' :
                   email.toLowerCase().includes('teacher') ? 'TEACHER' : 'STUDENT';
      const dest = role === 'ADMIN' ? '/admin/dashboard' :
                   role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard';
      navigate(dest, { replace: true });
    } else {
      setError(result.message);
    }
  }

  function fillDemo(type: 'admin' | 'teacher' | 'student') {
    const map = {
      admin: { e: 'admin@college.edu', p: 'admin123' },
      teacher: { e: 'teacher@college.edu', p: 'teacher123' },
      student: { e: 'student@college.edu', p: 'student123' },
    };
    setEmail(map[type].e);
    setPassword(map[type].p);
    setError('');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-indigo-700 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white transform -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-700 text-lg">SAPRS</span>
          </div>
        </div>
        <div className="relative space-y-6">
          <div>
            <h1 className="text-4xl font-800 text-white leading-tight">
              Smart Academic<br />Performance &<br />Report System
            </h1>
            <p className="mt-4 text-indigo-200 text-base leading-relaxed">
              A unified platform for managing student performance, academic records, and professional report generation with QR verification.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[['1,200+', 'Students'], ['45+', 'Faculty'], ['98%', 'Accuracy']].map(([val, label]) => (
              <div key={label} className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-700 text-white">{val}</p>
                <p className="text-xs text-indigo-200 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-indigo-300 text-xs">
          © 2025 Smart Academic Performance & Report Management System
        </p>
      </div>

      {/* Right panel – login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-7">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-slate-900 font-700 text-lg">SAPRS</span>
          </div>

          <div>
            <h2 className="text-2xl font-700 text-slate-900">Welcome back</h2>
            <p className="mt-1 text-sm text-slate-500">Sign in to access your academic dashboard</p>
          </div>

          {/* Demo accounts */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-600 text-amber-800 mb-2">Demo Accounts — click to fill</p>
            <div className="flex gap-2 flex-wrap">
              {(['admin', 'teacher', 'student'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => fillDemo(role)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-900 hover:bg-amber-100 transition-colors font-500 capitalize"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-500 text-slate-700 mb-1.5">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-500 text-slate-700 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                  autoComplete="current-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <a href="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-700 font-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 text-white text-sm font-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Access is managed by your institution administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
