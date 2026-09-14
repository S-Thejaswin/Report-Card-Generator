import { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import { subjects as initial, departments, semesters, academicYears, getDepartmentById, getSemesterById, type Subject, type SubjectType } from '../../data/mockData';

const subjectTypes: SubjectType[] = ['THEORY', 'PRACTICAL', 'LAB', 'PROJECT', 'ELECTIVE'];

export default function SubjectsPage() {
  const [list, setList] = useState(initial);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [semFilter, setSemFilter] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    subjectCode: '', subjectName: '', credits: 3, semesterId: 'sem3', departmentId: 'd1', academicYearId: 'ay1',
    maxInternalMarks: 50, maxExternalMarks: 50, subjectType: 'THEORY' as SubjectType, passPercentage: 40,
  });

  const filtered = useMemo(() => list.filter((s) => {
    const q = search.toLowerCase();
    const mSearch = !q || s.subjectCode.toLowerCase().includes(q) || s.subjectName.toLowerCase().includes(q);
    const mDept = !deptFilter || s.departmentId === deptFilter;
    const mSem = !semFilter || s.semesterId === semFilter;
    return mSearch && mDept && mSem;
  }), [list, search, deptFilter, semFilter]);

  function save() {
    const sub: Subject = {
      id: `sub${Date.now()}`,
      ...form,
      maxTotalMarks: form.maxInternalMarks + form.maxExternalMarks,
      status: 'ACTIVE',
    };
    setList((p) => [...p, sub]);
    setModal(false);
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Subjects</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} of {list.length} subjects</p>
        </div>
        <button onClick={() => setModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by code or name…" className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
          <option value="">All Departments</option>
          {departments.map((d) => <option key={d.id} value={d.id}>{d.code}</option>)}
        </select>
        <select value={semFilter} onChange={(e) => setSemFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
          <option value="">All Semesters</option>
          {semesters.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Code','Subject Name','Credits','Type','Dept','Semester','Max Marks','Pass %','Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={9}><EmptyState title="No subjects found" description="Try adjusting your search." /></td></tr>
              ) : filtered.map((s) => {
                const dept = getDepartmentById(s.departmentId);
                const sem = getSemesterById(s.semesterId);
                return (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-500 text-indigo-700">{s.subjectCode}</td>
                    <td className="px-4 py-3 font-500 text-slate-900">{s.subjectName}</td>
                    <td className="px-4 py-3 text-center text-slate-700 font-600">{s.credits}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(s.subjectType)}>{s.subjectType}</Badge></td>
                    <td className="px-4 py-3"><Badge variant="indigo">{dept?.code}</Badge></td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{sem?.name}</td>
                    <td className="px-4 py-3 text-slate-600">{s.maxInternalMarks} + {s.maxExternalMarks} = {s.maxTotalMarks}</td>
                    <td className="px-4 py-3 text-slate-600">{s.passPercentage}%</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(s.status)}>{s.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="Add Subject" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Subject Code <span className="text-red-500">*</span></label>
              <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="CS301" value={form.subjectCode} onChange={(e) => setForm((f) => ({ ...f, subjectCode: e.target.value.toUpperCase() }))} />
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Credits <span className="text-red-500">*</span></label>
              <input type="number" min={1} max={6} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.credits} onChange={(e) => setForm((f) => ({ ...f, credits: Number(e.target.value) }))} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-500 text-slate-600 mb-1">Subject Name <span className="text-red-500">*</span></label>
              <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Data Structures & Algorithms" value={form.subjectName} onChange={(e) => setForm((f) => ({ ...f, subjectName: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Subject Type</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.subjectType} onChange={(e) => setForm((f) => ({ ...f, subjectType: e.target.value as SubjectType }))}>
                {subjectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Department</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.departmentId} onChange={(e) => setForm((f) => ({ ...f, departmentId: e.target.value }))}>
                {departments.map((d) => <option key={d.id} value={d.id}>{d.code}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Semester</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.semesterId} onChange={(e) => setForm((f) => ({ ...f, semesterId: e.target.value }))}>
                {semesters.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Max Internal Marks</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.maxInternalMarks} onChange={(e) => setForm((f) => ({ ...f, maxInternalMarks: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Max External Marks</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.maxExternalMarks} onChange={(e) => setForm((f) => ({ ...f, maxExternalMarks: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-xs font-500 text-slate-600 mb-1">Pass Percentage (%)</label>
              <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.passPercentage} onChange={(e) => setForm((f) => ({ ...f, passPercentage: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setModal(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={save} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors">Save Subject</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
