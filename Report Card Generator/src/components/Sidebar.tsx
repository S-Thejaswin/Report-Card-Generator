import { NavLink, useNavigate } from 'react-router';
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Building2,
  Calendar, Layers, BookMarked, ClipboardList, BarChart3,
  FileText, Settings, LogOut, UserCheck, History, TrendingUp,
  ChevronRight, Shield, ScrollText, Award, X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

function adminNav(): NavGroup[] {
  return [
    {
      title: 'OVERVIEW',
      items: [{ to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { to: '/admin/students', label: 'Students', icon: GraduationCap },
        { to: '/admin/teachers', label: 'Teachers', icon: UserCheck },
        { to: '/admin/departments', label: 'Departments', icon: Building2 },
        { to: '/admin/academic-years', label: 'Academic Years', icon: Calendar },
        { to: '/admin/classes', label: 'Classes', icon: Layers },
        { to: '/admin/semesters', label: 'Semesters', icon: BookMarked },
        { to: '/admin/subjects', label: 'Subjects', icon: BookOpen },
      ],
    },
    {
      title: 'ACADEMICS',
      items: [
        { to: '/admin/marks', label: 'Marks', icon: ClipboardList },
        { to: '/admin/results', label: 'Results', icon: Award },
        { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
        { to: '/admin/reports', label: 'Reports', icon: FileText },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { to: '/admin/users', label: 'Users', icon: Users },
        { to: '/admin/audit-logs', label: 'Audit Logs', icon: ScrollText },
        { to: '/admin/settings', label: 'Settings', icon: Settings },
      ],
    },
  ];
}

function teacherNav(): NavGroup[] {
  return [
    {
      title: 'OVERVIEW',
      items: [{ to: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
    },
    {
      title: 'MY ACADEMIC',
      items: [
        { to: '/teacher/subjects', label: 'My Subjects', icon: BookOpen },
        { to: '/teacher/classes', label: 'My Classes', icon: Layers },
      ],
    },
    {
      title: 'ACADEMICS',
      items: [
        { to: '/teacher/marks', label: 'Marks', icon: ClipboardList },
        { to: '/teacher/results', label: 'Results', icon: Award },
        { to: '/teacher/analytics', label: 'Analytics', icon: BarChart3 },
        { to: '/teacher/reports', label: 'Reports', icon: FileText },
      ],
    },
    {
      title: 'PROFILE',
      items: [{ to: '/teacher/profile', label: 'My Profile', icon: Shield }],
    },
  ];
}

function studentNav(): NavGroup[] {
  return [
    {
      title: 'OVERVIEW',
      items: [{ to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
    },
    {
      title: 'ACADEMICS',
      items: [
        { to: '/student/profile', label: 'Profile', icon: Users },
        { to: '/student/results', label: 'Current Result', icon: Award },
        { to: '/student/history', label: 'Result History', icon: History },
        { to: '/student/performance', label: 'Performance', icon: TrendingUp },
      ],
    },
    {
      title: 'DOCUMENTS',
      items: [
        { to: '/student/reports', label: 'Reports', icon: FileText },
        { to: '/student/settings', label: 'Settings', icon: Settings },
      ],
    },
  ];
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navGroups =
    user?.role === 'ADMIN' ? adminNav() :
    user?.role === 'TEACHER' ? teacherNav() :
    studentNav();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const roleColor =
    user?.role === 'ADMIN' ? 'bg-indigo-600' :
    user?.role === 'TEACHER' ? 'bg-emerald-600' :
    'bg-sky-600';

  const roleLabel =
    user?.role === 'ADMIN' ? 'Administrator' :
    user?.role === 'TEACHER' ? 'Faculty' :
    'Student';

  const content = (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-5 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-700 text-slate-900 leading-none">SAPRS</p>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">Academic System</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* User info */}
      <div className="px-4 py-3 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${roleColor} flex items-center justify-center flex-shrink-0`}>
            <span className="text-sm font-600 text-white">
              {user?.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-600 text-slate-900 truncate">{user?.name}</p>
            <p className="text-xs text-slate-400">{roleLabel}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="text-[10px] font-700 text-slate-400 px-2 mb-1.5 tracking-wider">{group.title}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        <span className="flex-1">{item.label}</span>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-100 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-screen sticky top-0">
        {content}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
          <div className="relative z-50 flex flex-col h-full shadow-xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
