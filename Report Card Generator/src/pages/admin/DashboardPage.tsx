import { GraduationCap, Users, BookOpen, Building2, TrendingUp, Award, AlertTriangle, CheckCircle, UserCheck, Calendar } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend,
} from 'recharts';
import StatCard from '../../components/ui/StatCard';
import Badge, { statusVariant } from '../../components/ui/Badge';
import { dashboardStats, departments, auditLogs, results, students } from '../../data/mockData';

const deptData = [
  { name: 'CSE', students: 420 },
  { name: 'IT', students: 280 },
  { name: 'ECE', students: 310 },
  { name: 'MECH', students: 190 },
];

const passFailData = [
  { name: 'Pass', value: 76.5, color: '#22C55E' },
  { name: 'Arrear', value: 18.5, color: '#F97316' },
  { name: 'Fail', value: 5.0, color: '#EF4444' },
];

const gpaData = [
  { semester: 'Sem I', avg: 7.2 },
  { semester: 'Sem II', avg: 7.6 },
  { semester: 'Sem III', avg: 7.9 },
  { semester: 'Sem IV', avg: 8.1 },
];

const gradeData = [
  { grade: 'O', count: 48 },
  { grade: 'A+', count: 87 },
  { grade: 'A', count: 124 },
  { grade: 'B+', count: 98 },
  { grade: 'B', count: 62 },
  { grade: 'C', count: 28 },
  { grade: 'F', count: 13 },
];

const RADIAN = Math.PI / 180;
function CustomLabel({ cx, cy, midAngle, outerRadius, name, value }: any) {
  const x = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
  const y = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#475569" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11}>
      {`${name} ${value}%`}
    </text>
  );
}

export default function AdminDashboardPage() {
  const recentActivity = auditLogs.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Academic year 2024–25 overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          label="Total Students"
          value={dashboardStats.totalStudents}
          icon={<GraduationCap className="w-5 h-5 text-indigo-600" />}
          iconBg="bg-indigo-50"
          sub={`${dashboardStats.activeStudents} active`}
        />
        <StatCard
          label="Total Faculty"
          value={dashboardStats.totalTeachers}
          icon={<UserCheck className="w-5 h-5 text-emerald-600" />}
          iconBg="bg-emerald-50"
        />
        <StatCard
          label="Departments"
          value={dashboardStats.departments}
          icon={<Building2 className="w-5 h-5 text-sky-600" />}
          iconBg="bg-sky-50"
        />
        <StatCard
          label="Average GPA"
          value={dashboardStats.averageGPA}
          icon={<TrendingUp className="w-5 h-5 text-violet-600" />}
          iconBg="bg-violet-50"
          trend={{ value: '+0.3 vs last sem', positive: true }}
        />
        <StatCard
          label="Pass Rate"
          value={`${dashboardStats.passRate}%`}
          icon={<CheckCircle className="w-5 h-5 text-green-600" />}
          iconBg="bg-green-50"
          sub={`${dashboardStats.arrearCount} active arrears`}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Department bar chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Students per Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }}
                cursor={{ fill: '#F8FAFC' }}
              />
              <Bar dataKey="students" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pass/Fail pie */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Result Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={passFailData}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                labelLine={false}
                label={CustomLabel}
              >
                {passFailData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: unknown) => `${v}%`} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GPA trend + Grade dist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">GPA Trend (Semester Average)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={gpaData}>
              <defs>
                <linearGradient id="gpaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="semester" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[6, 10]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Area type="monotone" dataKey="avg" stroke="#6366F1" strokeWidth={2} fill="url(#gpaGrad)" name="Avg GPA" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={gradeData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="grade" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="count" fill="#818CF8" radius={[4, 4, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 mb-4">Recent Activity</h3>
        <div className="divide-y divide-slate-100">
          {recentActivity.map((log) => (
            <div key={log.id} className="flex items-start gap-3 py-3">
              <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-600 text-indigo-600">
                  {log.userName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-800">
                  <span className="font-500">{log.userName}</span>{' '}
                  <span className="text-slate-500">{log.newValue ?? log.action}</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {new Date(log.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
