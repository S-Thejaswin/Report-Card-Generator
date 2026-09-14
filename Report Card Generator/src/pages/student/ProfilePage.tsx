import { Mail, Phone, GraduationCap } from 'lucide-react';
import Badge, { statusVariant } from '../../components/ui/Badge';
import { useCurrentStudent } from '../../context/AuthContext';
import { getDepartmentById, getAcademicYearById } from '../../data/mockData';

export default function StudentProfilePage() {
  const student = useCurrentStudent();
  const dept = student ? getDepartmentById(student.departmentId) : null;
  const ay = student ? getAcademicYearById(student.academicYearId) : null;

  if (!student) return <div className="p-6 text-slate-500">Student profile not found.</div>;

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">Personal and academic information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Avatar card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-700">
            {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="text-center">
            <p className="text-lg font-700 text-slate-900">{student.name}</p>
            <p className="text-sm text-slate-500 mt-0.5">{student.course} — {dept?.code}</p>
            <div className="mt-2">
              <Badge variant={statusVariant(student.status)} size="md">{student.status}</Badge>
            </div>
          </div>
          <div className="w-full space-y-2 text-sm pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate">{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{student.phone}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* Personal info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-600 text-slate-900 border-b border-slate-100 pb-3 mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[['Full Name', student.name], ['Email', student.email], ['Phone', student.phone], ['Date of Birth', student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : '–']].map(([k, v]) => (
                <div key={String(k)}>
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="font-500 text-slate-800">{String(v)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-600 text-slate-900 border-b border-slate-100 pb-3 mb-4">Academic Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Student ID', student.studentId],
                ['Register Number', student.registerNumber],
                ['Roll Number', student.rollNumber],
                ['Department', dept?.name ?? '–'],
                ['Course', student.course],
                ['Academic Year', ay?.name ?? '–'],
                ['Year of Study', `Year ${student.year}`],
                ['Section', `Section ${student.section}`],
                ['Admission Year', student.admissionYear],
                ['Status', student.status],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="font-500 text-slate-800">{String(v)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
