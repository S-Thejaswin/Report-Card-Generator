import { useState } from 'react';
import { Plus, Edit2, Building2 } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { departments as initialDepts, students, type Department } from '../../data/mockData';

export default function DepartmentsPage() {
  const [list, setList] = useState(initialDepts);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [selected, setSelected] = useState<Department | null>(null);
  const [form, setForm] = useState({ code: '', name: '', description: '' });

  function save() {
    if (modal === 'add') {
      setList((p) => [...p, { id: `d${Date.now()}`, code: form.code, name: form.name, description: form.description, status: 'ACTIVE' as const }]);
    } else if (selected) {
      setList((p) => p.map((d) => d.id === selected.id ? { ...d, ...form } : d));
    }
    setModal(null);
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Departments</h1>
          <p className="text-sm text-slate-500 mt-0.5">{list.length} departments</p>
        </div>
        <button onClick={() => { setForm({ code: '', name: '', description: '' }); setModal('add'); }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {list.map((d) => {
          const studentCount = students.filter((s) => s.departmentId === d.id).length;
          return (
            <div key={d.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-indigo-600" />
                </div>
                <Badge variant={statusVariant(d.status)}>{d.status}</Badge>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-700 text-slate-900">{d.code}</span>
                </div>
                <p className="text-sm text-slate-600 mt-0.5">{d.name}</p>
                <p className="text-xs text-slate-400 mt-1">{d.description}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-sm text-slate-500">{studentCount} student{studentCount !== 1 ? 's' : ''}</span>
                <button onClick={() => { setSelected(d); setForm({ code: d.code, name: d.name, description: d.description }); setModal('edit'); }} className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'add' ? 'Add Department' : 'Edit Department'}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Department Code <span className="text-red-500">*</span></label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. CSE" value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} />
          </div>
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Full Name <span className="text-red-500">*</span></label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Computer Science & Engineering" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Description</label>
            <textarea className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" rows={3} placeholder="Brief description of this department" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setModal(null)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={save} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
