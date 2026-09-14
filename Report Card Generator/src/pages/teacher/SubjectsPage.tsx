import Badge, { statusVariant } from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import { useCurrentTeacher } from '../../context/AuthContext';
import { subjects, getDepartmentById, getSemesterById } from '../../data/mockData';

export default function TeacherSubjectsPage() {
  const teacher = useCurrentTeacher();
  const mySubjects = subjects.filter((s) => teacher?.assignedSubjectIds.includes(s.id));

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-xl font-700 text-slate-900">My Subjects</h1>
        <p className="text-sm text-slate-500 mt-0.5">{mySubjects.length} subjects assigned to you</p>
      </div>

      {mySubjects.length === 0 ? (
        <EmptyState title="No subjects assigned" description="Contact your administrator to assign subjects." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mySubjects.map((sub) => {
            const dept = getDepartmentById(sub.departmentId);
            const sem = getSemesterById(sub.semesterId);
            return (
              <div key={sub.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-700 text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">{sub.subjectCode}</span>
                  <Badge variant={statusVariant(sub.subjectType)}>{sub.subjectType}</Badge>
                </div>
                <div>
                  <p className="font-600 text-slate-900">{sub.subjectName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{dept?.name} • {sem?.name}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                  {[['Credits', sub.credits], ['Max Internal', sub.maxInternalMarks], ['Max External', sub.maxExternalMarks]].map(([k, v]) => (
                    <div key={String(k)} className="text-center">
                      <p className="text-xs text-slate-400">{k}</p>
                      <p className="text-sm font-700 text-slate-800">{v}</p>
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
