import { useState } from 'react';
import { Search } from 'lucide-react';
import { auditLogs } from '../../data/mockData';

const actionColors: Record<string, string> = {
  MARKS_ENTERED: 'bg-blue-100 text-blue-800',
  MARKS_UPDATED: 'bg-amber-100 text-amber-800',
  RESULT_GENERATED: 'bg-green-100 text-green-800',
  STUDENT_CREATED: 'bg-indigo-100 text-indigo-800',
  SUBJECT_CREATED: 'bg-violet-100 text-violet-800',
  TEACHER_ASSIGNED: 'bg-emerald-100 text-emerald-800',
  STUDENT_DEACTIVATED: 'bg-red-100 text-red-800',
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState('');

  const filtered = auditLogs.filter((l) => {
    const q = search.toLowerCase();
    return !q || l.userName.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.entity.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Audit Logs</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track all important academic changes</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by user, action, or entity…" className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Timestamp','User','Action','Entity','Details','IP Address'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-600 text-indigo-600">{log.userName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <span className="text-slate-700 font-500">{log.userName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-500 ${actionColors[log.action] ?? 'bg-slate-100 text-slate-700'}`}>
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{log.entity}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 max-w-xs truncate">{log.newValue ?? log.oldValue ?? '–'}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-slate-400 text-sm">No audit logs found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
