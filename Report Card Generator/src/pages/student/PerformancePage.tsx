import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
} from 'recharts';
import { useCurrentStudent } from '../../context/AuthContext';
import { getResultsByStudentId } from '../../data/mockData';
import EmptyState from '../../components/ui/EmptyState';

export default function StudentPerformancePage() {
  const student = useCurrentStudent();
  const allResults = student ? getResultsByStudentId(student.id) : [];
  const currentResult = allResults.find((r) => r.semesterId === 'sem3');

  if (allResults.length === 0) return (
    <div className="p-6">
      <h1 className="text-xl font-700 text-slate-900 mb-4">Performance Analytics</h1>
      <EmptyState title="No performance data" description="Your analytics will appear here once results are available." />
    </div>
  );

  const gpaTrend = allResults.map((r) => ({
    name: r.semesterName.replace('Semester ', 'Sem '),
    gpa: r.gpa,
    cgpa: r.cgpa,
    pct: parseFloat(r.percentage.toFixed(2)),
  }));

  const subjectData = currentResult?.subjects.map((s) => ({
    subject: s.subjectCode,
    percentage: parseFloat(s.percentage.toFixed(1)),
    grade: s.grade,
    fullMark: 100,
  })) ?? [];

  const radarData = currentResult?.subjects.map((s) => ({
    subject: s.subjectCode,
    score: parseFloat(s.percentage.toFixed(1)),
  })) ?? [];

  const gradeCount = currentResult?.subjects.reduce<Record<string, number>>((acc, s) => {
    acc[s.grade] = (acc[s.grade] ?? 0) + 1;
    return acc;
  }, {}) ?? {};

  const gradeData = Object.entries(gradeCount).map(([grade, count]) => ({ grade, count }));

  const prevResult = allResults.find((r) => r.semesterId === 'sem2');
  const semComparison = prevResult && currentResult ? {
    gpaDiff: (currentResult.gpa - prevResult.gpa).toFixed(2),
    pctDiff: (currentResult.percentage - prevResult.percentage).toFixed(2),
  } : null;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Performance Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Academic performance insights for {student?.name}</p>
      </div>

      {/* GPA trend */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 mb-4">GPA & CGPA Progression</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={gpaTrend}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="gpa" stroke="#6366F1" strokeWidth={2.5} fill="url(#g1)" name="GPA" dot={{ r: 5, fill: '#6366F1' }} />
            <Area type="monotone" dataKey="cgpa" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#g2)" name="CGPA" dot={{ r: 5, fill: '#8B5CF6' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Subject performance */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Subject Performance — Sem III (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} cursor={{ fill: '#F8FAFC' }} formatter={(v: unknown) => `${v}%`} />
              <Bar dataKey="percentage" fill="#6366F1" radius={[4, 4, 0, 0]} name="Score %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Subject Radar — Sem III</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <Radar name="Score %" dataKey="score" stroke="#6366F1" fill="#6366F1" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} formatter={(v: unknown) => `${v}%`} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Semester comparison */}
      {semComparison && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Semester Comparison (Sem II → Sem III)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'GPA Change', prev: prevResult?.gpa.toFixed(2), curr: currentResult?.gpa.toFixed(2), diff: semComparison.gpaDiff },
              { label: 'Percentage Change', prev: `${prevResult?.percentage.toFixed(2)}%`, curr: `${currentResult?.percentage.toFixed(2)}%`, diff: semComparison.pctDiff },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-3">{item.label}</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Sem II</p>
                    <p className="text-xl font-700 text-slate-700">{item.prev}</p>
                  </div>
                  <div className={`text-center px-4 py-2 rounded-xl ${Number(item.diff) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className={`text-xl font-700 ${Number(item.diff) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Number(item.diff) >= 0 ? '+' : ''}{item.diff}
                    </p>
                    <p className={`text-xs ${Number(item.diff) >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                      {Number(item.diff) >= 0 ? 'Improved ↑' : 'Declined ↓'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400">Sem III</p>
                    <p className="text-xl font-700 text-indigo-700">{item.curr}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grade distribution */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 mb-4">Grade Distribution — Sem III</h3>
        <div className="flex flex-wrap gap-3">
          {gradeData.map(({ grade, count }) => {
            const colorMap: Record<string, string> = { O: 'bg-green-100 text-green-800', 'A+': 'bg-blue-100 text-blue-800', A: 'bg-indigo-100 text-indigo-800', 'B+': 'bg-orange-100 text-orange-800', B: 'bg-yellow-100 text-yellow-800', C: 'bg-slate-100 text-slate-700', F: 'bg-red-100 text-red-800' };
            return (
              <div key={grade} className={`px-4 py-3 rounded-xl text-center min-w-16 ${colorMap[grade] ?? 'bg-slate-100 text-slate-700'}`}>
                <p className="text-xl font-700">{grade}</p>
                <p className="text-xs mt-0.5">{count} subject{count !== 1 ? 's' : ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
