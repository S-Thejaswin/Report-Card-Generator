import { useState, useMemo } from 'react';
import { Save, ClipboardList, CheckCircle2 } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import { useCurrentTeacher } from '../../context/AuthContext';
import { subjects, students, results, getStudentsByDepartment } from '../../data/mockData';
import { calculateGrade, calculateTotalMarks, calculatePercentage, calculateSubjectStatus } from '../../utils/gradeEngine';

export default function TeacherMarksPage() {
  const teacher = useCurrentTeacher();
  const assignedSubjects = subjects.filter((s) => teacher?.assignedSubjectIds.includes(s.id));
  const [subId, setSubId] = useState(assignedSubjects[0]?.id ?? '');
  const [marks, setMarks] = useState<Record<string, { internal: number | ''; external: number | '' }>>({});
  const [showTable, setShowTable] = useState(false);
  const [saved, setSaved] = useState(false);

  const selectedSubject = subjects.find((s) => s.id === subId);
  const myStudents = teacher ? getStudentsByDepartment(teacher.departmentId).filter((s) => s.status === 'ACTIVE') : [];

  function setMark(studentId: string, field: 'internal' | 'external', value: string) {
    const num = value === '' ? '' : Math.max(0, Number(value));
    setMarks((prev) => ({ ...prev, [studentId]: { ...prev[studentId], [field]: num } }));
    setSaved(false);
  }

  function handleLoad() {
    setShowTable(true);
    const prefill: Record<string, { internal: number | ''; external: number | '' }> = {};
    myStudents.forEach((student) => {
      const result = results.find((r) => r.studentId === student.id && r.semesterId === selectedSubject?.semesterId);
      const sub = result?.subjects.find((s) => s.subjectId === subId);
      if (sub) prefill[student.id] = { internal: sub.internalMarks, external: sub.externalMarks };
    });
    setMarks(prefill);
  }

  const tableData = useMemo(() => {
    return myStudents.map((student) => {
      const entry = marks[student.id];
      const internal = entry?.internal ?? '';
      const external = entry?.external ?? '';
      const total = internal !== '' && external !== '' ? calculateTotalMarks(Number(internal), Number(external)) : 0;
      const maxTotal = selectedSubject?.maxTotalMarks ?? 100;
      const pct = internal !== '' && external !== '' ? calculatePercentage(total, maxTotal) : 0;
      const { grade, gradePoint } = calculateGrade(pct);
      const status = calculateSubjectStatus(pct, selectedSubject?.passPercentage ?? 40);
      return { ...student, internal, external, total, percentage: pct, grade, gradePoint, status };
    });
  }, [myStudents, marks, selectedSubject]);

  if (assignedSubjects.length === 0) return (
    <div className="p-6"><p className="text-slate-500">No subjects assigned. Contact your administrator.</p></div>
  );

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Marks Entry</h1>
        <p className="text-sm text-slate-500 mt-0.5">Enter marks for your assigned subjects</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Select Subject</label>
          <select className="w-full max-w-sm px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={subId} onChange={(e) => { setSubId(e.target.value); setShowTable(false); setSaved(false); }}>
            {assignedSubjects.map((s) => <option key={s.id} value={s.id}>{s.subjectCode} – {s.subjectName}</option>)}
          </select>
        </div>
        {selectedSubject && (
          <div className="flex items-center gap-4 text-xs text-slate-600 bg-slate-50 rounded-lg px-4 py-2">
            <span>Max Internal: <strong className="text-slate-900">{selectedSubject.maxInternalMarks}</strong></span>
            <span>Max External: <strong className="text-slate-900">{selectedSubject.maxExternalMarks}</strong></span>
            <span>Credits: <strong className="text-slate-900">{selectedSubject.credits}</strong></span>
            <Badge variant={statusVariant(selectedSubject.subjectType)}>{selectedSubject.subjectType}</Badge>
          </div>
        )}
        <button onClick={handleLoad} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors">
          <ClipboardList className="w-4 h-4" /> Load Students
        </button>
      </div>

      {showTable && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <p className="text-sm font-600 text-slate-900">{selectedSubject?.subjectName} — {tableData.length} students</p>
            {saved && <span className="flex items-center gap-1 text-green-600 text-sm"><CheckCircle2 className="w-4 h-4" /> Saved</span>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {['Student','Roll No.','Internal','External','Total','%','Grade','Status'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-500 text-slate-900">{row.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{row.rollNumber}</td>
                    <td className="px-4 py-3">
                      <input type="number" min={0} max={selectedSubject?.maxInternalMarks} value={row.internal} onChange={(e) => setMark(row.id, 'internal', e.target.value)} className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0" />
                    </td>
                    <td className="px-4 py-3">
                      <input type="number" min={0} max={selectedSubject?.maxExternalMarks} value={row.external} onChange={(e) => setMark(row.id, 'external', e.target.value)} className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="0" />
                    </td>
                    <td className="px-4 py-3 font-600">{row.internal !== '' && row.external !== '' ? row.total : '–'}</td>
                    <td className="px-4 py-3">{row.internal !== '' && row.external !== '' ? `${row.percentage.toFixed(1)}%` : '–'}</td>
                    <td className="px-4 py-3 font-700 text-indigo-600">{row.internal !== '' && row.external !== '' ? row.grade : '–'}</td>
                    <td className="px-4 py-3">{row.internal !== '' && row.external !== '' ? <Badge variant={row.status === 'PASS' ? 'success' : 'danger'}>{row.status}</Badge> : '–'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-slate-100 flex justify-end">
            <button onClick={() => setSaved(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-600 hover:bg-indigo-700 transition-colors">
              <Save className="w-4 h-4" /> Save Marks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
