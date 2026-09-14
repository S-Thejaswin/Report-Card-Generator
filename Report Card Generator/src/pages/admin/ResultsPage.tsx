import { useState } from 'react';
import { Eye } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { results, students, semesters, departments, getStudentById, getSemesterById, getDepartmentById } from '../../data/mockData';

export default function ResultsPage() {
  const [semFilter, setSemFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<typeof results[0] | null>(null);

  const filtered = results.filter((r) => {
    const student = getStudentById(r.studentId);
    const mSem = !semFilter || r.semesterId === semFilter;
    const mDept = !deptFilter || (student?.departmentId === deptFilter);
    return mSem && mDept;
  });

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Results</h1>
        <p className="text-sm text-slate-500 mt-0.5">{filtered.length} result records</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-wrap gap-3">
        <select value={semFilter} onChange={(e) => setSemFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
          <option value="">All Semesters</option>
          {semesters.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
          <option value="">All Departments</option>
          {departments.map((d) => <option key={d.id} value={d.id}>{d.code}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Student','Register No.','Semester','Dept','Total Marks','%','GPA','CGPA','Status','Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => {
                const student = getStudentById(r.studentId);
                const sem = getSemesterById(r.semesterId);
                const dept = student ? getDepartmentById(student.departmentId) : null;
                return (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-500 text-slate-900">{student?.name ?? '–'}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{student?.registerNumber ?? '–'}</td>
                    <td className="px-4 py-3 text-slate-600">{sem?.name ?? r.semesterName}</td>
                    <td className="px-4 py-3"><Badge variant="indigo">{dept?.code ?? '–'}</Badge></td>
                    <td className="px-4 py-3 text-slate-700">{r.totalMarks}/{r.maximumMarks}</td>
                    <td className="px-4 py-3 font-500 text-slate-800">{r.percentage.toFixed(2)}%</td>
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
                  <p className="text-base font-600 text-slate-900">{student?.name}</p>
                  <p className="text-sm text-slate-500">{student?.registerNumber} • {selected.semesterName}</p>
                </div>
                <Badge variant={statusVariant(selected.status)} size="md">{selected.status}</Badge>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  ['Total Marks', `${selected.totalMarks}/${selected.maximumMarks}`],
                  ['Percentage', `${selected.percentage.toFixed(2)}%`],
                  ['GPA', selected.gpa.toFixed(2)],
                  ['CGPA', selected.cgpa.toFixed(2)],
                ].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-500">{k}</p>
                    <p className="text-lg font-700 text-slate-900 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {['Code','Subject','Credits','Internal','External','Total','%','Grade','GP','Status'].map((h) => (
                        <th key={h} className="text-left px-3 py-2 font-600 text-slate-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selected.subjects.map((sub) => (
                      <tr key={sub.subjectId}>
                        <td className="px-3 py-2 font-mono font-500 text-indigo-700">{sub.subjectCode}</td>
                        <td className="px-3 py-2 text-slate-800">{sub.subjectName}</td>
                        <td className="px-3 py-2 text-center font-600 text-slate-700">{sub.credits}</td>
                        <td className="px-3 py-2 text-center text-slate-600">{sub.internalMarks}</td>
                        <td className="px-3 py-2 text-center text-slate-600">{sub.externalMarks}</td>
                        <td className="px-3 py-2 text-center font-600 text-slate-800">{sub.totalMarks}</td>
                        <td className="px-3 py-2 text-slate-700">{sub.percentage.toFixed(1)}%</td>
                        <td className="px-3 py-2 font-700 text-indigo-600">{sub.grade}</td>
                        <td className="px-3 py-2 text-slate-700">{sub.gradePoint.toFixed(1)}</td>
                        <td className="px-3 py-2"><Badge variant={sub.status === 'PASS' ? 'success' : 'danger'}>{sub.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {selected.remarks && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
                  <strong>Remarks:</strong> {selected.remarks}
                </div>
              )}
              <div className="flex justify-end">
                <button onClick={() => setModal(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Close</button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
