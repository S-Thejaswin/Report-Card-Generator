import { useState } from 'react';
import { Plus } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { semesters as initial, departments, academicYears, getDepartmentById, getAcademicYearById, type Semester } from '../../data/mockData';

export default function SemestersPage() {
  const [list, setList] = useState(initial);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', number: 3, academicYearId: 'ay1', departmentId: 'd1', year: 2, startDate: '', endDate: '' });

  function save() {
    const sem: Semester = { id: `sem${Date.now()}`, ...form, status: 'UPCOMING' };
    setList((p) => [...p, sem]);
    setModal(false);
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Semesters</h1>
          <p className="text-sm text-slate-500 mt-0.5">{list.length} semesters configured</p>
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Semester
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Semester','Number','Department','Academic Year','Year','Start Date','End Date','Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((sem) => {
                const dept = getDepartmentById(sem.departmentId);
                const ay = getAcademicYearById(sem.academicYearId);
                return (
                  <tr key={sem.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-500 text-slate-900">{sem.name}</td>
                    <td className="px-4 py-3 text-slate-600">{sem.number}</td>
                    <td className="px-4 py-3"><Badge variant="indigo">{dept?.code}</Badge></td>
                    <td className="px-4 py-3 text-slate-600">{ay?.name}</td>
                    <td className="px-4 py-3 text-slate-600">Year {sem.year}</td>
                    <td className="px-4 py-3 text-slate-500">{sem.startDate ? new Date(sem.startDate).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : '–'}</td>
                    <td className="px-4 py-3 text-slate-500">{sem.endDate ? new Date(sem.endDate).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : '–'}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(sem.status)}>{sem.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Semester">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Semester Name</label>
              <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Semester III" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Semester Number</label>
              <input type="number" min={1} max={8} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.number} onChange={(e) => setForm((f) => ({ ...f, number: Number(e.target.value) }))} />
            </div>
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
              <label className="block text-xs font-500 text-slate-600 mb-1">Start Date</label>
              <input type="date" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">End Date</label>
              <input type="date" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
            </div>
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
