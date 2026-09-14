import { UserCheck, Mail, Phone, BookOpen } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import { useCurrentTeacher } from '../../context/AuthContext';
import { getDepartmentById, subjects } from '../../data/mockData';

export default function TeacherProfilePage() {
  const teacher = useCurrentTeacher();
  const dept = teacher ? getDepartmentById(teacher.departmentId) : null;
  const assignedSubjects = subjects.filter((s) => teacher?.assignedSubjectIds.includes(s.id));

  if (!teacher) return <div className="p-6 text-slate-500">Teacher profile not found.</div>;

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">Your faculty profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center gap-4 lg:col-span-1">
          <div className="w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-3xl font-700">
            {teacher.name.split(' ').filter((n) => /^[A-Z]/.test(n)).map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="text-center">
            <p className="text-lg font-700 text-slate-900">{teacher.name}</p>
            <p className="text-sm text-slate-500 mt-0.5">{teacher.qualification}</p>
            <div className="mt-2"><Badge variant={statusVariant(teacher.status)} size="md">{teacher.status}</Badge></div>
          </div>
          <div className="w-full space-y-2 text-sm pt-2 border-t border-slate-100">
            {[
              { icon: <Mail className="w-4 h-4 text-slate-400" />, value: teacher.email },
              { icon: <Phone className="w-4 h-4 text-slate-400" />, value: teacher.phone },
              { icon: <UserCheck className="w-4 h-4 text-slate-400" />, value: teacher.teacherId },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-600">
                {item.icon}
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-600 text-slate-900 mb-3">Academic Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[['Department', dept?.name ?? '–'], ['Department Code', dept?.code ?? '–'], ['Teacher ID', teacher.teacherId], ['Assigned Subjects', assignedSubjects.length], ['Assigned Classes', teacher.assignedClassIds.length], ['Status', teacher.status]].map(([k, v]) => (
                <div key={String(k)}>
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="font-500 text-slate-800">{String(v)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-600 text-slate-900 mb-3">Assigned Subjects</h3>
            {assignedSubjects.length === 0 ? (
              <p className="text-sm text-slate-400">No subjects assigned.</p>
            ) : (
              <div className="space-y-2">
                {assignedSubjects.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-500 text-slate-900">{sub.subjectName}</p>
                      <p className="text-xs text-slate-400">{sub.subjectCode} • {sub.credits} credits • {sub.subjectType}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
