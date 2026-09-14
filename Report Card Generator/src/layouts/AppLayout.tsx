import { useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
