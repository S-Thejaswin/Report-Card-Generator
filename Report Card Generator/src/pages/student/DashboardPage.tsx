import { TrendingUp, Award, BookOpen, AlertTriangle, CheckCircle2, ArrowUp, Star, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Badge, { statusVariant } from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';
import { useCurrentStudent } from '../../context/AuthContext';
import { getResultsByStudentId, getDepartmentById, getAcademicYearById } from '../../data/mockData';

export default function StudentDashboardPage() {
  const student = useCurrentStudent();
  const allResults = student ? getResultsByStudentId(student.id) : [];
  const currentResult = allResults.find((r) => r.semesterId === 'sem3');
  const dept = student ? getDepartmentById(student.departmentId) : null;
  const ay = student ? getAcademicYearById(student.academicYearId) : null;

  const gpaTrend = allResults.map((r) => ({
    semester: r.semesterName.replace('Semester ', 'Sem '),
    gpa: r.gpa,
    cgpa: r.cgpa,
  }));

  const prevResult = allResults.find((r) => r.semesterId === 'sem2');
  const gpaChange = currentResult && prevResult ? (currentResult.gpa - prevResult.gpa).toFixed(2) : null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Student Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Welcome back, {student?.name}</p>
        </div>
        {currentResult && (
          <Badge variant={statusVariant(currentResult.status)} size="md">{currentResult.status} — Sem III</Badge>
        )}
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Semester GPA"
          value={currentResult?.gpa.toFixed(2) ?? '–'}
          icon={<TrendingUp className="w-5 h-5 text-indigo-600" />}
          iconBg="bg-indigo-50"
          trend={gpaChange ? { value: `${gpaChange > '0' ? '+' : ''}${gpaChange} vs Sem II`, positive: Number(gpaChange) >= 0 } : undefined}
        />
        <StatCard
          label="CGPA"
          value={currentResult?.cgpa.toFixed(2) ?? '–'}
          icon={<Award className="w-5 h-5 text-violet-600" />}
          iconBg="bg-violet-50"
          sub="cumulative"
        />
        <StatCard
          label="Subjects"
          value={currentResult?.subjects.length ?? 0}
          icon={<BookOpen className="w-5 h-5 text-sky-600" />}
          iconBg="bg-sky-50"
          sub="this semester"
        />
        <StatCard
          label="Percentage"
          value={currentResult ? `${currentResult.percentage.toFixed(1)}%` : '–'}
          icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
          iconBg="bg-green-50"
        />
      </div>

      {/* GPA trend + Performance highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">GPA & CGPA Progression</h3>
          {gpaTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={gpaTrend}>
                <defs>
                  <linearGradient id="gpaG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cgpaG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="semester" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[6, 10]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
                <Area type="monotone" dataKey="gpa" stroke="#6366F1" strokeWidth={2} fill="url(#gpaG)" name="GPA" dot={{ r: 5, fill: '#6366F1' }} />
                <Area type="monotone" dataKey="cgpa" stroke="#8B5CF6" strokeWidth={2} fill="url(#cgpaG)" name="CGPA" dot={{ r: 5, fill: '#8B5CF6' }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-slate-400 text-center py-8">No semester data available yet.</p>
          )}
        </div>

        <div className="space-y-3">
          {/* Strongest subject */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-amber-500" />
              <p className="text-xs font-600 text-slate-600">Strongest Subject</p>
            </div>
            <p className="text-sm font-600 text-slate-900">{currentResult?.strongestSubject ?? '–'}</p>
            {currentResult && (() => {
              const best = currentResult.subjects.reduce((b, s) => s.percentage > b.percentage ? s : b, currentResult.subjects[0]);
              return <p className="text-xs text-green-600 mt-0.5">{best?.percentage.toFixed(1)}% — {best?.grade}</p>;
            })()}
          </div>

          {/* Weakest subject */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <p className="text-xs font-600 text-slate-600">Needs Improvement</p>
            </div>
            <p className="text-sm font-600 text-slate-900">{currentResult?.weakestSubject ?? '–'}</p>
            {currentResult && (() => {
              const worst = currentResult.subjects.reduce((w, s) => s.percentage < w.percentage ? s : w, currentResult.subjects[0]);
              return <p className={`text-xs mt-0.5 ${worst?.status === 'FAIL' ? 'text-red-600' : 'text-amber-600'}`}>{worst?.percentage.toFixed(1)}% — {worst?.grade}</p>;
            })()}
          </div>

          {/* Academic info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-2 text-xs">
            <p className="font-600 text-slate-700">Academic Info</p>
            {[['Department', dept?.code], ['Year', `Year ${student?.year}, Sec ${student?.section}`], ['Academic Year', ay?.name], ['Course', student?.course]].map(([k, v]) => (
              <div key={String(k)} className="flex justify-between">
                <span className="text-slate-400">{k}</span>
                <span className="font-500 text-slate-700">{String(v ?? '–')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current semester marks summary */}
      {currentResult && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Semester III — Subject Overview</h3>
          <div className="space-y-2">
            {currentResult.subjects.map((sub) => (
              <div key={sub.subjectId} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-500 text-slate-800">{sub.subjectName}</p>
                  <p className="text-xs text-slate-400">{sub.subjectCode} • {sub.credits} credits</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-700 text-slate-900">{sub.totalMarks}/{sub.maxTotalMarks}</p>
                  <p className="text-xs text-slate-400">{sub.percentage.toFixed(1)}%</p>
                </div>
                <div className={`text-lg font-700 w-10 text-right ${sub.grade === 'F' ? 'text-red-600' : sub.grade === 'O' ? 'text-green-600' : 'text-indigo-600'}`}>
                  {sub.grade}
                </div>
                <Badge variant={sub.status === 'PASS' ? 'success' : 'danger'}>{sub.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
