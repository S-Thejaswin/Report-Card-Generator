export interface GradeResult {
  grade: string;
  gradePoint: number;
}

const GRADE_SCALE: Array<{ min: number; grade: string; gradePoint: number }> = [
  { min: 90, grade: 'O', gradePoint: 10.0 },
  { min: 80, grade: 'A+', gradePoint: 9.0 },
  { min: 70, grade: 'A', gradePoint: 8.0 },
  { min: 60, grade: 'B+', gradePoint: 7.0 },
  { min: 50, grade: 'B', gradePoint: 6.0 },
  { min: 40, grade: 'C', gradePoint: 5.0 },
  { min: 0, grade: 'F', gradePoint: 0.0 },
];

export function calculateTotalMarks(internal: number, external: number): number {
  return internal + external;
}

export function calculatePercentage(total: number, maxTotal: number): number {
  if (maxTotal === 0) return 0;
  return (total / maxTotal) * 100;
}

export function calculateGrade(percentage: number): GradeResult {
  for (const scale of GRADE_SCALE) {
    if (percentage >= scale.min) {
      return { grade: scale.grade, gradePoint: scale.gradePoint };
    }
  }
  return { grade: 'F', gradePoint: 0.0 };
}

export function calculateSubjectStatus(percentage: number, passPercentage = 40): 'PASS' | 'FAIL' {
  return percentage >= passPercentage ? 'PASS' : 'FAIL';
}

export interface SubjectForGPA {
  credits: number;
  gradePoint: number;
}

export function calculateSemesterGPA(subjects: SubjectForGPA[]): number {
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  if (totalCredits === 0) return 0;
  const weightedPoints = subjects.reduce((sum, s) => sum + s.gradePoint * s.credits, 0);
  return Math.round((weightedPoints / totalCredits) * 100) / 100;
}

export function calculateCGPA(allSemesters: SubjectForGPA[][]): number {
  const allSubjects = allSemesters.flat();
  return calculateSemesterGPA(allSubjects);
}

export interface SubjectForComparison {
  subjectName: string;
  percentage: number;
}

export function calculateStrongestSubject(subjects: SubjectForComparison[]): string {
  if (subjects.length === 0) return 'N/A';
  return subjects.reduce((best, s) => (s.percentage > best.percentage ? s : best)).subjectName;
}

export function calculateWeakestSubject(subjects: SubjectForComparison[]): string {
  if (subjects.length === 0) return 'N/A';
  return subjects.reduce((worst, s) => (s.percentage < worst.percentage ? s : worst)).subjectName;
}

export function determineSemesterStatus(
  subjects: Array<{ status: 'PASS' | 'FAIL' | 'INCOMPLETE' }>
): 'PASS' | 'FAIL' | 'ARREAR' | 'INCOMPLETE' {
  const hasIncomplete = subjects.some((s) => s.status === 'INCOMPLETE');
  if (hasIncomplete) return 'INCOMPLETE';
  const failCount = subjects.filter((s) => s.status === 'FAIL').length;
  if (failCount === 0) return 'PASS';
  if (failCount < subjects.length) return 'ARREAR';
  return 'FAIL';
}
