import { useState } from 'react';
import { Link } from 'react-router';
import { GraduationCap, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-700 text-slate-900">SAPRS</h1>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
              <h2 className="text-lg font-700 text-slate-900">Check your email</h2>
              <p className="text-sm text-slate-500">
                If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm font-500 text-indigo-600 hover:text-indigo-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-700 text-slate-900">Reset Password</h2>
                <p className="text-sm text-slate-500 mt-1">Enter your email and we will send you a reset link.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-600 text-slate-600 mb-1.5">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@college.edu"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-600 rounded-lg transition-colors"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Send Reset Link
                </button>
              </form>

              <div className="mt-4 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm font-500 text-indigo-600 hover:text-indigo-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
