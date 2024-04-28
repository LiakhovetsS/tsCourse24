type ValidPortValue = 80 | 42;

const port80: number = 80;
const port42: number = 42;

function start(port: ValidPortValue): void {
	// блок if повідомить про помилку тільки під час виконання
  if (port !== port80 || port !== port42) {
    throw new Error(`port #${port} is not valid.`);
  }
}

// start(81);

const animalData: string[] = new Array(); // Ok
const elephantData: string[] = new Array('Dambo'); // Ok
let lionData: (string | number)[];

// lionData = new Array('Simba', 1); // Error
lionData = new Array('Simba'); // Ok
lionData = new Array(1); // Ok

const deerData: (string | number)[] = new Array<string | number>('Bambi', 1); // Ok

const testArray:readonly [number, string] = [10, 'test'];
// testArray.push('test') 

// interface IUser {
//   name: string;
// }

// class User {
//   public name!: string;
// }

// class Admin {
//   public name!: string;
//   public age!: number;
// }

// class Guest {}

// const equal: User = new User();
// const more: Admin = new Admin();
// const less: Guest = new Guest();


// const a: IUser = new User(); // Ok -> однакові поля
// const b: IUser = new Admin(); // Ok -> у Admin полів більше
// const c: IUser = new Guest(); // Error -> обов'язкові поля відсутні
// const d: IUser = equal; // Ok -> однакові поля
// const e: IUser = more; // Ok -> у Admin полів більше
// const f: IUser = less; // Error -> обов'язкові поля відсутні

// function foo(_p1: IUser): void {}

// foo(new User()); // Ok -> однакові поля
// foo(new Admin()); // Ok -> у Admin полів більше
// foo(new Guest()); // Error -> обов'язкові поля відсутні

// foo(equal); // Ok -> однакові поля
// foo(more); // Ok -> у Admin полів більше
// foo(less); // Error -> обов'язкові поля відсутні

class User {
  public name!: string;
  public age!: number;
}

const user = new User();

let type: typeof user; // type: { name: string; age: number; }
let union: keyof typeof user; // union: 'name' | 'age'