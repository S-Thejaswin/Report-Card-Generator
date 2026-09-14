import { useState, useMemo } from 'react';
import { Save, AlertCircle, CheckCircle2, ClipboardList } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import { departments, academicYears, semesters, subjects, students, results, getSubjectsBySemester, getStudentsByDepartment } from '../../data/mockData';
import { calculateGrade, calculatePercentage, calculateTotalMarks, calculateSubjectStatus } from '../../utils/gradeEngine';

interface MarkEntry {
  studentId: string;
  studentName: string;
  rollNumber: string;
  internal: number | '';
  external: number | '';
  total: number;
  percentage: number;
  grade: string;
  gradePoint: number;
  status: 'PASS' | 'FAIL';
  error?: string;
}

export default function MarksPage() {
  const [deptId, setDeptId] = useState('d1');
  const [ayId, setAyId] = useState('ay1');
  const [semId, setSemId] = useState('sem3');
  const [subId, setSubId] = useState('sub1');
  const [saved, setSaved] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const filteredSemesters = semesters.filter((s) => s.departmentId === deptId && s.academicYearId === ayId);
  const filteredSubjects = subjects.filter((s) => s.semesterId === semId && s.departmentId === deptId);
  const filteredStudents = getStudentsByDepartment(deptId).filter((s) => s.status === 'ACTIVE');

  const selectedSubject = subjects.find((s) => s.id === subId);

  const [marks, setMarks] = useState<Record<string, { internal: number | ''; external: number | '' }>>({});

  function setMark(studentId: string, field: 'internal' | 'external', value: string) {
    const num = value === '' ? '' : Math.max(0, Number(value));
    setMarks((prev) => ({ ...prev, [studentId]: { ...prev[studentId], [field]: num } }));
    setSaved(false);
  }

  const tableData: MarkEntry[] = useMemo(() => {
    return filteredStudents.map((student) => {
      const existing = marks[student.id];
      const internal = existing?.internal ?? '';
      const external = existing?.external ?? '';
      let error: string | undefined;

      if (selectedSubject && internal !== '' && Number(internal) > selectedSubject.maxInternalMarks) {
        error = `Internal cannot exceed ${selectedSubject.maxInternalMarks}`;
      }
      if (selectedSubject && external !== '' && Number(external) > selectedSubject.maxExternalMarks) {
        error = `External cannot exceed ${selectedSubject.maxExternalMarks}`;
      }

      const total = internal !== '' && external !== '' ? calculateTotalMarks(Number(internal), Number(external)) : 0;
      const maxTotal = selectedSubject?.maxTotalMarks ?? 100;
      const pct = internal !== '' && external !== '' ? calculatePercentage(total, maxTotal) : 0;
      const { grade, gradePoint } = calculateGrade(pct);
      const status = calculateSubjectStatus(pct, selectedSubject?.passPercentage ?? 40);

      return { studentId: student.id, studentName: student.name, rollNumber: student.rollNumber, internal, external, total, percentage: pct, grade, gradePoint, status, error };
    });
  }, [filteredStudents, marks, selectedSubject]);

  function handleLoad() {
    setShowTable(true);
    setSaved(false);
    // Prefill from existing results
    const prefill: Record<string, { internal: number | ''; external: number | '' }> = {};
    filteredStudents.forEach((student) => {
      const result = results.find((r) => r.studentId === student.id && r.semesterId === semId);
      if (result) {
        const sub = result.subjects.find((s) => s.subjectId === subId);
        if (sub) {
          prefill[student.id] = { internal: sub.internalMarks, external: sub.externalMarks };
        }
      }
    });
    setMarks(prefill);
  }

  function handleSave() {
    setSaved(true);
  }

  const hasErrors = tableData.some((r) => r.error);

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Marks Entry</h1>
        <p className="text-sm text-slate-500 mt-0.5">Enter and manage student marks for a subject</p>
      </div>

      {/* Selection filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 mb-4">Select Academic Context</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Department</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={deptId} onChange={(e) => { setDeptId(e.target.value); setShowTable(false); setSaved(false); }}>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.code} – {d.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Academic Year</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={ayId} onChange={(e) => { setAyId(e.target.value); setShowTable(false); setSaved(false); }}>
              {academicYears.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Semester</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={semId} onChange={(e) => { setSemId(e.target.value); setShowTable(false); setSaved(false); }}>
              {filteredSemesters.length === 0
                ? <option value="">No semesters available</option>
                : filteredSemesters.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)
              }
            </select>
          </div>
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Subject</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={subId} onChange={(e) => { setSubId(e.target.value); setShowTable(false); setSaved(false); }}>
              {filteredSubjects.length === 0
                ? <option value="">No subjects available</option>
                : filteredSubjects.map((s) => <option key={s.id} value={s.id}>{s.subjectCode} – {s.subjectName}</option>)
              }
            </select>
          </div>
        </div>

        {selectedSubject && (
          <div className="mt-4 flex items-center gap-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
            <span>Max Internal: <strong className="text-slate-900">{selectedSubject.maxInternalMarks}</strong></span>
            <span>Max External: <strong className="text-slate-900">{selectedSubject.maxExternalMarks}</strong></span>
            <span>Max Total: <strong className="text-slate-900">{selectedSubject.maxTotalMarks}</strong></span>
            <span>Pass: <strong className="text-slate-900">{selectedSubject.passPercentage}%</strong></span>
            <Badge variant={statusVariant(selectedSubject.subjectType)}>{selectedSubject.subjectType}</Badge>
          </div>
        )}

        <div className="mt-4">
          <button onClick={handleLoad} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors">
            <ClipboardList className="w-4 h-4" />
            Load Students
          </button>
        </div>
      </div>

      {/* Marks table */}
      {showTable && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-600 text-slate-900">Mark Entry — {selectedSubject?.subjectName}</p>
              <p className="text-xs text-slate-400 mt-0.5">{tableData.length} students</p>
            </div>
            {saved && (
              <div className="flex items-center gap-1.5 text-green-600 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Marks saved successfully
              </div>
            )}
            {hasErrors && (
              <div className="flex items-center gap-1.5 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" /> Fix validation errors before saving
              </div>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-600 text-slate-500">#</th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-slate-500">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-slate-500">Roll No.</th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-slate-500">Internal <span className="text-slate-400 font-normal">(/{selectedSubject?.maxInternalMarks})</span></th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-slate-500">External <span className="text-slate-400 font-normal">(/{selectedSubject?.maxExternalMarks})</span></th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-slate-500">Total</th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-slate-500">%</th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-slate-500">Grade</th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row, idx) => (
                  <tr key={row.studentId} className={`hover:bg-slate-50/50 transition-colors ${row.error ? 'bg-red-50/30' : ''}`}>
                    <td className="px-4 py-3 text-slate-400 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3 font-500 text-slate-900">{row.studentName}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{row.rollNumber}</td>
                    <td className="px-4 py-3">
                      <div>
                        <input
                          type="number"
                          min={0}
                          max={selectedSubject?.maxInternalMarks}
                          value={row.internal}
                          onChange={(e) => setMark(row.studentId, 'internal', e.target.value)}
                          className={`w-20 px-2.5 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${row.error?.includes('Internal') ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                          placeholder="0"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min={0}
                        max={selectedSubject?.maxExternalMarks}
                        value={row.external}
                        onChange={(e) => setMark(row.studentId, 'external', e.target.value)}
                        className={`w-20 px-2.5 py-1.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${row.error?.includes('External') ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                        placeholder="0"
                      />
                    </td>
                    <td className="px-4 py-3 font-600 text-slate-900">{row.internal !== '' && row.external !== '' ? row.total : '–'}</td>
                    <td className="px-4 py-3 text-slate-700">{row.internal !== '' && row.external !== '' ? `${row.percentage.toFixed(1)}%` : '–'}</td>
                    <td className="px-4 py-3">
                      {row.internal !== '' && row.external !== '' ? (
                        <span className={`font-700 text-sm ${row.grade === 'F' ? 'text-red-600' : row.grade === 'O' ? 'text-green-600' : 'text-indigo-600'}`}>{row.grade}</span>
                      ) : '–'}
                    </td>
                    <td className="px-4 py-3">
                      {row.internal !== '' && row.external !== '' ? (
                        <Badge variant={row.status === 'PASS' ? 'success' : 'danger'}>{row.status}</Badge>
                      ) : '–'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSave}
              disabled={hasErrors}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              Save All Marks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
