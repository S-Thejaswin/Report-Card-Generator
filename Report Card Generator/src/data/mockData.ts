export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';
export type Status = 'ACTIVE' | 'INACTIVE';
export type SubjectStatus = 'PASS' | 'FAIL' | 'ARREAR' | 'INCOMPLETE';
export type SemesterStatus = 'PASS' | 'FAIL' | 'ARREAR' | 'INCOMPLETE';
export type SubjectType = 'THEORY' | 'PRACTICAL' | 'LAB' | 'PROJECT' | 'ELECTIVE';
export type AcademicYearStatus = 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type SemesterStatusType = 'UPCOMING' | 'ACTIVE' | 'COMPLETED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  lastLogin: string;
  createdAt: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  description: string;
  status: Status;
}

export interface AcademicYear {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  status: AcademicYearStatus;
  isCurrent: boolean;
  startDate: string;
  endDate: string;
}

export interface Class {
  id: string;
  name: string;
  departmentId: string;
  academicYearId: string;
  year: number;
  section: string;
  classTeacherId: string;
  status: Status;
}

export interface Semester {
  id: string;
  name: string;
  number: number;
  academicYearId: string;
  departmentId: string;
  year: number;
  startDate: string;
  endDate: string;
  status: SemesterStatusType;
}

export interface Subject {
  id: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  semesterId: string;
  departmentId: string;
  academicYearId: string;
  maxInternalMarks: number;
  maxExternalMarks: number;
  maxTotalMarks: number;
  subjectType: SubjectType;
  passPercentage: number;
  status: Status;
}

export interface Student {
  id: string;
  studentId: string;
  rollNumber: string;
  registerNumber: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  course: string;
  academicYearId: string;
  year: number;
  section: string;
  admissionYear: number;
  dateOfBirth: string;
  status: Status;
}

export interface Teacher {
  id: string;
  teacherId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  assignedSubjectIds: string[];
  assignedClassIds: string[];
  qualification: string;
  status: Status;
}

export interface SubjectResult {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  maxTotalMarks: number;
  percentage: number;
  grade: string;
  gradePoint: number;
  status: SubjectStatus;
  remarks?: string;
}

export interface Result {
  id: string;
  studentId: string;
  semesterId: string;
  semesterName: string;
  academicYearId: string;
  subjects: SubjectResult[];
  totalMarks: number;
  maximumMarks: number;
  percentage: number;
  gpa: number;
  cgpa: number;
  status: SemesterStatus;
  strongestSubject: string;
  weakestSubject: string;
  remarks?: string;
  generatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  oldValue?: string;
  newValue?: string;
  ipAddress: string;
  createdAt: string;
}

// ─── USERS ────────────────────────────────────────────────────────────────────
export const users: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@college.edu',
    role: 'ADMIN',
    status: 'ACTIVE',
    lastLogin: '2025-01-14T08:30:00Z',
    createdAt: '2023-06-01T00:00:00Z',
  },
  {
    id: 'u2',
    name: 'Dr. Ramesh Kumar',
    email: 'teacher@college.edu',
    role: 'TEACHER',
    status: 'ACTIVE',
    lastLogin: '2025-01-14T09:00:00Z',
    createdAt: '2023-06-01T00:00:00Z',
  },
  {
    id: 'u3',
    name: 'Arjun Krishnamurthy',
    email: 'student@college.edu',
    role: 'STUDENT',
    status: 'ACTIVE',
    lastLogin: '2025-01-14T10:00:00Z',
    createdAt: '2022-07-01T00:00:00Z',
  },
  {
    id: 'u4',
    name: 'Prof. Sunita Verma',
    email: 'sunita.v@college.edu',
    role: 'TEACHER',
    status: 'ACTIVE',
    lastLogin: '2025-01-13T11:00:00Z',
    createdAt: '2023-06-01T00:00:00Z',
  },
  {
    id: 'u5',
    name: 'Dr. Anil Gupta',
    email: 'anil.g@college.edu',
    role: 'TEACHER',
    status: 'ACTIVE',
    lastLogin: '2025-01-12T09:30:00Z',
    createdAt: '2023-06-01T00:00:00Z',
  },
];

// ─── DEPARTMENTS ───────────────────────────────────────────────────────────────
export const departments: Department[] = [
  { id: 'd1', code: 'CSE', name: 'Computer Science & Engineering', description: 'Core CS and software engineering programs.', status: 'ACTIVE' },
  { id: 'd2', code: 'IT', name: 'Information Technology', description: 'IT systems, networking and information management.', status: 'ACTIVE' },
  { id: 'd3', code: 'ECE', name: 'Electronics & Communication Engineering', description: 'Electronics, signals and communication systems.', status: 'ACTIVE' },
  { id: 'd4', code: 'MECH', name: 'Mechanical Engineering', description: 'Mechanics, thermodynamics and manufacturing.', status: 'ACTIVE' },
];

// ─── ACADEMIC YEARS ───────────────────────────────────────────────────────────
export const academicYears: AcademicYear[] = [
  {
    id: 'ay1',
    name: '2024–25',
    startYear: 2024,
    endYear: 2025,
    status: 'ACTIVE',
    isCurrent: true,
    startDate: '2024-07-01',
    endDate: '2025-06-30',
  },
  {
    id: 'ay2',
    name: '2023–24',
    startYear: 2023,
    endYear: 2024,
    status: 'COMPLETED',
    isCurrent: false,
    startDate: '2023-07-01',
    endDate: '2024-06-30',
  },
  {
    id: 'ay3',
    name: '2025–26',
    startYear: 2025,
    endYear: 2026,
    status: 'UPCOMING',
    isCurrent: false,
    startDate: '2025-07-01',
    endDate: '2026-06-30',
  },
];

// ─── CLASSES ──────────────────────────────────────────────────────────────────
export const classes: Class[] = [
  { id: 'cl1', name: 'B.Tech CSE – 2nd Year A', departmentId: 'd1', academicYearId: 'ay1', year: 2, section: 'A', classTeacherId: 't1', status: 'ACTIVE' },
  { id: 'cl2', name: 'B.Tech CSE – 2nd Year B', departmentId: 'd1', academicYearId: 'ay1', year: 2, section: 'B', classTeacherId: 't1', status: 'ACTIVE' },
  { id: 'cl3', name: 'B.Tech IT – 2nd Year B', departmentId: 'd2', academicYearId: 'ay1', year: 2, section: 'B', classTeacherId: 't2', status: 'ACTIVE' },
  { id: 'cl4', name: 'B.Tech ECE – 3rd Year A', departmentId: 'd3', academicYearId: 'ay1', year: 3, section: 'A', classTeacherId: 't3', status: 'ACTIVE' },
  { id: 'cl5', name: 'B.Tech MECH – 2nd Year A', departmentId: 'd4', academicYearId: 'ay1', year: 2, section: 'A', classTeacherId: 't1', status: 'ACTIVE' },
];

// ─── SEMESTERS ────────────────────────────────────────────────────────────────
export const semesters: Semester[] = [
  { id: 'sem3', name: 'Semester III', number: 3, academicYearId: 'ay1', departmentId: 'd1', year: 2, startDate: '2024-07-15', endDate: '2024-12-15', status: 'ACTIVE' },
  { id: 'sem4', name: 'Semester IV', number: 4, academicYearId: 'ay1', departmentId: 'd1', year: 2, startDate: '2025-01-15', endDate: '2025-06-15', status: 'UPCOMING' },
  { id: 'sem1', name: 'Semester I', number: 1, academicYearId: 'ay2', departmentId: 'd1', year: 1, startDate: '2023-07-15', endDate: '2023-12-15', status: 'COMPLETED' },
  { id: 'sem2', name: 'Semester II', number: 2, academicYearId: 'ay2', departmentId: 'd1', year: 1, startDate: '2024-01-15', endDate: '2024-06-15', status: 'COMPLETED' },
  { id: 'sem5', name: 'Semester V', number: 5, academicYearId: 'ay1', departmentId: 'd3', year: 3, startDate: '2024-07-15', endDate: '2024-12-15', status: 'ACTIVE' },
];

// ─── SUBJECTS ─────────────────────────────────────────────────────────────────
export const subjects: Subject[] = [
  // Semester 3 (CSE)
  { id: 'sub1', subjectCode: 'CS301', subjectName: 'Data Structures & Algorithms', credits: 4, semesterId: 'sem3', departmentId: 'd1', academicYearId: 'ay1', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub2', subjectCode: 'CS302', subjectName: 'Database Management Systems', credits: 4, semesterId: 'sem3', departmentId: 'd1', academicYearId: 'ay1', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub3', subjectCode: 'CS303', subjectName: 'Object Oriented Programming', credits: 3, semesterId: 'sem3', departmentId: 'd1', academicYearId: 'ay1', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub4', subjectCode: 'CS304', subjectName: 'Computer Networks', credits: 3, semesterId: 'sem3', departmentId: 'd1', academicYearId: 'ay1', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub5', subjectCode: 'CS305', subjectName: 'DBMS Laboratory', credits: 2, semesterId: 'sem3', departmentId: 'd1', academicYearId: 'ay1', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'LAB', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub6', subjectCode: 'CS306', subjectName: 'OOP Laboratory', credits: 2, semesterId: 'sem3', departmentId: 'd1', academicYearId: 'ay1', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'LAB', passPercentage: 40, status: 'ACTIVE' },
  // Semester 1 historical
  { id: 'sub7', subjectCode: 'CS101', subjectName: 'Engineering Mathematics I', credits: 4, semesterId: 'sem1', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub8', subjectCode: 'CS102', subjectName: 'Engineering Physics', credits: 3, semesterId: 'sem1', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub9', subjectCode: 'CS103', subjectName: 'Programming in C', credits: 4, semesterId: 'sem1', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub10', subjectCode: 'CS104', subjectName: 'English for Engineers', credits: 2, semesterId: 'sem1', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub11', subjectCode: 'CS105', subjectName: 'Physics Laboratory', credits: 2, semesterId: 'sem1', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'LAB', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub12', subjectCode: 'CS106', subjectName: 'Programming Laboratory', credits: 2, semesterId: 'sem1', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'LAB', passPercentage: 40, status: 'ACTIVE' },
  // Semester 2 historical
  { id: 'sub13', subjectCode: 'CS201', subjectName: 'Engineering Mathematics II', credits: 4, semesterId: 'sem2', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub14', subjectCode: 'CS202', subjectName: 'Engineering Chemistry', credits: 3, semesterId: 'sem2', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub15', subjectCode: 'CS203', subjectName: 'Digital Logic Design', credits: 4, semesterId: 'sem2', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub16', subjectCode: 'CS204', subjectName: 'Data Communication', credits: 3, semesterId: 'sem2', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'THEORY', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub17', subjectCode: 'CS205', subjectName: 'Chemistry Laboratory', credits: 2, semesterId: 'sem2', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'LAB', passPercentage: 40, status: 'ACTIVE' },
  { id: 'sub18', subjectCode: 'CS206', subjectName: 'Digital Design Lab', credits: 2, semesterId: 'sem2', departmentId: 'd1', academicYearId: 'ay2', maxInternalMarks: 50, maxExternalMarks: 50, maxTotalMarks: 100, subjectType: 'LAB', passPercentage: 40, status: 'ACTIVE' },
];

// ─── TEACHERS ─────────────────────────────────────────────────────────────────
export const teachers: Teacher[] = [
  {
    id: 't1',
    teacherId: 'TCH2023001',
    userId: 'u2',
    name: 'Dr. Ramesh Kumar',
    email: 'teacher@college.edu',
    phone: '9811234567',
    departmentId: 'd1',
    assignedSubjectIds: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'],
    assignedClassIds: ['cl1', 'cl2'],
    qualification: 'Ph.D. Computer Science',
    status: 'ACTIVE',
  },
  {
    id: 't2',
    teacherId: 'TCH2023002',
    userId: 'u4',
    name: 'Prof. Sunita Verma',
    email: 'sunita.v@college.edu',
    phone: '9822345678',
    departmentId: 'd2',
    assignedSubjectIds: [],
    assignedClassIds: ['cl3'],
    qualification: 'M.Tech Information Technology',
    status: 'ACTIVE',
  },
  {
    id: 't3',
    teacherId: 'TCH2023003',
    userId: 'u5',
    name: 'Dr. Anil Gupta',
    email: 'anil.g@college.edu',
    phone: '9833456789',
    departmentId: 'd3',
    assignedSubjectIds: [],
    assignedClassIds: ['cl4'],
    qualification: 'Ph.D. Electronics Engineering',
    status: 'ACTIVE',
  },
];

// ─── STUDENTS ─────────────────────────────────────────────────────────────────
export const students: Student[] = [
  { id: 's1', studentId: 'STU2024001', rollNumber: 'CSE-001', registerNumber: '21CS0001', userId: 'u3', name: 'Arjun Krishnamurthy', email: 'student@college.edu', phone: '9876543210', departmentId: 'd1', course: 'B.Tech', academicYearId: 'ay1', year: 2, section: 'A', admissionYear: 2022, dateOfBirth: '2004-03-15', status: 'ACTIVE' },
  { id: 's2', studentId: 'STU2024002', rollNumber: 'CSE-002', registerNumber: '21CS0002', userId: '', name: 'Priya Sharma', email: 'priya.s@student.edu', phone: '9876543211', departmentId: 'd1', course: 'B.Tech', academicYearId: 'ay1', year: 2, section: 'A', admissionYear: 2022, dateOfBirth: '2004-05-20', status: 'ACTIVE' },
  { id: 's3', studentId: 'STU2024003', rollNumber: 'CSE-003', registerNumber: '21CS0003', userId: '', name: 'Rohit Nair', email: 'rohit.n@student.edu', phone: '9876543212', departmentId: 'd1', course: 'B.Tech', academicYearId: 'ay1', year: 2, section: 'A', admissionYear: 2022, dateOfBirth: '2004-07-10', status: 'ACTIVE' },
  { id: 's4', studentId: 'STU2024004', rollNumber: 'IT-001', registerNumber: '21IT0001', userId: '', name: 'Sneha Patel', email: 'sneha.p@student.edu', phone: '9876543213', departmentId: 'd2', course: 'B.Tech', academicYearId: 'ay1', year: 2, section: 'B', admissionYear: 2022, dateOfBirth: '2004-09-25', status: 'ACTIVE' },
  { id: 's5', studentId: 'STU2024005', rollNumber: 'IT-002', registerNumber: '21IT0002', userId: '', name: 'Vikram Mehta', email: 'vikram.m@student.edu', phone: '9876543214', departmentId: 'd2', course: 'B.Tech', academicYearId: 'ay1', year: 2, section: 'B', admissionYear: 2022, dateOfBirth: '2004-11-08', status: 'ACTIVE' },
  { id: 's6', studentId: 'STU2024006', rollNumber: 'ECE-001', registerNumber: '21EC0001', userId: '', name: 'Ananya Iyer', email: 'ananya.i@student.edu', phone: '9876543215', departmentId: 'd3', course: 'B.Tech', academicYearId: 'ay1', year: 3, section: 'A', admissionYear: 2021, dateOfBirth: '2003-02-14', status: 'ACTIVE' },
  { id: 's7', studentId: 'STU2024007', rollNumber: 'CSE-004', registerNumber: '21CS0004', userId: '', name: 'Karthik Rajan', email: 'karthik.r@student.edu', phone: '9876543216', departmentId: 'd1', course: 'B.Tech', academicYearId: 'ay1', year: 3, section: 'B', admissionYear: 2021, dateOfBirth: '2003-04-22', status: 'ACTIVE' },
  { id: 's8', studentId: 'STU2024008', rollNumber: 'CSE-005', registerNumber: '21CS0005', userId: '', name: 'Meera Joshi', email: 'meera.j@student.edu', phone: '9876543217', departmentId: 'd1', course: 'B.Tech', academicYearId: 'ay1', year: 2, section: 'A', admissionYear: 2022, dateOfBirth: '2004-06-30', status: 'ACTIVE' },
  { id: 's9', studentId: 'STU2024009', rollNumber: 'MECH-001', registerNumber: '21ME0001', userId: '', name: 'Akash Singh', email: 'akash.s@student.edu', phone: '9876543218', departmentId: 'd4', course: 'B.Tech', academicYearId: 'ay1', year: 2, section: 'A', admissionYear: 2022, dateOfBirth: '2004-08-16', status: 'INACTIVE' },
  { id: 's10', studentId: 'STU2024010', rollNumber: 'CSE-006', registerNumber: '21CS0006', userId: '', name: 'Deepika Reddy', email: 'deepika.r@student.edu', phone: '9876543219', departmentId: 'd1', course: 'B.Tech', academicYearId: 'ay1', year: 2, section: 'A', admissionYear: 2022, dateOfBirth: '2004-01-05', status: 'ACTIVE' },
];

// ─── RESULTS ──────────────────────────────────────────────────────────────────
// Pre-computed results for student s1 (Arjun Krishnamurthy)
export const results: Result[] = [
  // Semester 1 (historical)
  {
    id: 'res1',
    studentId: 's1',
    semesterId: 'sem1',
    semesterName: 'Semester I',
    academicYearId: 'ay2',
    subjects: [
      { subjectId: 'sub7', subjectCode: 'CS101', subjectName: 'Engineering Mathematics I', credits: 4, internalMarks: 44, externalMarks: 46, totalMarks: 90, maxTotalMarks: 100, percentage: 90, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub8', subjectCode: 'CS102', subjectName: 'Engineering Physics', credits: 3, internalMarks: 40, externalMarks: 42, totalMarks: 82, maxTotalMarks: 100, percentage: 82, grade: 'A+', gradePoint: 9.0, status: 'PASS' },
      { subjectId: 'sub9', subjectCode: 'CS103', subjectName: 'Programming in C', credits: 4, internalMarks: 38, externalMarks: 36, totalMarks: 74, maxTotalMarks: 100, percentage: 74, grade: 'A', gradePoint: 8.0, status: 'PASS' },
      { subjectId: 'sub10', subjectCode: 'CS104', subjectName: 'English for Engineers', credits: 2, internalMarks: 35, externalMarks: 33, totalMarks: 68, maxTotalMarks: 100, percentage: 68, grade: 'B+', gradePoint: 7.0, status: 'PASS' },
      { subjectId: 'sub11', subjectCode: 'CS105', subjectName: 'Physics Laboratory', credits: 2, internalMarks: 47, externalMarks: 45, totalMarks: 92, maxTotalMarks: 100, percentage: 92, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub12', subjectCode: 'CS106', subjectName: 'Programming Laboratory', credits: 2, internalMarks: 44, externalMarks: 43, totalMarks: 87, maxTotalMarks: 100, percentage: 87, grade: 'A+', gradePoint: 9.0, status: 'PASS' },
    ],
    totalMarks: 493,
    maximumMarks: 600,
    percentage: 82.17,
    gpa: 8.88,
    cgpa: 8.88,
    status: 'PASS',
    strongestSubject: 'Engineering Mathematics I',
    weakestSubject: 'English for Engineers',
    generatedAt: '2023-12-20T10:00:00Z',
  },
  // Semester 2 (historical)
  {
    id: 'res2',
    studentId: 's1',
    semesterId: 'sem2',
    semesterName: 'Semester II',
    academicYearId: 'ay2',
    subjects: [
      { subjectId: 'sub13', subjectCode: 'CS201', subjectName: 'Engineering Mathematics II', credits: 4, internalMarks: 46, externalMarks: 48, totalMarks: 94, maxTotalMarks: 100, percentage: 94, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub14', subjectCode: 'CS202', subjectName: 'Engineering Chemistry', credits: 3, internalMarks: 42, externalMarks: 43, totalMarks: 85, maxTotalMarks: 100, percentage: 85, grade: 'A+', gradePoint: 9.0, status: 'PASS' },
      { subjectId: 'sub15', subjectCode: 'CS203', subjectName: 'Digital Logic Design', credits: 4, internalMarks: 39, externalMarks: 40, totalMarks: 79, maxTotalMarks: 100, percentage: 79, grade: 'A', gradePoint: 8.0, status: 'PASS' },
      { subjectId: 'sub16', subjectCode: 'CS204', subjectName: 'Data Communication', credits: 3, internalMarks: 37, externalMarks: 38, totalMarks: 75, maxTotalMarks: 100, percentage: 75, grade: 'A', gradePoint: 8.0, status: 'PASS' },
      { subjectId: 'sub17', subjectCode: 'CS205', subjectName: 'Chemistry Laboratory', credits: 2, internalMarks: 48, externalMarks: 47, totalMarks: 95, maxTotalMarks: 100, percentage: 95, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub18', subjectCode: 'CS206', subjectName: 'Digital Design Lab', credits: 2, internalMarks: 45, externalMarks: 44, totalMarks: 89, maxTotalMarks: 100, percentage: 89, grade: 'A+', gradePoint: 9.0, status: 'PASS' },
    ],
    totalMarks: 517,
    maximumMarks: 600,
    percentage: 86.17,
    gpa: 8.94,
    cgpa: 8.91,
    status: 'PASS',
    strongestSubject: 'Engineering Mathematics II',
    weakestSubject: 'Data Communication',
    generatedAt: '2024-06-20T10:00:00Z',
  },
  // Semester 3 (current)
  {
    id: 'res3',
    studentId: 's1',
    semesterId: 'sem3',
    semesterName: 'Semester III',
    academicYearId: 'ay1',
    subjects: [
      { subjectId: 'sub1', subjectCode: 'CS301', subjectName: 'Data Structures & Algorithms', credits: 4, internalMarks: 45, externalMarks: 47, totalMarks: 92, maxTotalMarks: 100, percentage: 92, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub2', subjectCode: 'CS302', subjectName: 'Database Management Systems', credits: 4, internalMarks: 43, externalMarks: 44, totalMarks: 87, maxTotalMarks: 100, percentage: 87, grade: 'A+', gradePoint: 9.0, status: 'PASS' },
      { subjectId: 'sub3', subjectCode: 'CS303', subjectName: 'Object Oriented Programming', credits: 3, internalMarks: 40, externalMarks: 38, totalMarks: 78, maxTotalMarks: 100, percentage: 78, grade: 'A', gradePoint: 8.0, status: 'PASS' },
      { subjectId: 'sub4', subjectCode: 'CS304', subjectName: 'Computer Networks', credits: 3, internalMarks: 38, externalMarks: 36, totalMarks: 74, maxTotalMarks: 100, percentage: 74, grade: 'A', gradePoint: 8.0, status: 'PASS' },
      { subjectId: 'sub5', subjectCode: 'CS305', subjectName: 'DBMS Laboratory', credits: 2, internalMarks: 48, externalMarks: 45, totalMarks: 93, maxTotalMarks: 100, percentage: 93, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub6', subjectCode: 'CS306', subjectName: 'OOP Laboratory', credits: 2, internalMarks: 46, externalMarks: 44, totalMarks: 90, maxTotalMarks: 100, percentage: 90, grade: 'O', gradePoint: 10.0, status: 'PASS' },
    ],
    totalMarks: 514,
    maximumMarks: 600,
    percentage: 85.67,
    gpa: 9.11,
    cgpa: 8.98,
    status: 'PASS',
    strongestSubject: 'DBMS Laboratory',
    weakestSubject: 'Computer Networks',
    remarks: 'Outstanding performance. Keep it up.',
    generatedAt: '2025-01-10T10:00:00Z',
  },
  // Semester 3 for student 2 (Priya)
  {
    id: 'res4',
    studentId: 's2',
    semesterId: 'sem3',
    semesterName: 'Semester III',
    academicYearId: 'ay1',
    subjects: [
      { subjectId: 'sub1', subjectCode: 'CS301', subjectName: 'Data Structures & Algorithms', credits: 4, internalMarks: 35, externalMarks: 33, totalMarks: 68, maxTotalMarks: 100, percentage: 68, grade: 'B+', gradePoint: 7.0, status: 'PASS' },
      { subjectId: 'sub2', subjectCode: 'CS302', subjectName: 'Database Management Systems', credits: 4, internalMarks: 32, externalMarks: 30, totalMarks: 62, maxTotalMarks: 100, percentage: 62, grade: 'B+', gradePoint: 7.0, status: 'PASS' },
      { subjectId: 'sub3', subjectCode: 'CS303', subjectName: 'Object Oriented Programming', credits: 3, internalMarks: 28, externalMarks: 27, totalMarks: 55, maxTotalMarks: 100, percentage: 55, grade: 'B', gradePoint: 6.0, status: 'PASS' },
      { subjectId: 'sub4', subjectCode: 'CS304', subjectName: 'Computer Networks', credits: 3, internalMarks: 30, externalMarks: 28, totalMarks: 58, maxTotalMarks: 100, percentage: 58, grade: 'B', gradePoint: 6.0, status: 'PASS' },
      { subjectId: 'sub5', subjectCode: 'CS305', subjectName: 'DBMS Laboratory', credits: 2, internalMarks: 40, externalMarks: 38, totalMarks: 78, maxTotalMarks: 100, percentage: 78, grade: 'A', gradePoint: 8.0, status: 'PASS' },
      { subjectId: 'sub6', subjectCode: 'CS306', subjectName: 'OOP Laboratory', credits: 2, internalMarks: 38, externalMarks: 35, totalMarks: 73, maxTotalMarks: 100, percentage: 73, grade: 'A', gradePoint: 8.0, status: 'PASS' },
    ],
    totalMarks: 394,
    maximumMarks: 600,
    percentage: 65.67,
    gpa: 6.89,
    cgpa: 6.89,
    status: 'PASS',
    strongestSubject: 'DBMS Laboratory',
    weakestSubject: 'Object Oriented Programming',
    generatedAt: '2025-01-10T10:00:00Z',
  },
  // Semester 3 for student 3 (Rohit) - with arrear
  {
    id: 'res5',
    studentId: 's3',
    semesterId: 'sem3',
    semesterName: 'Semester III',
    academicYearId: 'ay1',
    subjects: [
      { subjectId: 'sub1', subjectCode: 'CS301', subjectName: 'Data Structures & Algorithms', credits: 4, internalMarks: 18, externalMarks: 16, totalMarks: 34, maxTotalMarks: 100, percentage: 34, grade: 'F', gradePoint: 0.0, status: 'FAIL' },
      { subjectId: 'sub2', subjectCode: 'CS302', subjectName: 'Database Management Systems', credits: 4, internalMarks: 32, externalMarks: 28, totalMarks: 60, maxTotalMarks: 100, percentage: 60, grade: 'B+', gradePoint: 7.0, status: 'PASS' },
      { subjectId: 'sub3', subjectCode: 'CS303', subjectName: 'Object Oriented Programming', credits: 3, internalMarks: 22, externalMarks: 20, totalMarks: 42, maxTotalMarks: 100, percentage: 42, grade: 'C', gradePoint: 5.0, status: 'PASS' },
      { subjectId: 'sub4', subjectCode: 'CS304', subjectName: 'Computer Networks', credits: 3, internalMarks: 20, externalMarks: 18, totalMarks: 38, maxTotalMarks: 100, percentage: 38, grade: 'F', gradePoint: 0.0, status: 'FAIL' },
      { subjectId: 'sub5', subjectCode: 'CS305', subjectName: 'DBMS Laboratory', credits: 2, internalMarks: 38, externalMarks: 35, totalMarks: 73, maxTotalMarks: 100, percentage: 73, grade: 'A', gradePoint: 8.0, status: 'PASS' },
      { subjectId: 'sub6', subjectCode: 'CS306', subjectName: 'OOP Laboratory', credits: 2, internalMarks: 35, externalMarks: 32, totalMarks: 67, maxTotalMarks: 100, percentage: 67, grade: 'B+', gradePoint: 7.0, status: 'PASS' },
    ],
    totalMarks: 314,
    maximumMarks: 600,
    percentage: 52.33,
    gpa: 4.06,
    cgpa: 4.06,
    status: 'ARREAR',
    strongestSubject: 'DBMS Laboratory',
    weakestSubject: 'Data Structures & Algorithms',
    remarks: 'Two subjects need improvement. Supplementary exam scheduled.',
    generatedAt: '2025-01-10T10:00:00Z',
  },
  // Semester 3 for student 8 (Meera)
  {
    id: 'res6',
    studentId: 's8',
    semesterId: 'sem3',
    semesterName: 'Semester III',
    academicYearId: 'ay1',
    subjects: [
      { subjectId: 'sub1', subjectCode: 'CS301', subjectName: 'Data Structures & Algorithms', credits: 4, internalMarks: 42, externalMarks: 40, totalMarks: 82, maxTotalMarks: 100, percentage: 82, grade: 'A+', gradePoint: 9.0, status: 'PASS' },
      { subjectId: 'sub2', subjectCode: 'CS302', subjectName: 'Database Management Systems', credits: 4, internalMarks: 38, externalMarks: 40, totalMarks: 78, maxTotalMarks: 100, percentage: 78, grade: 'A', gradePoint: 8.0, status: 'PASS' },
      { subjectId: 'sub3', subjectCode: 'CS303', subjectName: 'Object Oriented Programming', credits: 3, internalMarks: 35, externalMarks: 33, totalMarks: 68, maxTotalMarks: 100, percentage: 68, grade: 'B+', gradePoint: 7.0, status: 'PASS' },
      { subjectId: 'sub4', subjectCode: 'CS304', subjectName: 'Computer Networks', credits: 3, internalMarks: 36, externalMarks: 34, totalMarks: 70, maxTotalMarks: 100, percentage: 70, grade: 'A', gradePoint: 8.0, status: 'PASS' },
      { subjectId: 'sub5', subjectCode: 'CS305', subjectName: 'DBMS Laboratory', credits: 2, internalMarks: 46, externalMarks: 44, totalMarks: 90, maxTotalMarks: 100, percentage: 90, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub6', subjectCode: 'CS306', subjectName: 'OOP Laboratory', credits: 2, internalMarks: 44, externalMarks: 42, totalMarks: 86, maxTotalMarks: 100, percentage: 86, grade: 'A+', gradePoint: 9.0, status: 'PASS' },
    ],
    totalMarks: 474,
    maximumMarks: 600,
    percentage: 79,
    gpa: 8.44,
    cgpa: 8.44,
    status: 'PASS',
    strongestSubject: 'DBMS Laboratory',
    weakestSubject: 'Object Oriented Programming',
    generatedAt: '2025-01-10T10:00:00Z',
  },
  // Semester 3 for student 10 (Deepika)
  {
    id: 'res7',
    studentId: 's10',
    semesterId: 'sem3',
    semesterName: 'Semester III',
    academicYearId: 'ay1',
    subjects: [
      { subjectId: 'sub1', subjectCode: 'CS301', subjectName: 'Data Structures & Algorithms', credits: 4, internalMarks: 48, externalMarks: 49, totalMarks: 97, maxTotalMarks: 100, percentage: 97, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub2', subjectCode: 'CS302', subjectName: 'Database Management Systems', credits: 4, internalMarks: 46, externalMarks: 47, totalMarks: 93, maxTotalMarks: 100, percentage: 93, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub3', subjectCode: 'CS303', subjectName: 'Object Oriented Programming', credits: 3, internalMarks: 44, externalMarks: 43, totalMarks: 87, maxTotalMarks: 100, percentage: 87, grade: 'A+', gradePoint: 9.0, status: 'PASS' },
      { subjectId: 'sub4', subjectCode: 'CS304', subjectName: 'Computer Networks', credits: 3, internalMarks: 42, externalMarks: 41, totalMarks: 83, maxTotalMarks: 100, percentage: 83, grade: 'A+', gradePoint: 9.0, status: 'PASS' },
      { subjectId: 'sub5', subjectCode: 'CS305', subjectName: 'DBMS Laboratory', credits: 2, internalMarks: 50, externalMarks: 48, totalMarks: 98, maxTotalMarks: 100, percentage: 98, grade: 'O', gradePoint: 10.0, status: 'PASS' },
      { subjectId: 'sub6', subjectCode: 'CS306', subjectName: 'OOP Laboratory', credits: 2, internalMarks: 49, externalMarks: 48, totalMarks: 97, maxTotalMarks: 100, percentage: 97, grade: 'O', gradePoint: 10.0, status: 'PASS' },
    ],
    totalMarks: 555,
    maximumMarks: 600,
    percentage: 92.5,
    gpa: 9.72,
    cgpa: 9.72,
    status: 'PASS',
    strongestSubject: 'DBMS Laboratory',
    weakestSubject: 'Computer Networks',
    generatedAt: '2025-01-10T10:00:00Z',
  },
];

// ─── AUDIT LOGS ───────────────────────────────────────────────────────────────
export const auditLogs: AuditLog[] = [
  { id: 'al1', userId: 'u2', userName: 'Dr. Ramesh Kumar', action: 'MARKS_ENTERED', entity: 'Mark', entityId: 'sub1', newValue: 'CS301 marks entered for CSE 2nd Year A', ipAddress: '192.168.1.10', createdAt: '2025-01-10T09:00:00Z' },
  { id: 'al2', userId: 'u2', userName: 'Dr. Ramesh Kumar', action: 'MARKS_UPDATED', entity: 'Mark', entityId: 'sub2', oldValue: 'Internal: 40', newValue: 'Internal: 43', ipAddress: '192.168.1.10', createdAt: '2025-01-10T10:30:00Z' },
  { id: 'al3', userId: 'u1', userName: 'Admin User', action: 'RESULT_GENERATED', entity: 'Result', entityId: 'res3', newValue: 'Semester III result generated for Arjun Krishnamurthy', ipAddress: '192.168.1.1', createdAt: '2025-01-10T11:00:00Z' },
  { id: 'al4', userId: 'u1', userName: 'Admin User', action: 'STUDENT_CREATED', entity: 'Student', entityId: 's10', newValue: 'New student Deepika Reddy added', ipAddress: '192.168.1.1', createdAt: '2025-01-08T09:00:00Z' },
  { id: 'al5', userId: 'u1', userName: 'Admin User', action: 'SUBJECT_CREATED', entity: 'Subject', entityId: 'sub1', newValue: 'CS301 Data Structures & Algorithms added to Semester III', ipAddress: '192.168.1.1', createdAt: '2025-01-05T10:00:00Z' },
  { id: 'al6', userId: 'u1', userName: 'Admin User', action: 'TEACHER_ASSIGNED', entity: 'Teacher', entityId: 't1', newValue: 'Dr. Ramesh Kumar assigned to CS301, CS302 for CSE 2nd Year A', ipAddress: '192.168.1.1', createdAt: '2025-01-04T11:00:00Z' },
  { id: 'al7', userId: 'u2', userName: 'Dr. Ramesh Kumar', action: 'MARKS_ENTERED', entity: 'Mark', entityId: 'sub3', newValue: 'CS303 marks entered for CSE 2nd Year A', ipAddress: '192.168.1.10', createdAt: '2025-01-09T09:30:00Z' },
  { id: 'al8', userId: 'u1', userName: 'Admin User', action: 'STUDENT_DEACTIVATED', entity: 'Student', entityId: 's9', newValue: 'Akash Singh deactivated', ipAddress: '192.168.1.1', createdAt: '2025-01-03T14:00:00Z' },
];

// ─── HELPER LOOKUPS ───────────────────────────────────────────────────────────
export function getDepartmentById(id: string): Department | undefined {
  return departments.find((d) => d.id === id);
}

export function getAcademicYearById(id: string): AcademicYear | undefined {
  return academicYears.find((a) => a.id === id);
}

export function getSemesterById(id: string): Semester | undefined {
  return semesters.find((s) => s.id === id);
}

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function getStudentById(id: string): Student | undefined {
  return students.find((s) => s.id === id);
}

export function getTeacherById(id: string): Teacher | undefined {
  return teachers.find((t) => t.id === id);
}

export function getResultsByStudentId(studentId: string): Result[] {
  return results.filter((r) => r.studentId === studentId);
}

export function getResultsByStudentAndSemester(studentId: string, semesterId: string): Result | undefined {
  return results.find((r) => r.studentId === studentId && r.semesterId === semesterId);
}

export function getSubjectsBySemester(semesterId: string): Subject[] {
  return subjects.filter((s) => s.semesterId === semesterId);
}

export function getStudentsByDepartment(departmentId: string): Student[] {
  return students.filter((s) => s.departmentId === departmentId);
}

// Dashboard stats
export const dashboardStats = {
  totalStudents: students.length,
  activeStudents: students.filter((s) => s.status === 'ACTIVE').length,
  totalTeachers: teachers.length,
  departments: departments.length,
  subjects: subjects.length,
  currentAcademicYear: '2024–25',
  averageGPA: 7.84,
  passRate: 76.5,
  arrearCount: 2,
};
