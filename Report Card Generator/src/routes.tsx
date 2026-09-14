import { createBrowserRouter, Navigate } from 'react-router';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import VerificationPage from './pages/VerificationPage';

// Admin pages
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminStudentsPage from './pages/admin/StudentsPage';
import AdminTeachersPage from './pages/admin/TeachersPage';
import AdminDepartmentsPage from './pages/admin/DepartmentsPage';
import AdminAcademicYearsPage from './pages/admin/AcademicYearsPage';
import AdminClassesPage from './pages/admin/ClassesPage';
import AdminSemestersPage from './pages/admin/SemestersPage';
import AdminSubjectsPage from './pages/admin/SubjectsPage';
import AdminMarksPage from './pages/admin/MarksPage';
import AdminResultsPage from './pages/admin/ResultsPage';
import AdminAnalyticsPage from './pages/admin/AnalyticsPage';
import AdminReportsPage from './pages/admin/ReportsPage';
import AdminUsersPage from './pages/admin/UsersPage';
import AdminAuditLogsPage from './pages/admin/AuditLogsPage';
import AdminSettingsPage from './pages/admin/SettingsPage';

// Teacher pages
import TeacherDashboardPage from './pages/teacher/DashboardPage';
import TeacherSubjectsPage from './pages/teacher/SubjectsPage';
import TeacherClassesPage from './pages/teacher/ClassesPage';
import TeacherMarksPage from './pages/teacher/MarksPage';
import TeacherResultsPage from './pages/teacher/ResultsPage';
import TeacherAnalyticsPage from './pages/teacher/AnalyticsPage';
import TeacherReportsPage from './pages/teacher/ReportsPage';
import TeacherProfilePage from './pages/teacher/ProfilePage';

// Student pages
import StudentDashboardPage from './pages/student/DashboardPage';
import StudentResultsPage from './pages/student/ResultsPage';
import StudentHistoryPage from './pages/student/HistoryPage';
import StudentPerformancePage from './pages/student/PerformancePage';
import StudentReportsPage from './pages/student/ReportsPage';
import StudentProfilePage from './pages/student/ProfilePage';
import StudentSettingsPage from './pages/student/SettingsPage';

export const router = createBrowserRouter([
  // Public auth routes
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', Component: LoginPage },
      { path: '/forgot-password', Component: ForgotPasswordPage },
    ],
  },
  // Public verification
  { path: '/verify', Component: VerificationPage },
  // Protected app shell
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      // Admin
      { path: '/admin/dashboard', Component: AdminDashboardPage },
      { path: '/admin/students', Component: AdminStudentsPage },
      { path: '/admin/teachers', Component: AdminTeachersPage },
      { path: '/admin/departments', Component: AdminDepartmentsPage },
      { path: '/admin/academic-years', Component: AdminAcademicYearsPage },
      { path: '/admin/classes', Component: AdminClassesPage },
      { path: '/admin/semesters', Component: AdminSemestersPage },
      { path: '/admin/subjects', Component: AdminSubjectsPage },
      { path: '/admin/marks', Component: AdminMarksPage },
      { path: '/admin/results', Component: AdminResultsPage },
      { path: '/admin/analytics', Component: AdminAnalyticsPage },
      { path: '/admin/reports', Component: AdminReportsPage },
      { path: '/admin/users', Component: AdminUsersPage },
      { path: '/admin/audit-logs', Component: AdminAuditLogsPage },
      { path: '/admin/settings', Component: AdminSettingsPage },
      // Teacher
      { path: '/teacher/dashboard', Component: TeacherDashboardPage },
      { path: '/teacher/subjects', Component: TeacherSubjectsPage },
      { path: '/teacher/classes', Component: TeacherClassesPage },
      { path: '/teacher/marks', Component: TeacherMarksPage },
      { path: '/teacher/results', Component: TeacherResultsPage },
      { path: '/teacher/analytics', Component: TeacherAnalyticsPage },
      { path: '/teacher/reports', Component: TeacherReportsPage },
      { path: '/teacher/profile', Component: TeacherProfilePage },
      // Student
      { path: '/student/dashboard', Component: StudentDashboardPage },
      { path: '/student/results', Component: StudentResultsPage },
      { path: '/student/history', Component: StudentHistoryPage },
      { path: '/student/performance', Component: StudentPerformancePage },
      { path: '/student/reports', Component: StudentReportsPage },
      { path: '/student/profile', Component: StudentProfilePage },
      { path: '/student/settings', Component: StudentSettingsPage },
    ],
  },
  { path: '*', Component: NotFoundPage },
]);
