import { useState } from 'react';
import { Plus, Calendar, CheckCircle2 } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { academicYears as initial, type AcademicYear } from '../../data/mockData';

const statusOrder = { UPCOMING: 0, ACTIVE: 1, COMPLETED: 2, ARCHIVED: 3 };

export default function AcademicYearsPage() {
  const [list, setList] = useState(initial);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', startYear: 2025, endYear: 2026, startDate: '', endDate: '', isCurrent: false });

  function save() {
    const entry: AcademicYear = {
      id: `ay${Date.now()}`,
      name: form.name || `${form.startYear}–${form.endYear % 100}`,
      startYear: form.startYear,
      endYear: form.endYear,
      status: 'UPCOMING',
      isCurrent: form.isCurrent,
      startDate: form.startDate,
      endDate: form.endDate,
    };
    setList((p) => [...p, entry].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]));
    setModal(false);
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Academic Years</h1>
          <p className="text-sm text-slate-500 mt-0.5">{list.length} academic years configured</p>
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Academic Year
        </button>
      </div>

      <div className="space-y-3">
        {list.map((ay) => (
          <div key={ay.id} className={`bg-white rounded-xl border shadow-sm p-5 flex items-center gap-5 ${ay.isCurrent ? 'border-indigo-200' : 'border-slate-200'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${ay.isCurrent ? 'bg-indigo-50' : 'bg-slate-50'}`}>
              <Calendar className={`w-6 h-6 ${ay.isCurrent ? 'text-indigo-600' : 'text-slate-400'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-base font-600 text-slate-900">{ay.name}</p>
                {ay.isCurrent && (
                  <span className="flex items-center gap-1 text-xs font-500 text-indigo-600 bg-indigo-50 rounded-full px-2 py-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Current
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                {ay.startDate && new Date(ay.startDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                {ay.startDate && ay.endDate && ' — '}
                {ay.endDate && new Date(ay.endDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
              </p>
            </div>
            <Badge variant={statusVariant(ay.status)} size="md">{ay.status}</Badge>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Academic Year">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Start Year</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.startYear} onChange={(e) => setForm((f) => ({ ...f, startYear: Number(e.target.value), endYear: Number(e.target.value) + 1 }))} />
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">End Year</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.endYear} onChange={(e) => setForm((f) => ({ ...f, endYear: Number(e.target.value) }))} />
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
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" checked={form.isCurrent} onChange={(e) => setForm((f) => ({ ...f, isCurrent: e.target.checked }))} />
            <span className="text-sm text-slate-700">Set as current academic year</span>
          </label>
          <div className="flex justify-end gap-3">
            <button onClick={() => setModal(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={save} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
