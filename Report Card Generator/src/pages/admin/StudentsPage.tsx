import { useState, useMemo } from 'react';
import { Plus, Search, Filter, ChevronLeft, ChevronRight, Eye, Edit2, UserX, UserCheck as UserCheckIcon } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import { students as initialStudents, departments, academicYears, getDepartmentById, getAcademicYearById, type Student } from '../../data/mockData';

const PAGE_SIZE = 8;

function StudentForm({ student, onSave, onCancel }: { student?: Partial<Student>; onSave: (s: Partial<Student>) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Partial<Student>>(student ?? { status: 'ACTIVE', course: 'B.Tech', year: 1, section: 'A', departmentId: 'd1', academicYearId: 'ay1' });
  const set = (k: keyof Student, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-500 text-slate-600 mb-1">Full Name <span className="text-red-500">*</span></label>
          <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.name ?? ''} onChange={(e) => set('name', e.target.value)} placeholder="Student full name" />
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Email <span className="text-red-500">*</span></label>
          <input type="email" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.email ?? ''} onChange={(e) => set('email', e.target.value)} placeholder="student@college.edu" />
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Phone</label>
          <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.phone ?? ''} onChange={(e) => set('phone', e.target.value)} placeholder="10-digit mobile" />
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Register Number <span className="text-red-500">*</span></label>
          <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.registerNumber ?? ''} onChange={(e) => set('registerNumber', e.target.value)} placeholder="21CS0001" />
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Roll Number</label>
          <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.rollNumber ?? ''} onChange={(e) => set('rollNumber', e.target.value)} placeholder="CSE-001" />
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Department <span className="text-red-500">*</span></label>
          <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.departmentId ?? ''} onChange={(e) => set('departmentId', e.target.value)}>
            {departments.map((d) => <option key={d.id} value={d.id}>{d.code} – {d.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Academic Year <span className="text-red-500">*</span></label>
          <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.academicYearId ?? ''} onChange={(e) => set('academicYearId', e.target.value)}>
            {academicYears.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Year</label>
          <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.year ?? 1} onChange={(e) => set('year', Number(e.target.value))}>
            {[1, 2, 3, 4].map((y) => <option key={y} value={y}>{y}{['st','nd','rd','th'][y-1]} Year</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Section</label>
          <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.section ?? 'A'} onChange={(e) => set('section', e.target.value)}>
            {['A','B','C','D'].map((s) => <option key={s} value={s}>Section {s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Admission Year</label>
          <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.admissionYear ?? 2022} onChange={(e) => set('admissionYear', Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-xs font-500 text-slate-600 mb-1">Date of Birth</label>
          <input type="date" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" value={form.dateOfBirth ?? ''} onChange={(e) => set('dateOfBirth', e.target.value)} />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
        <button onClick={() => onSave(form)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors">Save Student</button>
      </div>
    </div>
  );
}

export default function StudentsPage() {
  const [list, setList] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selected, setSelected] = useState<Partial<Student> | null>(null);

  const filtered = useMemo(() => {
    return list.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q) || s.registerNumber.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const matchDept = !deptFilter || s.departmentId === deptFilter;
      const matchYear = !yearFilter || String(s.year) === yearFilter;
      const matchStatus = !statusFilter || s.status === statusFilter;
      return matchSearch && matchDept && matchYear && matchStatus;
    });
  }, [list, search, deptFilter, yearFilter, statusFilter]);

  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleStatus(id: string) {
    setList((prev) => prev.map((s) => s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : s));
  }

  function saveStudent(data: Partial<Student>) {
    if (modal === 'add') {
      const newS: Student = {
        id: `s${Date.now()}`,
        studentId: `STU${Date.now()}`,
        rollNumber: data.rollNumber ?? '',
        registerNumber: data.registerNumber ?? '',
        userId: '',
        name: data.name ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        departmentId: data.departmentId ?? 'd1',
        course: 'B.Tech',
        academicYearId: data.academicYearId ?? 'ay1',
        year: data.year ?? 1,
        section: data.section ?? 'A',
        admissionYear: data.admissionYear ?? 2022,
        dateOfBirth: data.dateOfBirth ?? '',
        status: 'ACTIVE',
      };
      setList((prev) => [newS, ...prev]);
    } else if (modal === 'edit' && selected) {
      setList((prev) => prev.map((s) => s.id === selected.id ? { ...s, ...data } as Student : s));
    }
    setModal(null);
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-700 text-slate-900">Students</h1>
          <p className="text-sm text-slate-500 mt-0.5">{filtered.length} student{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <button
          onClick={() => { setSelected(null); setModal('add'); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-500 hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, ID, register no…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select value={deptFilter} onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
            <option value="">All Departments</option>
            {departments.map((d) => <option key={d.id} value={d.id}>{d.code}</option>)}
          </select>
          <select value={yearFilter} onChange={(e) => { setYearFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
            <option value="">All Years</option>
            {[1,2,3,4].map((y) => <option key={y} value={y}>{y}{['st','nd','rd','th'][y-1]} Year</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Student ID','Name','Register No.','Department','Year / Sec','Academic Year','Status','Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-600 text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pageData.length === 0 ? (
                <tr><td colSpan={8}><EmptyState title="No students found" description="Try adjusting your search or filters." /></td></tr>
              ) : pageData.map((s) => {
                const dept = getDepartmentById(s.departmentId);
                const ay = getAcademicYearById(s.academicYearId);
                return (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{s.studentId}</td>
                    <td className="px-4 py-3">
                      <div className="font-500 text-slate-900">{s.name}</div>
                      <div className="text-xs text-slate-400">{s.email}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{s.registerNumber}</td>
                    <td className="px-4 py-3"><Badge variant="indigo">{dept?.code ?? '–'}</Badge></td>
                    <td className="px-4 py-3 text-slate-600">Yr {s.year} / {s.section}</td>
                    <td className="px-4 py-3 text-slate-500">{ay?.name ?? '–'}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant(s.status)}>{s.status}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setSelected(s); setModal('view'); }} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors" title="View"><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { setSelected(s); setModal('edit'); }} className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => toggleStatus(s.id)} className={`p-1.5 rounded-lg transition-colors ${s.status === 'ACTIVE' ? 'hover:bg-red-50 text-slate-500 hover:text-red-600' : 'hover:bg-green-50 text-slate-500 hover:text-green-600'}`} title={s.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}>
                          {s.status === 'ACTIVE' ? <UserX className="w-3.5 h-3.5" /> : <UserCheckIcon className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-500">Page {page} of {pages}</span>
            <div className="flex items-center gap-1">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              {Array.from({ length: pages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2).map((p) => (
                <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-lg text-sm transition-colors ${p === page ? 'bg-indigo-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{p}</button>
              ))}
              <button disabled={page === pages} onClick={() => setPage((p) => p + 1)} className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modal === 'add' || modal === 'edit'}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add New Student' : 'Edit Student'}
        size="lg"
      >
        <StudentForm student={modal === 'edit' ? selected ?? {} : {}} onSave={saveStudent} onCancel={() => setModal(null)} />
      </Modal>

      {/* View Modal */}
      <Modal open={modal === 'view'} onClose={() => setModal(null)} title="Student Details" size="md">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-700">
                {(selected.name ?? '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="text-base font-600 text-slate-900">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.email}</p>
                <Badge variant={statusVariant(selected.status ?? 'ACTIVE')} size="md">{selected.status}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-xl p-4 text-sm">
              {[
                ['Student ID', selected.studentId],
                ['Register No.', selected.registerNumber],
                ['Roll No.', selected.rollNumber],
                ['Department', getDepartmentById(selected.departmentId ?? '')?.name],
                ['Year', `${selected.year}${['st','nd','rd','th'][(selected.year ?? 1)-1]} Year`],
                ['Section', selected.section],
                ['Course', selected.course],
                ['Admission', selected.admissionYear],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="font-500 text-slate-800">{v ?? '–'}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setModal(null)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
