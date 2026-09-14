import { useState } from 'react';
import { FileText, Download, Eye, QrCode } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { useCurrentStudent } from '../../context/AuthContext';
import { getResultsByStudentId, getDepartmentById, getAcademicYearById } from '../../data/mockData';

export default function StudentReportsPage() {
  const student = useCurrentStudent();
  const dept = student ? getDepartmentById(student.departmentId) : null;
  const ay = student ? getAcademicYearById(student.academicYearId) : null;
  const allResults = student ? getResultsByStudentId(student.id) : [];

  const [previewResult, setPreviewResult] = useState<(typeof allResults)[0] | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-700 text-slate-900">My Reports</h1>
        <p className="text-sm text-slate-500 mt-0.5">Download or preview your official report cards</p>
      </div>

      {allResults.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No results available for report generation.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {[...allResults].sort((a, b) => b.semesterId.localeCompare(a.semesterId)).map((result) => (
            <div key={result.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-600 text-slate-900">{result.semesterName} Report Card</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  GPA: {result.gpa.toFixed(2)} • {result.percentage.toFixed(2)}% • {result.subjects.length} subjects
                </p>
              </div>
              <Badge variant={statusVariant(result.status)}>{result.status}</Badge>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewResult(result)}
                  className="flex items-center gap-1.5 text-xs font-500 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
                <button className="flex items-center gap-1.5 text-xs font-500 text-slate-600 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report preview modal */}
      <Modal
        open={!!previewResult}
        onClose={() => setPreviewResult(null)}
        title="Report Card Preview"
        size="lg"
      >
        {previewResult && (
          <div className="space-y-5">
            {/* Header */}
            <div className="bg-indigo-700 text-white rounded-xl p-5 text-center">
              <p className="text-xs font-500 text-indigo-200 uppercase tracking-wider">Prestige Institute of Technology</p>
              <h2 className="text-lg font-700 mt-1">Semester Examination Result</h2>
              <p className="text-sm text-indigo-200 mt-0.5">{previewResult.semesterName} — Academic Year {ay?.name ?? '2024–25'}</p>
            </div>

            {/* Student info */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm bg-slate-50 rounded-xl p-4">
              {[
                ['Student Name', student?.name],
                ['Register No.', student?.registerNumber],
                ['Roll No.', student?.rollNumber],
                ['Department', dept?.name],
                ['Course', student?.course],
                ['Year', `Year ${student?.year}, Section ${student?.section}`],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between border-b border-slate-200 pb-1.5 last:border-0">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-600 text-slate-800">{String(v ?? '–')}</span>
                </div>
              ))}
            </div>

            {/* Marks table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {['Code', 'Subject', 'Cr', 'Int', 'Ext', 'Total', '%', 'Grade', 'GP', 'Status'].map((h) => (
                      <th key={h} className="px-3 py-2.5 text-xs font-600 text-slate-500 text-left whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {previewResult.subjects.map((sub) => (
                    <tr key={sub.subjectId}>
                      <td className="px-3 py-2 font-mono text-xs font-500 text-indigo-700">{sub.subjectCode}</td>
                      <td className="px-3 py-2 text-slate-800">{sub.subjectName}</td>
                      <td className="px-3 py-2 text-center">{sub.credits}</td>
                      <td className="px-3 py-2 text-center text-slate-600">{sub.internalMarks}</td>
                      <td className="px-3 py-2 text-center text-slate-600">{sub.externalMarks}</td>
                      <td className="px-3 py-2 text-center font-600">{sub.totalMarks}</td>
                      <td className="px-3 py-2 text-slate-600">{sub.percentage.toFixed(1)}%</td>
                      <td className="px-3 py-2 font-700 text-indigo-700">{sub.grade}</td>
                      <td className="px-3 py-2 text-center">{sub.gradePoint.toFixed(1)}</td>
                      <td className="px-3 py-2">
                        <span className={`text-xs font-600 px-2 py-0.5 rounded-full ${sub.status === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{sub.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-4 gap-3 text-center">
              {[
                ['Total Marks', `${previewResult.totalMarks}/${previewResult.maximumMarks}`],
                ['Percentage', `${previewResult.percentage.toFixed(2)}%`],
                ['GPA', previewResult.gpa.toFixed(2)],
                ['CGPA', previewResult.cgpa.toFixed(2)],
              ].map(([k, v]) => (
                <div key={String(k)} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="text-lg font-700 text-slate-900 mt-0.5">{String(v)}</p>
                </div>
              ))}
            </div>

            {/* QR placeholder */}
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
              <div className="w-14 h-14 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center flex-shrink-0">
                <QrCode className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-600 text-slate-700">Verification QR Code</p>
                <p className="text-xs text-slate-400 mt-0.5">Scan to verify authenticity at verify.college.edu</p>
                <p className="text-xs font-mono text-indigo-600 mt-1">Token: SAPRS-{student?.registerNumber}-{previewResult.semesterId.toUpperCase()}</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setPreviewResult(null)} className="px-4 py-2 text-sm font-500 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">Close</button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-600 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
