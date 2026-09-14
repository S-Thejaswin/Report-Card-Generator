import { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import { useCurrentTeacher } from '../../context/AuthContext';
import { results, students, getStudentById, getSemesterById } from '../../data/mockData';

export default function TeacherReportsPage() {
  const teacher = useCurrentTeacher();
  const myStudentIds = students.filter((s) => s.departmentId === teacher?.departmentId).map((s) => s.id);
  const myResults = results.filter((r) => myStudentIds.includes(r.studentId) && r.semesterId === 'sem3');
  const [generating, setGenerating] = useState<string | null>(null);

  function generate(studentId: string) {
    setGenerating(studentId);
    setTimeout(() => setGenerating(null), 1000);
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500 mt-0.5">Generate report cards for your students</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {myResults.map((r) => {
          const student = getStudentById(r.studentId);
          const sem = getSemesterById(r.semesterId);
          return (
            <div key={r.id} className="flex items-center gap-4 px-5 py-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-500 text-slate-900">{student?.name}</p>
                <p className="text-xs text-slate-400">{student?.registerNumber} • {sem?.name} • GPA {r.gpa.toFixed(2)} • CGPA {r.cgpa.toFixed(2)}</p>
              </div>
              <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
              <button
                onClick={() => generate(r.studentId)}
                disabled={!!generating}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-500 hover:bg-indigo-700 disabled:opacity-60 transition-colors"
              >
                {generating === r.studentId ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating…</> : <><Download className="w-3.5 h-3.5" /> Download PDF</>}
              </button>
            </div>
          );
        })}
        {myResults.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">No results found for your students.</div>
        )}
      </div>
    </div>
  );
}
