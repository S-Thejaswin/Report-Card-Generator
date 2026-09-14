import Badge, { statusVariant } from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import { useCurrentTeacher } from '../../context/AuthContext';
import { classes, students, getDepartmentById, getAcademicYearById } from '../../data/mockData';

export default function TeacherClassesPage() {
  const teacher = useCurrentTeacher();
  const myClasses = classes.filter((c) => teacher?.assignedClassIds.includes(c.id));

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">My Classes</h1>
        <p className="text-sm text-slate-500 mt-0.5">{myClasses.length} classes assigned</p>
      </div>

      {myClasses.length === 0 ? (
        <EmptyState title="No classes assigned" description="Contact your administrator to assign classes." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myClasses.map((cls) => {
            const dept = getDepartmentById(cls.departmentId);
            const ay = getAcademicYearById(cls.academicYearId);
            const studentCount = students.filter((s) => s.departmentId === cls.departmentId && s.year === cls.year && s.section === cls.section && s.status === 'ACTIVE').length;
            return (
              <div key={cls.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-600 text-slate-900">{cls.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{dept?.name}</p>
                  </div>
                  <Badge variant={statusVariant(cls.status)}>{cls.status}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 bg-slate-50 rounded-xl p-3 text-sm">
                  {[['Academic Year', ay?.name], ['Year', `Year ${cls.year}`], ['Students', studentCount]].map(([k, v]) => (
                    <div key={String(k)} className="text-center">
                      <p className="text-xs text-slate-400">{k}</p>
                      <p className="font-600 text-slate-800">{String(v)}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
