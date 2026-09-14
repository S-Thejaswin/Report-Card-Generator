import { useNavigate } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <p className="text-8xl font-700 text-slate-200 select-none">404</p>
      <h1 className="text-2xl font-700 text-slate-900 mt-4">Page not found</h1>
      <p className="text-slate-500 text-sm mt-2 max-w-sm">The page you are looking for does not exist or has been moved.</p>
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-500 text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-600 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
      </div>
    </div>
  );
}
