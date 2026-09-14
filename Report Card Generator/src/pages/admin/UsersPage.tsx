import { useState } from 'react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import { users as initialUsers, type User } from '../../data/mockData';

const roleBadge = (role: string) => role === 'ADMIN' ? 'indigo' : role === 'TEACHER' ? 'success' : 'info';

export default function UsersPage() {
  const [list] = useState(initialUsers);

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">Users</h1>
        <p className="text-sm text-slate-500 mt-0.5">{list.length} system users</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['User','Email','Role','Status','Last Login','Created'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-600 flex-shrink-0 ${u.role === 'ADMIN' ? 'bg-indigo-600' : u.role === 'TEACHER' ? 'bg-emerald-600' : 'bg-sky-600'}`}>
                        {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-500 text-slate-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{u.email}</td>
                  <td className="px-4 py-3"><Badge variant={roleBadge(u.role) as any}>{u.role}</Badge></td>
                  <td className="px-4 py-3"><Badge variant={statusVariant(u.status)}>{u.status}</Badge></td>
                  <td className="px-4 py-3 text-slate-500">{new Date(u.lastLogin).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(u.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
