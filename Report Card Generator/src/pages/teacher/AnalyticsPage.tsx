import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useCurrentTeacher } from '../../context/AuthContext';
import { results, students } from '../../data/mockData';

const subjectPerf = [
  { name: 'DSA', avg: 78, pass: 80 },
  { name: 'DBMS', avg: 72, pass: 100 },
  { name: 'OOP', avg: 58, pass: 100 },
  { name: 'Networks', avg: 61, pass: 80 },
  { name: 'DBMS Lab', avg: 83, pass: 100 },
  { name: 'OOP Lab', avg: 79, pass: 100 },
];

const gradeData = [
  { name: 'O', value: 2, color: '#22C55E' },
  { name: 'A+', value: 1, color: '#3B82F6' },
  { name: 'A', value: 1, color: '#6366F1' },
  { name: 'B+', value: 1, color: '#F97316' },
  { name: 'F', value: 2, color: '#EF4444' },
];

export default function TeacherAnalyticsPage() {
  const teacher = useCurrentTeacher();
  const myStudentIds = students.filter((s) => s.departmentId === teacher?.departmentId).map((s) => s.id);
  const myResults = results.filter((r) => myStudentIds.includes(r.studentId) && r.semesterId === 'sem3');
  const passCount = myResults.filter((r) => r.status === 'PASS').length;
  const avgGPA = myResults.length > 0 ? (myResults.reduce((s, r) => s + r.gpa, 0) / myResults.length).toFixed(2) : 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Class Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Performance insights for your class — Semester III</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: myResults.length },
          { label: 'Passed', value: passCount, color: 'text-green-600' },
          { label: 'Arrear/Fail', value: myResults.length - passCount, color: 'text-red-600' },
          { label: 'Class Avg GPA', value: avgGPA, color: 'text-indigo-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className={`text-2xl font-700 mt-1 ${s.color ?? 'text-slate-900'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Subject Average Score (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectPerf} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="avg" fill="#6366F1" radius={[4, 4, 0, 0]} name="Avg %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={gradeData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {gradeData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 mb-4">Student-wise GPA Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-50 border-b border-slate-200">{['Rank','Student','GPA','%','Status'].map((h) => <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {[...myResults].sort((a, b) => b.gpa - a.gpa).map((r, idx) => {
                const student = students.find((s) => s.id === r.studentId);
                return (
                  <tr key={r.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-400 font-600">#{idx + 1}</td>
                    <td className="px-4 py-3 font-500 text-slate-900">{student?.name}</td>
                    <td className="px-4 py-3 font-700 text-indigo-600">{r.gpa.toFixed(2)}</td>
                    <td className="px-4 py-3">{r.percentage.toFixed(2)}%</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-500 ${r.status === 'PASS' ? 'bg-green-100 text-green-800' : r.status === 'ARREAR' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>{r.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
