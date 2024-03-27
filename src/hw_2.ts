class School {
  directions: any = [];

  addDirection(direction: any): void {
    this.directions.push(direction);
  }
}

class Direction {
  levels: any = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
  addLevel(level: any): void {
    this.levels.push(level);
  }
}

class Level {
  groups: any = [];
  private _name: string;
  private _program: string;

  constructor(name: string, program: string) {
    this._name = name;
    this._program = program;
  }

  get name(): string {
    return this._name;
  }
  get program(): string {
    return this._program;
  }
  addGroup(group: any): void {
    this.groups.push(group);
  }
}

class Group {
  private _students: any = [];
  levelName: string;
  directionName: string;
  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }
  get students(): any {
    return this._students;
  }
  addStudent(student: any): void {
    this._students.push(student);
  }
  showPerformance(): any {
    return this.students.toSorted(
      (a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating()
    );
  }
}

class Student {
  grades: any = {};
  attendance: any = [];
  firstName: string;
  lastName: string;
  birthYear: number;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }
  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }
  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(" ");
  }
  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }
  setGrade(subject: string, grade: any): void {
    this.grades[subject] = grade;
  }
  markAttendance(present: any): void {
    this.attendance.push(present);
  }
  getPerformanceRating(): number {
    const gradeValues: any = Object.values(this.grades);
    if (gradeValues.length === 0) return 0;
    const averageGrade =
      gradeValues.reduce((sum: number, grade: number) => sum + grade, 0) /
      gradeValues.length;
    const attendancePercentage: number =
      (this.attendance.filter((present: any) => present).length /
        this.attendance.length) *
      100;
    return (averageGrade + attendancePercentage) / 2;
  }
}
