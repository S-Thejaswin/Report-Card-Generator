import { useState } from 'react';
import { Eye } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { useCurrentTeacher } from '../../context/AuthContext';
import { results, students, getStudentById, getSemesterById } from '../../data/mockData';

export default function TeacherResultsPage() {
  const teacher = useCurrentTeacher();
  const myStudentIds = students.filter((s) => s.departmentId === teacher?.departmentId).map((s) => s.id);
  const myResults = results.filter((r) => myStudentIds.includes(r.studentId) && r.semesterId === 'sem3');
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<typeof results[0] | null>(null);

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Results</h1>
        <p className="text-sm text-slate-500 mt-0.5">Semester III results for your class</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Student','Register No.','Total','%','GPA','CGPA','Status','Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myResults.map((r) => {
                const student = getStudentById(r.studentId);
                return (
                  <tr key={r.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-500 text-slate-900">{student?.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{student?.registerNumber}</td>
                    <td className="px-4 py-3">{r.totalMarks}/{r.maximumMarks}</td>
                    <td className="px-4 py-3 font-500">{r.percentage.toFixed(2)}%</td>
                    <td className="px-4 py-3 font-700 text-indigo-600">{r.gpa.toFixed(2)}</td>
                    <td className="px-4 py-3 font-700 text-violet-600">{r.cgpa.toFixed(2)}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(r.status)}>{r.status}</Badge></td>
                    <td className="px-4 py-3">
                      <button onClick={() => { setSelected(r); setModal(true); }} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {myResults.length === 0 && (
                <tr><td colSpan={8} className="text-center py-10 text-slate-400 text-sm">No results found for your students.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Result Details" size="lg">
        {selected && (() => {
          const student = getStudentById(selected.studentId);
          return (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-600 text-slate-900">{student?.name}</p>
                  <p className="text-sm text-slate-500">{student?.registerNumber} • {selected.semesterName}</p>
                </div>
                <Badge variant={statusVariant(selected.status)} size="md">{selected.status}</Badge>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[['Total', `${selected.totalMarks}/${selected.maximumMarks}`], ['%', `${selected.percentage.toFixed(2)}%`], ['GPA', selected.gpa.toFixed(2)], ['CGPA', selected.cgpa.toFixed(2)]].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-500">{k}</p>
                    <p className="text-lg font-700 text-slate-900 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="bg-slate-50 border-b border-slate-200">{['Code','Subject','Cr','Int','Ext','Total','%','Grade','Status'].map((h) => <th key={h} className="text-left px-3 py-2 font-600 text-slate-500">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {selected.subjects.map((sub) => (
                      <tr key={sub.subjectId}>
                        <td className="px-3 py-2 font-mono font-500 text-indigo-700">{sub.subjectCode}</td>
                        <td className="px-3 py-2">{sub.subjectName}</td>
                        <td className="px-3 py-2 text-center">{sub.credits}</td>
                        <td className="px-3 py-2 text-center">{sub.internalMarks}</td>
                        <td className="px-3 py-2 text-center">{sub.externalMarks}</td>
                        <td className="px-3 py-2 text-center font-600">{sub.totalMarks}</td>
                        <td className="px-3 py-2">{sub.percentage.toFixed(1)}%</td>
                        <td className="px-3 py-2 font-700 text-indigo-600">{sub.grade}</td>
                        <td className="px-3 py-2"><Badge variant={sub.status === 'PASS' ? 'success' : 'danger'}>{sub.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end"><button onClick={() => setModal(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Close</button></div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
