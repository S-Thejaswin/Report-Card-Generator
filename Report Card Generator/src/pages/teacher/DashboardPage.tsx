import { BookOpen, Users, ClipboardList, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/ui/StatCard';
import { useCurrentTeacher } from '../../context/AuthContext';
import { subjects, students, results, auditLogs, getDepartmentById } from '../../data/mockData';

const classPerf = [
  { student: 'Arjun K.', gpa: 9.11 },
  { student: 'Priya S.', gpa: 6.89 },
  { student: 'Rohit N.', gpa: 4.06 },
  { student: 'Meera J.', gpa: 8.44 },
  { student: 'Deepika R.', gpa: 9.72 },
];

export default function TeacherDashboardPage() {
  const teacher = useCurrentTeacher();
  const assignedSubjects = subjects.filter((s) => teacher?.assignedSubjectIds.includes(s.id));
  const dept = teacher ? getDepartmentById(teacher.departmentId) : null;
  const myStudents = students.filter((s) => s.departmentId === teacher?.departmentId && s.status === 'ACTIVE');
  const myResults = results.filter((r) => myStudents.some((s) => s.id === r.studentId) && r.semesterId === 'sem3');
  const passCount = myResults.filter((r) => r.status === 'PASS').length;
  const passRate = myResults.length > 0 ? ((passCount / myResults.length) * 100).toFixed(1) : '–';
  const avgGPA = myResults.length > 0 ? (myResults.reduce((sum, r) => sum + r.gpa, 0) / myResults.length).toFixed(2) : '–';

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Teacher Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Welcome back, {teacher?.name} — {dept?.name}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Assigned Subjects" value={assignedSubjects.length} icon={<BookOpen className="w-5 h-5 text-indigo-600" />} iconBg="bg-indigo-50" />
        <StatCard label="Students" value={myStudents.length} icon={<Users className="w-5 h-5 text-sky-600" />} iconBg="bg-sky-50" sub="in my department" />
        <StatCard label="Class Avg GPA" value={avgGPA} icon={<TrendingUp className="w-5 h-5 text-violet-600" />} iconBg="bg-violet-50" />
        <StatCard label="Pass Rate" value={`${passRate}%`} icon={<CheckCircle2 className="w-5 h-5 text-green-600" />} iconBg="bg-green-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Class performance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Student GPA — Semester III</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={classPerf} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="student" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="gpa" fill="#6366F1" radius={[4, 4, 0, 0]} name="GPA" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Assigned subjects */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">My Assigned Subjects</h3>
          {assignedSubjects.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">No subjects assigned yet.</p>
          ) : (
            <div className="space-y-2">
              {assignedSubjects.map((sub) => (
                <div key={sub.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-500 text-slate-900">{sub.subjectName}</p>
                    <p className="text-xs text-slate-400">{sub.subjectCode} • {sub.credits} credits • {sub.subjectType}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Enter Marks', to: '/teacher/marks', color: 'bg-indigo-600 text-white hover:bg-indigo-700' },
            { label: 'View Results', to: '/teacher/results', color: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50' },
            { label: 'View Analytics', to: '/teacher/analytics', color: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50' },
            { label: 'Generate Reports', to: '/teacher/reports', color: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50' },
          ].map((a) => (
            <a key={a.label} href={a.to} className={`px-4 py-2 rounded-xl text-sm font-500 transition-colors ${a.color}`}>{a.label}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
