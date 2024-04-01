class School {
  private _area: Area[] = [];
  private _lectutets: Lecturer[] = [];

  addArea(area: Area): void {
    this._area.push(area);
  }

  removeArea(name: string): boolean {
    const areaIndex: number = this._area.findIndex(
      (i: Area) => i.name === name
    );
    if (areaIndex === -1) return false;
    this._area.splice(areaIndex, 1);
    return true;
  }

  addLecturer(lecturer: Lecturer): void {
    this._lectutets.push(lecturer);
  }

  removeLecturer(fullName: string): boolean {
    const lecturerIndex: number = this._lectutets.findIndex(
      (i: Lecturer) => i.fullName === fullName
    );
    if (lecturerIndex === -1) return false;
    this._lectutets.splice(lecturerIndex, 1);
    return true;
  }
}

class Lecturer {
  private _name: string;
  private _surname: string;
  private _position: string;
  private _contacts: number;
  private _company: string = "";
  private _experience: number = 0;
  private _courses: string[] = [];
  constructor(
    name: string,
    surname: string,
    position: string,
    contacts: number
  ) {
    this._name = name;
    this._surname = surname;
    this._position = position;
    this._contacts = contacts;
  }
  get position(): string {
    return this._position;
  }
  get fullName(): string {
    return `${this._surname} ${this._name}`;
  }

  set fullName(value: string) {
    [this._surname, this._name] = value.split(" ");
  }

  get company(): string {
    return this._company;
  }

  set company(value: string) {
    this._company = value;
  }

  get experience(): number {
    return this._experience;
  }
  set experience(value: number) {
    this._experience = value;
  }

  addCourse(course: string) {
    this._courses.push(course);
  }
}

class Area {
  private _levels: Level[] = [];
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }
  addLevel(level: Level): void {
    this._levels.push(level);
  }
  removeLevel(name: string): boolean {
    const levelIndex: number = this._levels.findIndex(
      (i: Level) => i.name === name
    );
    if (levelIndex === -1) return false;
    this._levels.splice(levelIndex, 1);
    return true;
  }
}

class Level {
  private _groups: Group[] = [];
  private _name: string;
  private _description: string;
  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  addGroup(group: Group) {
    this._groups.push(group);
  }
  removeGroup(directionName: string): boolean {
    const groupIndex: number = this._groups.findIndex(
      (i: Group) => i.directionName === directionName
    );
    if (groupIndex === -1) return false;
    this._groups.splice(groupIndex, 1);
    return true;
  }
}

class Group {
  private _area: Area[] = [];
  private _status: any;
  private _students: Student[] = [];
  directionName: string;
  levelName: string;
  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  setStatus(status: any): void {
    this._status.push(status);
  }

  addStudents(student: Student): void {
    this._students.push(student);
  }

  removeStudent(fullName: string): boolean {
    const _studentIndex: number = this._students.findIndex(
      (i: Student) => i.fullName === fullName
    );
    if (_studentIndex === -1) return false;
    this._students.splice(_studentIndex, 1);
    return true;
  }
  showPerformance(): Student[] {
    return this._students.toSorted(
      (a: Student, b: Student) =>
        b.getPerformanceRating() - a.getPerformanceRating()
    );
  }
}

class Lesson {
    private _lesson:string;
    constructor(name:string){
        this._lesson=name;
    }
    get lesson():string{
        return this._lesson;
    }
}

class Grade {
    workName:string;
    grade:number;
    constructor(workName:string, grade:number){
        this.grade=grade;
        this.workName=workName;
    }

}

class Student {
  private _firstName: string;
  private _lastName: string;
  private _birthYear: number;
  private _grades: Grade[]=[];
  private _visits: Lesson[] = [];
  constructor(firstName: string, lastName: string, birthYear: number) {
    this._birthYear = birthYear;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setVisit(present: Lesson): void {
    this._visits.push(present);
  }

  setGrade(grade:Grade): void {
    this._grades.push(grade);
  }

  getPerformanceRating(): number {
    if (!this._grades.length) return 0;

    const averageGrade: number =
    this._grades.reduce((sum: number, grade: Grade) => sum + grade.grade, 0) /
    this._grades.length;

    const attendancePercentage: number =
      (this._visits.filter((present: Lesson) => present).length /
        this._visits.length) *
      100;
    return (averageGrade + attendancePercentage) / 2;
  }
}
