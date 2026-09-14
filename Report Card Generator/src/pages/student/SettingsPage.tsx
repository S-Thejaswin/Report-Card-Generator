import { useState } from 'react';
import { Save, Check, Eye, EyeOff } from 'lucide-react';
import { useCurrentStudent } from '../../context/AuthContext';

export default function StudentSettingsPage() {
  const student = useCurrentStudent();
  const [saved, setSaved] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({
    phone: student?.phone ?? '',
    email: student?.email ?? '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailResults: true,
    emailAnnouncements: true,
    emailReminders: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const field = (id: string, label: string, type = 'text', value: string, onChange: (v: string) => void, disabled = false) => (
    <div>
      <label htmlFor={id} className="block text-xs font-600 text-slate-600 mb-1.5">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-all ${disabled ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed' : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'}`}
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account preferences</p>
      </div>

      {/* Profile update */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 border-b border-slate-100 pb-3 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field('name', 'Full Name', 'text', student?.name ?? '', () => {}, true)}
          {field('email', 'Email Address', 'email', form.email, (v) => setForm({ ...form, email: v }))}
          {field('phone', 'Phone Number', 'tel', form.phone, (v) => setForm({ ...form, phone: v }))}
          {field('studentId', 'Student ID', 'text', student?.studentId ?? '', () => {}, true)}
        </div>
        <p className="text-xs text-slate-400 mt-4">Name and Student ID can only be changed by the administrator.</p>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 border-b border-slate-100 pb-3 mb-4">Change Password</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-600 text-slate-600 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={form.currentPassword}
                onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                className="w-full px-3 py-2.5 pr-9 text-sm border border-slate-300 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-600 text-slate-600 mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className="w-full px-3 py-2.5 pr-9 text-sm border border-slate-300 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {field('confirm', 'Confirm New Password', 'password', form.confirmPassword, (v) => setForm({ ...form, confirmPassword: v }))}
        </div>
        <p className="text-xs text-slate-400 mt-3">Leave blank to keep your current password.</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-600 text-slate-900 border-b border-slate-100 pb-3 mb-4">Email Notifications</h3>
        <div className="space-y-3">
          {[
            { key: 'emailResults', label: 'Result Published', desc: 'Get notified when semester results are published' },
            { key: 'emailAnnouncements', label: 'Announcements', desc: 'Important announcements from the institution' },
            { key: 'emailReminders', label: 'Reminders', desc: 'Exam schedules and deadline reminders' },
          ].map(({ key, label, desc }) => (
            <label key={key} className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={form[key as keyof typeof form] as boolean}
                  onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                  className="sr-only"
                />
                <div
                  onClick={() => setForm({ ...form, [key]: !form[key as keyof typeof form] })}
                  className={`w-9 h-5 rounded-full transition-colors cursor-pointer ${form[key as keyof typeof form] ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form[key as keyof typeof form] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </div>
              </div>
              <div>
                <p className="text-sm font-500 text-slate-800">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-600 rounded-lg transition-all ${saved ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        >
          {saved ? <><Check className="w-4 h-4" />Saved!</> : <><Save className="w-4 h-4" />Save Changes</>}
        </button>
      </div>
    </div>
  );
}
