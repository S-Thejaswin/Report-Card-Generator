import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import { useCurrentStudent } from '../../context/AuthContext';
import { getResultsByStudentId } from '../../data/mockData';

export default function StudentHistoryPage() {
  const student = useCurrentStudent();
  const allResults = student ? getResultsByStudentId(student.id).sort((a, b) => a.semesterId.localeCompare(b.semesterId)) : [];
  const [expanded, setExpanded] = useState<string | null>('sem3');

  if (allResults.length === 0) return (
    <div className="p-6">
      <h1 className="text-xl font-700 text-slate-900 mb-4">Result History</h1>
      <EmptyState title="No result history" description="Your academic history will appear here after results are generated." />
    </div>
  );

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Result History</h1>
        <p className="text-sm text-slate-500 mt-0.5">{allResults.length} semesters completed</p>
      </div>

      {/* CGPA summary */}
      <div className="bg-indigo-600 rounded-xl p-5 text-white">
        <p className="text-sm text-indigo-200">Cumulative GPA (CGPA)</p>
        <p className="text-4xl font-700 mt-1">{allResults[allResults.length - 1]?.cgpa.toFixed(2)}</p>
        <p className="text-sm text-indigo-200 mt-1">Across {allResults.length} completed semesters</p>
      </div>

      {/* Semester cards */}
      <div className="space-y-3">
        {[...allResults].reverse().map((result) => {
          const isExpanded = expanded === result.semesterId;
          const prevResult = allResults.find((_, idx) => allResults[idx + 1]?.semesterId === result.semesterId);
          const gpaChange = prevResult ? result.gpa - prevResult.gpa : null;

          return (
            <div key={result.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${result.semesterId === 'sem3' ? 'border-indigo-200' : 'border-slate-200'}`}>
              <button
                onClick={() => setExpanded(isExpanded ? null : result.semesterId)}
                className="w-full flex items-center gap-4 p-5 hover:bg-slate-50/50 transition-colors text-left"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${result.status === 'PASS' ? 'bg-green-50' : result.status === 'ARREAR' ? 'bg-red-50' : 'bg-amber-50'}`}>
                  <span className={`text-lg font-700 ${result.status === 'PASS' ? 'text-green-700' : result.status === 'ARREAR' ? 'text-red-600' : 'text-amber-600'}`}>{result.gpa.toFixed(1)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-600 text-slate-900">{result.semesterName}</p>
                    {result.semesterId === 'sem3' && <span className="text-xs font-500 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Current</span>}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {result.totalMarks}/{result.maximumMarks} marks • {result.percentage.toFixed(2)}% • CGPA {result.cgpa.toFixed(2)}
                    {gpaChange !== null && (
                      <span className={`ml-2 font-500 ${gpaChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {gpaChange >= 0 ? '↑' : '↓'} {Math.abs(gpaChange).toFixed(2)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusVariant(result.status)}>{result.status}</Badge>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-100 px-5 py-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50">
                          {['Code','Subject','Cr','Int','Ext','Total','%','Grade','GP','Status'].map((h) => (
                            <th key={h} className="text-left px-3 py-2.5 text-xs font-600 text-slate-500">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {result.subjects.map((sub) => (
                          <tr key={sub.subjectId} className="hover:bg-slate-50/50">
                            <td className="px-3 py-2.5 font-mono text-xs font-500 text-indigo-700">{sub.subjectCode}</td>
                            <td className="px-3 py-2.5 text-slate-800">{sub.subjectName}</td>
                            <td className="px-3 py-2.5 text-center font-600">{sub.credits}</td>
                            <td className="px-3 py-2.5 text-center text-slate-600">{sub.internalMarks}</td>
                            <td className="px-3 py-2.5 text-center text-slate-600">{sub.externalMarks}</td>
                            <td className="px-3 py-2.5 text-center font-600">{sub.totalMarks}</td>
                            <td className="px-3 py-2.5 text-slate-700">{sub.percentage.toFixed(1)}%</td>
                            <td className="px-3 py-2.5 font-700 text-indigo-600">{sub.grade}</td>
                            <td className="px-3 py-2.5 text-slate-700">{sub.gradePoint.toFixed(1)}</td>
                            <td className="px-3 py-2.5"><Badge variant={sub.status === 'PASS' ? 'success' : 'danger'}>{sub.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {result.remarks && (
                    <p className="mt-3 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">{result.remarks}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
