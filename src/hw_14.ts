//Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів.
//Дефолтні та такі, які вимагають підтвердження при ридагуванні.
enum TaskStatusEnum {
  DEFAULT,
  CONFIRM,
}
type TaskType = {
  name: string;
  description: string;
  status: TaskStatusEnum;
};

class Task {
  public readonly id: number;
  public readonly createdDate: Date;
  public updatedDate: Date;
  public name: string;
  public description: string;
  public status: TaskStatusEnum;
  public completed: boolean;
  constructor(task: TaskType) {
    if (!task.name) throw new Error(`Field "Name" cannot be empty`);
    if (!task.description)
      throw new Error(`Field "description" cannot be empty`);
    this.id = Math.random();
    this.name = task.name;
    this.description = task.description;
    this.status = task.status;
    this.createdDate = new Date();
    this.updatedDate = new Date();
    this.completed = false;
  }
  public update(description: string): Task {
    this.confirmed();
    this.description = description;
    this.updatedDate = new Date();
    return this;
  }
  public markCompleted(): Task {
    this.confirmed();
    this.completed = true;
    this.updatedDate = new Date();
    return this;
  }
  private confirmed(): void {
    if (this.status === TaskStatusEnum.CONFIRM) {
      console.log(`Confirm editing note!`);
    }
  }
}
//Вам необхідно написати додаток Todo list.
//У списку нотаток повинні бути методи для додавання нового запису, видалення, редагування та отримання повної інформації про нотатку за ідентифікатором,
//а так само отримання списку всіх нотаток.
abstract class App {
  /**
   * addTask
   */
  public abstract add(
    name: string,
    description: string,
    status: TaskStatusEnum
  ): Task;
  /**
   * remove
   */
  public abstract remove(id: number): boolean | never;
  /**
   * edit
   */
  public abstract edit(id: number, description: string): Task | never;
  /**
   * getAllTasks
   */
  public abstract getAllTasks(): Task[];
  /**
   * getTaskById
   */
  public abstract getTaskById(id: number): Task | never;

  /**
   * getCountTask
   */
  public abstract getCountTask(): number;
  /**
   * uncomplitedCount
   */
  public abstract uncomplitedCount(): number;
  /**
   * markCompleted
   */
  public abstract markCompleted(id: number): Task | never;
}

interface ITodoSort {
  sortByStatus(): Task[];
  sortByCreationTime(): Task[];
}
interface ITodoFilter {
  searchTask(query: string): Task[];
}

type TaskList = Map<number, Task>;
type listFromMap = {
  name: string;
  value: Task;
};

class TodoList extends App {
  private list: TaskList = new Map();

  public add(
    name: string,
    description: string,
    status: TaskStatusEnum = TaskStatusEnum.DEFAULT
  ): Task {
    const task = new Task({ name, description, status });
    this.list.set(task.id, task);
    return task;
  }

  public getCountTask(): number {
    return this.list.size;
  }

  public uncomplitedCount(): number {
    const taskListArray: Task[] = this.getListFromMap();
    return this.filterMethod(
      taskListArray,
      (task: Task) => task.completed === false
    ).length;
  }

  public remove(id: number): boolean | never {
    this.chekTask(id);
    return this.list.delete(id);
  }

  public edit(id: number, description: string): Task | never {
    this.chekTask(id);
    const task = this.list.get(id) as Task;
    task.update(description);
    return task;
  }

  public getAllTasks(): Task[] {
    return this.getListFromMap();
  }

  public getTaskById(id: number): Task | never {
    this.chekTask(id);
    return this.list.get(id) as Task;
  }

  public markCompleted(id: number): Task | never {
    this.chekTask(id);
    const task = this.list.get(id) as Task;
    task.markCompleted();
    return task;
  }

  protected getListFromMap(): Task[] {
    return Array.from(this.list.values());
  }

  protected sortMethod<T>(list: T[], condition: (a: T, b: T) => number): T[] {
    return list.sort(condition);
  }
  protected filterMethod<T>(list: T[], condition: (item: T) => boolean): T[] {
    return list.filter(condition);
  }
  private chekTask(id: number): boolean | never {
    if (!this.list.has(id)) {
      throw new Error(`Task: ${id} not found!`);
    }
    return true;
  }
}

class TODOListWithFilter extends TodoList implements ITodoFilter {
  constructor() {
    super();
  }
  public searchTask(query: string): Task[] {
    const taskListArray: Task[] = super.getListFromMap();
    return super.filterMethod(
      taskListArray,
      (task: Task) =>
        task.name.includes(query) || task.description.includes(query)
    );
  }
}
class TODOListWithSort extends TodoList implements ITodoSort{
  constructor(){
    super();
  }
  public sortByStatus(): Task[] {
    const taskListArray: Task[] = super.getListFromMap();
    return super.sortMethod(taskListArray, (a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
  }

  public sortByCreationTime(): Task[] {
    const taskListArray: Task[] = super.getListFromMap();
    return super.sortMethod(
      taskListArray,
      (a, b) => a.createdDate.getTime() - b.createdDate.getTime()
    );
  }
}∏

const myToDOList = new TodoList();
myToDOList.add("HW 14", "Test", TaskStatusEnum.DEFAULT);
const listTask = myToDOList.getAllTasks();

const myToDoListSort = new TODOListWithSort();
myToDOList.add("HW 14", "My sort list", TaskStatusEnum.CONFIRM);
myToDoListSort.sortByCreationTime();

const myToDoListFilter = new TODOListWithFilter();
myToDoListFilter.add("HW 14", "My filter list", TaskStatusEnum.CONFIRM);
myToDoListFilter.add("HW 14.1", "My HW with filter list 1", TaskStatusEnum.DEFAULT);
myToDoListFilter.searchTask('HW');