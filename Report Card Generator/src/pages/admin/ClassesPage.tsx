import { useState } from 'react';
import { Plus, Layers } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { classes as initial, departments, academicYears, teachers, getDepartmentById, getAcademicYearById, getTeacherById, type Class } from '../../data/mockData';

export default function ClassesPage() {
  const [list, setList] = useState(initial);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', departmentId: 'd1', academicYearId: 'ay1', year: 2, section: 'A', classTeacherId: 't1' });

  function save() {
    const cls: Class = { id: `cl${Date.now()}`, ...form, status: 'ACTIVE' };
    setList((p) => [...p, cls]);
    setModal(false);
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Classes</h1>
          <p className="text-sm text-slate-500 mt-0.5">{list.length} classes configured</p>
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Class
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Class Name','Department','Academic Year','Year','Section','Class Teacher','Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((c) => {
                const dept = getDepartmentById(c.departmentId);
                const ay = getAcademicYearById(c.academicYearId);
                const teacher = getTeacherById(c.classTeacherId);
                return (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Layers className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="font-500 text-slate-900">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant="indigo">{dept?.code}</Badge></td>
                    <td className="px-4 py-3 text-slate-600">{ay?.name}</td>
                    <td className="px-4 py-3 text-slate-600">Year {c.year}</td>
                    <td className="px-4 py-3 text-slate-600">Section {c.section}</td>
                    <td className="px-4 py-3 text-slate-600">{teacher?.name ?? '–'}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(c.status)}>{c.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Class">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Class Name <span className="text-red-500">*</span></label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="B.Tech CSE – 2nd Year A" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Department</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.departmentId} onChange={(e) => setForm((f) => ({ ...f, departmentId: e.target.value }))}>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.code}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Academic Year</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.academicYearId} onChange={(e) => setForm((f) => ({ ...f, academicYearId: e.target.value }))}>
                {academicYears.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Year</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: Number(e.target.value) }))}>
                {[1,2,3,4].map((y) => <option key={y} value={y}>{y}{['st','nd','rd','th'][y-1]} Year</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Section</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.section} onChange={(e) => setForm((f) => ({ ...f, section: e.target.value }))}>
                {['A','B','C','D'].map((s) => <option key={s} value={s}>Section {s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-500 text-slate-600 mb-1">Class Teacher</label>
            <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.classTeacherId} onChange={(e) => setForm((f) => ({ ...f, classTeacherId: e.target.value }))}>
              {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setModal(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={save} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
