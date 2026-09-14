import { useState } from 'react';
import { FileText, Download, Eye, QrCode, CheckCircle2, Loader2 } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { results, students, semesters, departments, getStudentById, getSemesterById, getDepartmentById } from '../../data/mockData';

export default function ReportsPage() {
  const [studentId, setStudentId] = useState('s1');
  const [semesterId, setSemesterId] = useState('sem3');
  const [generating, setGenerating] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [reportToken] = useState('QR-21CS0001-SEM3-2025');

  const selectedStudent = students.find((s) => s.id === studentId);
  const selectedResult = results.find((r) => r.studentId === studentId && r.semesterId === semesterId);
  const selectedSemester = getSemesterById(semesterId);
  const dept = selectedStudent ? getDepartmentById(selectedStudent.departmentId) : null;

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setPreviewOpen(true); }, 1200);
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Report Cards</h1>
        <p className="text-sm text-slate-500 mt-0.5">Generate and download professional academic report cards</p>
      </div>

      {/* Generator */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 mb-4">Generate Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Student</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
              {students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.registerNumber})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Semester</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={semesterId} onChange={(e) => setSemesterId(e.target.value)}>
              {semesters.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleGenerate} disabled={generating || !selectedResult} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Eye className="w-4 h-4" /> Preview Report</>}
            </button>
          </div>
        </div>
        {!selectedResult && (
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">No result data found for the selected student and semester.</p>
        )}
      </div>

      {/* Recent reports */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-600 text-slate-900">Recent Reports</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {results.slice(0, 5).map((r) => {
            const student = getStudentById(r.studentId);
            const sem = getSemesterById(r.semesterId);
            return (
              <div key={r.id} className="flex items-center gap-4 px-5 py-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4.5 h-4.5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-500 text-slate-900">{student?.name}</p>
                  <p className="text-xs text-slate-400">{student?.registerNumber} • {sem?.name} • GPA {r.gpa.toFixed(2)}</p>
                </div>
                <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 hover:bg-slate-100 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview Modal */}
      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Report Card Preview" size="lg">
        {selectedResult && selectedStudent && (
          <div className="space-y-5">
            {/* Header */}
            <div className="text-center bg-indigo-700 text-white rounded-xl p-6">
              <h2 className="text-lg font-700">NATIONAL INSTITUTE OF TECHNOLOGY</h2>
              <p className="text-indigo-200 text-sm mt-1">Academic Performance Report Card</p>
              <p className="text-indigo-200 text-xs mt-0.5">2024–25 • {selectedSemester?.name}</p>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-4 text-sm">
              {[
                ['Student Name', selectedStudent.name],
                ['Register No.', selectedStudent.registerNumber],
                ['Roll Number', selectedStudent.rollNumber],
                ['Department', dept?.name ?? '–'],
                ['Course', selectedStudent.course],
                ['Year / Section', `Year ${selectedStudent.year}, Section ${selectedStudent.section}`],
                ['Admission Year', selectedStudent.admissionYear],
                ['Semester', selectedSemester?.name],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="font-500 text-slate-800">{String(v)}</p>
                </div>
              ))}
            </div>

            {/* Marks table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Code','Subject Name','Cr','Int','Ext','Total','%','Grade','GP','Status'].map((h) => (
                      <th key={h} className="text-left px-3 py-2 font-600 text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedResult.subjects.map((sub) => (
                    <tr key={sub.subjectId}>
                      <td className="px-3 py-2 font-mono font-500 text-indigo-700">{sub.subjectCode}</td>
                      <td className="px-3 py-2 text-slate-800">{sub.subjectName}</td>
                      <td className="px-3 py-2 text-center font-600">{sub.credits}</td>
                      <td className="px-3 py-2 text-center">{sub.internalMarks}</td>
                      <td className="px-3 py-2 text-center">{sub.externalMarks}</td>
                      <td className="px-3 py-2 text-center font-600">{sub.totalMarks}</td>
                      <td className="px-3 py-2">{sub.percentage.toFixed(1)}%</td>
                      <td className="px-3 py-2 font-700 text-indigo-600">{sub.grade}</td>
                      <td className="px-3 py-2">{sub.gradePoint}</td>
                      <td className="px-3 py-2"><Badge variant={sub.status === 'PASS' ? 'success' : 'danger'}>{sub.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-4 gap-3">
              {[
                ['Total Marks', `${selectedResult.totalMarks}/${selectedResult.maximumMarks}`],
                ['Percentage', `${selectedResult.percentage.toFixed(2)}%`],
                ['Semester GPA', selectedResult.gpa.toFixed(2)],
                ['CGPA', selectedResult.cgpa.toFixed(2)],
              ].map(([k, v]) => (
                <div key={k} className="bg-indigo-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-indigo-600">{k}</p>
                  <p className="text-lg font-700 text-indigo-900 mt-0.5">{v}</p>
                </div>
              ))}
            </div>

            {/* QR Verification */}
            <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-4">
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center">
                <QrCode className="w-8 h-8 text-slate-600" />
              </div>
              <div>
                <p className="text-xs font-600 text-slate-700">QR Verification Token</p>
                <p className="font-mono text-xs text-slate-500 mt-0.5">{reportToken}</p>
                <p className="text-xs text-slate-400 mt-1">Scan to verify at: verify.college.edu/report/{reportToken}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="success" size="md"><CheckCircle2 className="w-3 h-3 mr-1 inline" />Result: {selectedResult.status}</Badge>
              <div className="flex gap-2">
                <button onClick={() => setPreviewOpen(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Close</button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
