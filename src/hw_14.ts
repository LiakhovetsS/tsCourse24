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
  public add(name: string, description: string, status: TaskStatusEnum) {}
  /**
   * remove
   */
  public remove(id: number) {}
  /**
   * edit
   */
  public edit(id: number, description: string) {}
  /**
   * getAllTasks
   */
  public getAllTasks() {}
  /**
   * getTaskById
   */
  public getTaskById(id: number) {}

  /**
   * getCountTask
   */
  public getCountTask() {}
  /**
   * uncomplitedCount
   */
  public uncomplitedCount() {}
  /**
   * markCompleted
   */
  public markCompleted(id: number) {}
}

interface IAdditionalMethods {
  searchTask(query: string): Task[];
  sortByStatus():Task[];
  sortByCreationTime():Task[];
}

type TaskList = Map<number, Task>;
type listFromMap ={
  name:string,
  value:Task
};

class TodoList extends App  implements IAdditionalMethods{
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

  public uncomplitedCount() {
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

  public searchTask(query: string): Task[] {
    const taskListArray: Task[] = this.getListFromMap();
    return this.filterMethod(
      taskListArray,
      (task: Task) =>
        task.name.includes(query) || task.description.includes(query)
    );
  }

  public sortByStatus(): Task[] {
    const taskListArray: Task[] = this.getListFromMap();
    return this.sortMethod(taskListArray, (a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
  }

  public sortByCreationTime(): Task[] {
    const taskListArray: Task[] = this.getListFromMap();
    return this.sortMethod(
      taskListArray,
      (a, b) => a.createdDate.getTime() - b.createdDate.getTime()
    );
  }

  private getListFromMap(): Task[]{
      return Array.from(this.list.values())
  }

  private chekTask(id: number): boolean | never {
    if (!this.list.has(id)) {
      throw new Error(`Task: ${id} not found!`);
    }
    return true;
  }
  private filterMethod<T>(list: T[], condition: (item: T) => boolean): T[] {
    return list.filter(condition);
  }
  private sortMethod<T>(list: T[], condition: (a: T, b: T) => number): T[] {
    return list.sort(condition);
  }
}

const myToDOList = new TodoList();
myToDOList.add('HW 14', 'Test', TaskStatusEnum.DEFAULT);
myToDOList.sortByCreationTime()
const listTask = myToDOList.getAllTasks();
