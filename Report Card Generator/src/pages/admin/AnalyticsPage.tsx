import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts';

const deptPerf = [
  { dept: 'CSE', avgGPA: 8.2, passRate: 92 },
  { dept: 'IT', avgGPA: 7.8, passRate: 88 },
  { dept: 'ECE', avgGPA: 7.5, passRate: 85 },
  { dept: 'MECH', avgGPA: 7.1, passRate: 80 },
];

const semTrend = [
  { sem: 'Sem I', CSE: 7.8, IT: 7.5, ECE: 7.2, MECH: 6.9 },
  { sem: 'Sem II', CSE: 8.0, IT: 7.7, ECE: 7.4, MECH: 7.1 },
  { sem: 'Sem III', CSE: 8.2, IT: 7.8, ECE: 7.5, MECH: 7.2 },
];

const gradeDistPie = [
  { name: 'O', value: 12, color: '#22C55E' },
  { name: 'A+', value: 22, color: '#3B82F6' },
  { name: 'A', value: 31, color: '#6366F1' },
  { name: 'B+', value: 24, color: '#F97316' },
  { name: 'B+', value: 7, color: '#EAB308' },
  { name: 'F', value: 4, color: '#EF4444' },
];

const subjectPerf = [
  { subject: 'DSA', avg: 78 },
  { subject: 'DBMS', avg: 72 },
  { subject: 'OOP', avg: 68 },
  { subject: 'Networks', avg: 65 },
  { subject: 'DBMS Lab', avg: 85 },
  { subject: 'OOP Lab', avg: 82 },
];

const COLORS = ['#6366F1', '#22C55E', '#F97316', '#3B82F6'];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Academic performance insights for 2024–25</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Avg GPA', value: '7.84', sub: 'across all departments', color: 'text-indigo-600' },
          { label: 'Pass Rate', value: '88.5%', sub: 'this semester', color: 'text-green-600' },
          { label: 'Arrear Students', value: '2', sub: 'requiring support', color: 'text-amber-600' },
          { label: 'Top Department', value: 'CSE', sub: 'GPA 8.2 average', color: 'text-violet-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className={`text-2xl font-700 mt-1 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Department comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Department GPA Comparison</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptPerf} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[6, 10]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="avgGPA" fill="#6366F1" radius={[4, 4, 0, 0]} name="Avg GPA" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Department Pass Rate (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptPerf} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} cursor={{ fill: '#F8FAFC' }} formatter={(v: unknown) => `${v}%`} />
              <Bar dataKey="passRate" fill="#22C55E" radius={[4, 4, 0, 0]} name="Pass Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Semester trend + Grade dist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">GPA Trend by Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={semTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="sem" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[6, 10]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              {['CSE', 'IT', 'ECE', 'MECH'].map((dept, i) => (
                <Line key={dept} type="monotone" dataKey={dept} stroke={COLORS[i]} strokeWidth={2} dot={{ r: 4 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="text-sm font-600 text-slate-900 mb-4">Subject Average Performance (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectPerf} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
              <YAxis type="category" dataKey="subject" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 12 }} formatter={(v: unknown) => `${v}%`} cursor={{ fill: '#F8FAFC' }} />
              <Bar dataKey="avg" fill="#818CF8" radius={[0, 4, 4, 0]} name="Avg %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grade distribution table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 mb-4">Grade Distribution Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Department','O (≥90%)','A+ (80–89%)','A (70–79%)','B+ (60–69%)','B (50–59%)','C (40–49%)','F (<40%)','Total','Pass %'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {[
                { dept: 'CSE', O: 28, Aplus: 68, A: 112, Bplus: 87, B: 55, C: 18, F: 12, total: 380 },
                { dept: 'IT', O: 15, Aplus: 42, A: 78, Bplus: 65, B: 42, C: 15, F: 8, total: 265 },
                { dept: 'ECE', O: 12, Aplus: 38, A: 65, Bplus: 55, B: 35, C: 12, F: 6, total: 223 },
                { dept: 'MECH', O: 8, Aplus: 25, A: 48, Bplus: 42, B: 28, C: 10, F: 4, total: 165 },
              ].map((row) => {
                const passCount = row.O + row.Aplus + row.A + row.Bplus + row.B + row.C;
                const passRate = ((passCount / row.total) * 100).toFixed(1);
                return (
                  <tr key={row.dept} className="hover:bg-slate-50/50">
                    <td className="px-3 py-2.5"><span className="font-600 text-slate-800">{row.dept}</span></td>
                    <td className="px-3 py-2.5 text-green-700 font-500">{row.O}</td>
                    <td className="px-3 py-2.5 text-blue-700">{row.Aplus}</td>
                    <td className="px-3 py-2.5 text-indigo-700">{row.A}</td>
                    <td className="px-3 py-2.5 text-orange-700">{row.Bplus}</td>
                    <td className="px-3 py-2.5 text-yellow-700">{row.B}</td>
                    <td className="px-3 py-2.5 text-slate-600">{row.C}</td>
                    <td className="px-3 py-2.5 text-red-600 font-500">{row.F}</td>
                    <td className="px-3 py-2.5 text-slate-700 font-600">{row.total}</td>
                    <td className="px-3 py-2.5 font-600 text-green-600">{passRate}%</td>
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
