import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Shield, GraduationCap } from 'lucide-react';
import { students, getResultsByStudentId, getDepartmentById } from '../data/mockData';

type VerificationResult =
  | { found: true; student: typeof students[0]; result: ReturnType<typeof getResultsByStudentId>[0] }
  | { found: false };

export default function VerificationPage() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const match = token.trim().toUpperCase().match(/^SAPRS-([A-Z0-9]+)-SEM(\d+)$/);
      if (match) {
        const regNo = match[1];
        const semId = `sem${match[2]}`;
        const student = students.find((s) => s.registerNumber.toUpperCase() === regNo);
        if (student) {
          const results = getResultsByStudentId(student.id);
          const semResult = results.find((r) => r.semesterId === semId);
          if (semResult) {
            setResult({ found: true, student, result: semResult });
          } else {
            setResult({ found: false });
          }
        } else {
          setResult({ found: false });
        }
      } else {
        setResult({ found: false });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-700 text-slate-900">Document Verification</h1>
          <p className="text-sm text-slate-500 mt-1">Verify the authenticity of a SAPRS-issued report card</p>
        </div>

        {/* Token input */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <label className="block text-xs font-600 text-slate-600 mb-2">Verification Token</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder="SAPRS-REG20240001-SEM3"
              className="flex-1 px-3 py-2.5 text-sm font-mono border border-slate-300 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:font-sans"
            />
            <button
              onClick={handleVerify}
              disabled={!token.trim() || loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-600 rounded-lg transition-colors"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Verify
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">Token format: SAPRS-{'{'}REGISTER_NO{'}'}-SEM{'{'}NUMBER{'}'}</p>

          {/* Demo tokens */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-500 text-slate-500 mb-2">Demo tokens to try:</p>
            <div className="flex flex-wrap gap-2">
              {['SAPRS-REG20240001-SEM3', 'SAPRS-REG20240001-SEM2', 'SAPRS-REG20240002-SEM3'].map((t) => (
                <button
                  key={t}
                  onClick={() => setToken(t)}
                  className="text-xs font-mono text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className={`mt-4 rounded-2xl border p-6 ${result.found ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            {result.found ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-700 text-green-800">Document Verified</p>
                    <p className="text-xs text-green-600">This document is authentic and was issued by SAPRS</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <GraduationCap className="w-4 h-4 text-indigo-500" />
                    <p className="font-600 text-slate-800">Verified Student Record</p>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    {[
                      ['Student Name', result.student.name],
                      ['Register No.', result.student.registerNumber],
                      ['Department', getDepartmentById(result.student.departmentId)?.name ?? '–'],
                      ['Semester', result.result.semesterName],
                      ['GPA', result.result.gpa.toFixed(2)],
                      ['CGPA', result.result.cgpa.toFixed(2)],
                      ['Percentage', `${result.result.percentage.toFixed(2)}%`],
                      ['Status', result.result.status],
                    ].map(([k, v]) => (
                      <div key={String(k)}>
                        <p className="text-xs text-slate-400">{k}</p>
                        <p className="font-600 text-slate-800">{String(v)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-green-600 text-center">Issued by Prestige Institute of Technology</p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-700 text-red-800">Document Not Found</p>
                  <p className="text-xs text-red-600">The token you entered does not match any issued document. Please check the token and try again.</p>
                </div>
              </div>
            )}
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-6">
          Prestige Institute of Technology — SAPRS v1.0
        </p>
      </div>
    </div>
  );
}
