import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TopNavProps {
  onMenuClick: () => void;
  pageTitle?: string;
}

export default function TopNav({ onMenuClick, pageTitle }: TopNavProps) {
  const { user } = useAuth();

  const roleColor =
    user?.role === 'ADMIN' ? 'bg-indigo-600' :
    user?.role === 'TEACHER' ? 'bg-emerald-600' :
    'bg-sky-600';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-4 sticky top-0 z-30">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {pageTitle && (
        <h1 className="text-base font-600 text-slate-900 hidden sm:block">{pageTitle}</h1>
      )}

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          <Bell className="w-4.5 h-4.5" />
        </button>
        <div className={`w-8 h-8 rounded-full ${roleColor} flex items-center justify-center`}>
          <span className="text-xs font-600 text-white">
            {user?.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </span>
        </div>
      </div>
    </header>
  );
}
