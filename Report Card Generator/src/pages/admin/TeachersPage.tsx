import { useState } from 'react';
import { Plus, Eye, Edit2 } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import { teachers as initialTeachers, departments, subjects, getDepartmentById, type Teacher } from '../../data/mockData';

export default function TeachersPage() {
  const [list, setList] = useState(initialTeachers);
  const [modal, setModal] = useState<'add' | 'view' | null>(null);
  const [selected, setSelected] = useState<Teacher | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', departmentId: 'd1', qualification: '' });

  function saveTeacher() {
    const t: Teacher = {
      id: `t${Date.now()}`,
      teacherId: `TCH${Date.now()}`,
      userId: '',
      name: form.name,
      email: form.email,
      phone: form.phone,
      departmentId: form.departmentId,
      assignedSubjectIds: [],
      assignedClassIds: [],
      qualification: form.qualification,
      status: 'ACTIVE',
    };
    setList((p) => [t, ...p]);
    setModal(null);
    setForm({ name: '', email: '', phone: '', departmentId: 'd1', qualification: '' });
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Teachers</h1>
          <p className="text-sm text-slate-500 mt-0.5">{list.length} faculty members</p>
        </div>
        <button onClick={() => setModal('add')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((t) => {
          const dept = getDepartmentById(t.departmentId);
          const assignedSubjectNames = t.assignedSubjectIds.map((id) => subjects.find((s) => s.id === id)?.subjectName).filter(Boolean);
          return (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-700 text-lg flex-shrink-0">
                  {t.name.split(' ').filter((n) => /^[A-Z]/.test(n)).map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-600 text-slate-900 truncate">{t.name}</p>
                  <p className="text-xs text-slate-500 truncate">{t.email}</p>
                </div>
                <Badge variant={statusVariant(t.status)}>{t.status}</Badge>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex gap-2">
                  <span className="text-slate-400 w-24 flex-shrink-0">Department</span>
                  <Badge variant="indigo">{dept?.code}</Badge>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-400 w-24 flex-shrink-0">Teacher ID</span>
                  <span className="text-slate-700 font-mono text-xs">{t.teacherId}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-400 w-24 flex-shrink-0">Qualification</span>
                  <span className="text-slate-700 text-xs">{t.qualification}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-400 w-24 flex-shrink-0">Subjects</span>
                  <span className="text-slate-700 text-xs">{assignedSubjectNames.length ? assignedSubjectNames.length + ' assigned' : 'None yet'}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button onClick={() => { setSelected(t); setModal('view'); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition-colors">
                  <Eye className="w-3.5 h-3.5" /> View
                </button>
              </div>
            </div>
          );
        })}
        {list.length === 0 && <div className="col-span-3"><EmptyState title="No teachers found" description="Add faculty members to get started." /></div>}
      </div>

      {/* Add Modal */}
      <Modal open={modal === 'add'} onClose={() => setModal(null)} title="Add New Teacher" size="md">
        <div className="space-y-4">
          {[
            { k: 'name', label: 'Full Name', placeholder: 'Dr. John Smith', type: 'text' },
            { k: 'email', label: 'Email', placeholder: 'faculty@college.edu', type: 'email' },
            { k: 'phone', label: 'Phone', placeholder: '9876543210', type: 'text' },
            { k: 'qualification', label: 'Qualification', placeholder: 'Ph.D. Computer Science', type: 'text' },
          ].map(({ k, label, placeholder, type }) => (
            <div key={k}>
              <label className="block text-xs font-500 text-slate-600 mb-1">{label}</label>
              <input type={type} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder={placeholder} value={(form as any)[k]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Department</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.departmentId} onChange={(e) => setForm((f) => ({ ...f, departmentId: e.target.value }))}>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.code} – {d.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModal(null)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={saveTeacher} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors">Save Teacher</button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal open={modal === 'view'} onClose={() => setModal(null)} title="Teacher Details">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-xl font-700">
                {selected.name.split(' ').filter((n) => /^[A-Z]/.test(n)).map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-base font-600 text-slate-900">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.email}</p>
                <p className="text-xs text-slate-400">{selected.qualification}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-4 text-sm">
              {[['Teacher ID', selected.teacherId], ['Phone', selected.phone], ['Department', getDepartmentById(selected.departmentId)?.name], ['Assigned Subjects', selected.assignedSubjectIds.length]].map(([k, v]) => (
                <div key={String(k)}>
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="font-500 text-slate-800">{String(v ?? '–')}</p>
                </div>
              ))}
            </div>
            {selected.assignedSubjectIds.length > 0 && (
              <div>
                <p className="text-xs font-500 text-slate-600 mb-2">Assigned Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {selected.assignedSubjectIds.map((id) => {
                    const sub = subjects.find((s) => s.id === id);
                    return sub ? <Badge key={id} variant="indigo">{sub.subjectCode} – {sub.subjectName}</Badge> : null;
                  })}
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <button onClick={() => setModal(null)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
