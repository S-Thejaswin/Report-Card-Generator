import { Star, AlertCircle } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import { useCurrentStudent } from '../../context/AuthContext';
import { getResultsByStudentId } from '../../data/mockData';
import EmptyState from '../../components/ui/EmptyState';

export default function StudentResultsPage() {
  const student = useCurrentStudent();
  const allResults = student ? getResultsByStudentId(student.id) : [];
  const currentResult = allResults.find((r) => r.semesterId === 'sem3');

  if (!currentResult) return (
    <div className="p-6">
      <h1 className="text-xl font-700 text-slate-900 mb-4">Current Result</h1>
      <EmptyState title="No result data" description="Your semester result has not been generated yet." />
    </div>
  );

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Current Result</h1>
          <p className="text-sm text-slate-500 mt-0.5">{currentResult.semesterName} — 2024–25</p>
        </div>
        <Badge variant={statusVariant(currentResult.status)} size="md">{currentResult.status}</Badge>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Marks', value: `${currentResult.totalMarks}/${currentResult.maximumMarks}`, color: 'text-slate-900' },
          { label: 'Percentage', value: `${currentResult.percentage.toFixed(2)}%`, color: 'text-slate-900' },
          { label: 'Semester GPA', value: currentResult.gpa.toFixed(2), color: 'text-indigo-700' },
          { label: 'CGPA', value: currentResult.cgpa.toFixed(2), color: 'text-violet-700' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className={`text-2xl font-700 mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Subject marks table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-600 text-slate-900">Subject-wise Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Code','Subject Name','Credits','Internal','External','Total (/ 100)','%','Grade','Grade Point','Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentResult.subjects.map((sub) => (
                <tr key={sub.subjectId} className={`hover:bg-slate-50/50 transition-colors ${sub.status === 'FAIL' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3 font-mono text-xs font-500 text-indigo-700">{sub.subjectCode}</td>
                  <td className="px-4 py-3 font-500 text-slate-900">{sub.subjectName}</td>
                  <td className="px-4 py-3 text-center font-600 text-slate-700">{sub.credits}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{sub.internalMarks}</td>
                  <td className="px-4 py-3 text-center text-slate-600">{sub.externalMarks}</td>
                  <td className="px-4 py-3 text-center font-600 text-slate-900">{sub.totalMarks}</td>
                  <td className="px-4 py-3 text-slate-700">{sub.percentage.toFixed(1)}%</td>
                  <td className="px-4 py-3">
                    <span className={`text-lg font-700 ${sub.grade === 'F' ? 'text-red-600' : sub.grade === 'O' ? 'text-green-600' : 'text-indigo-600'}`}>{sub.grade}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-700 font-500">{sub.gradePoint.toFixed(1)}</td>
                  <td className="px-4 py-3"><Badge variant={sub.status === 'PASS' ? 'success' : 'danger'}>{sub.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Strongest Subject</p>
            <p className="font-600 text-slate-900">{currentResult.strongestSubject}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Needs Improvement</p>
            <p className="font-600 text-slate-900">{currentResult.weakestSubject}</p>
          </div>
        </div>
      </div>

      {currentResult.remarks && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong className="font-600">Remarks:</strong> {currentResult.remarks}
        </div>
      )}

      {/* Grading scale */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 mb-3">Grading Scale</h3>
        <div className="flex flex-wrap gap-3 text-xs">
          {[['O', '≥90%', '10.0', 'text-green-700 bg-green-50'], ['A+', '80–89%', '9.0', 'text-blue-700 bg-blue-50'], ['A', '70–79%', '8.0', 'text-indigo-700 bg-indigo-50'], ['B+', '60–69%', '7.0', 'text-orange-700 bg-orange-50'], ['B', '50–59%', '6.0', 'text-yellow-700 bg-yellow-50'], ['C', '40–49%', '5.0', 'text-slate-700 bg-slate-100'], ['F', '<40%', '0.0', 'text-red-700 bg-red-50']].map(([g, r, gp, cls]) => (
            <div key={g} className={`rounded-lg px-3 py-2 text-center ${cls}`}>
              <p className="font-700 text-base">{g}</p>
              <p className="text-xs opacity-80">{r}</p>
              <p className="text-xs opacity-70">GP: {gp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
