import { Outlet, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    const dest =
      user?.role === 'ADMIN' ? '/admin/dashboard' :
      user?.role === 'TEACHER' ? '/teacher/dashboard' :
      '/student/dashboard';
    return <Navigate to={dest} replace />;
  }

  return <Outlet />;
}
