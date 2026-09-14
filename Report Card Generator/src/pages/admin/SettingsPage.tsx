import { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    collegeName: 'National Institute of Technology',
    collegeCode: 'NIT-2025',
    academicYear: '2024-25',
    verificationBaseUrl: 'https://verify.college.edu',
    passPercentage: 40,
    gradeO: 90,
    gradeAplus: 80,
    gradeA: 70,
    gradeBplus: 60,
    gradeB: 50,
    gradeC: 40,
    emailHost: 'smtp.college.edu',
    emailPort: 587,
    emailFrom: 'noreply@college.edu',
    maxLoginAttempts: 5,
    tokenExpiryHours: 24,
    resetTokenExpiryMinutes: 30,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-0.5">System-wide configuration</p>
        </div>
        {saved && (
          <div className="flex items-center gap-1.5 text-green-600 text-sm bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">
            <CheckCircle2 className="w-4 h-4" /> Settings saved
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Institution */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-600 text-slate-900 border-b border-slate-100 pb-3">Institution Details</h3>
          {[
            { k: 'collegeName', label: 'College Name', type: 'text' },
            { k: 'collegeCode', label: 'Institution Code', type: 'text' },
            { k: 'verificationBaseUrl', label: 'QR Verification Base URL', type: 'url' },
          ].map(({ k, label, type }) => (
            <div key={k}>
              <label className="block text-xs font-500 text-slate-600 mb-1">{label}</label>
              <input type={type} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={(form as any)[k]} onChange={(e) => set(k, e.target.value)} />
            </div>
          ))}
        </div>

        {/* Grading */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-600 text-slate-900 border-b border-slate-100 pb-3">Grading Scale (min. percentage)</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: 'gradeO', label: 'O (Outstanding)', gp: '10.0' },
              { k: 'gradeAplus', label: 'A+ (Excellent)', gp: '9.0' },
              { k: 'gradeA', label: 'A (Very Good)', gp: '8.0' },
              { k: 'gradeBplus', label: 'B+ (Good)', gp: '7.0' },
              { k: 'gradeB', label: 'B (Above Average)', gp: '6.0' },
              { k: 'gradeC', label: 'C (Average)', gp: '5.0' },
            ].map(({ k, label, gp }) => (
              <div key={k}>
                <label className="block text-xs font-500 text-slate-600 mb-1">{label} <span className="text-slate-400">(GP {gp})</span></label>
                <div className="flex items-center gap-1.5">
                  <input type="number" min={0} max={100} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={(form as any)[k]} onChange={(e) => set(k, Number(e.target.value))} />
                  <span className="text-slate-400 text-sm">%</span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Default Pass Percentage</label>
            <div className="flex items-center gap-1.5">
              <input type="number" min={0} max={100} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.passPercentage} onChange={(e) => set('passPercentage', Number(e.target.value))} />
              <span className="text-slate-400 text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-600 text-slate-900 border-b border-slate-100 pb-3">Email Configuration</h3>
          {[
            { k: 'emailHost', label: 'SMTP Host', type: 'text' },
            { k: 'emailFrom', label: 'From Address', type: 'email' },
          ].map(({ k, label, type }) => (
            <div key={k}>
              <label className="block text-xs font-500 text-slate-600 mb-1">{label}</label>
              <input type={type} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={(form as any)[k]} onChange={(e) => set(k, e.target.value)} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">SMTP Port</label>
            <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.emailPort} onChange={(e) => set('emailPort', Number(e.target.value))} />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-600 text-slate-900 border-b border-slate-100 pb-3">Security Settings</h3>
          {[
            { k: 'maxLoginAttempts', label: 'Max Login Attempts' },
            { k: 'tokenExpiryHours', label: 'JWT Expiry (hours)' },
            { k: 'resetTokenExpiryMinutes', label: 'Password Reset Token Expiry (minutes)' },
          ].map(({ k, label }) => (
            <div key={k}>
              <label className="block text-xs font-500 text-slate-600 mb-1">{label}</label>
              <input type="number" min={1} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={(form as any)[k]} onChange={(e) => set(k, Number(e.target.value))} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-600 hover:bg-indigo-700 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
