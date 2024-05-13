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

class ClassType {}
interface InterfaceType {}

type TypeAlias = number;

declare let typeInterface: InterfaceType;
declare let typeTypeAlias: TypeAlias;

let a = { a: 5, b: 'text', c: true }; // a: number, b:string, c: boolean}
const b = { a: 5, b: 'text', c: true }; // {a: number, b: string, c: boolean}

let c = new ClassType(); // ClassType
let d = typeInterface; // InterfaceType
let e = typeTypeAlias; // number

let x = [42, 'Hello', true]; // (string | number | boolean)[]
let element = x[0]; // string | number | boolean | undefined


class A {}
class B extends A {
  a = 42;
}
class C extends A {
  a = 'Hello';
}
class D extends A {
  a = true;
}
class E extends D {
  b = {};
}

let as = false ? new A() : new B(); // A
let bs = false ? new B() : new C(); // B | C
let cs = false ? new E() : new D(); // D
function f(...rest: [number, string?, boolean?]): [number, string?, boolean?] {
  return rest;
}

let xs = f(42).length; // 1 | 2 | 3

function tuple<T extends any[]>(...args: T): T {
  return args;
}

const numbers: number[] = [0, 1, 2];
const sa = tuple(42, 'Hello', true); // [number, string, boolean]
let ss = tuple(42, ...numbers); // [number, ...number[]]
let sc = tuple(42, ...numbers, 'Hello'); // [number, ...number[], string]

interface ClassDecoratorContext {
  readonly kind: 'class';
  readonly name: string | undefined;
  readonly metadata: DecoratorMetadata;
  addInitializer(initializer: () => void): void;
}

// Legacy
//type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

interface IRocketTank {
  tankVolume: number;
  isReadyForCheck(): boolean;
  isReadyForLaunch(): boolean;
}

type Constructor<T = {}> = new (...args: any[]) => T;

function WithTank<T extends Constructor>(originalClass: T, context: ClassDecoratorContext<T>) {
  if (context.kind !== 'class') throw new Error('Class-only decorator');

  class ReplacementClass extends originalClass implements IRocketTank {
    public tankVolume = 100;

    public isReadyForCheck(): boolean {
      return this.tankVolume > 0;
    }

    public isReadyForLaunch(): boolean {
      return this.tankVolume === 100;
    }
  }

  return ReplacementClass;
}

@WithTank
class Rocket {
  public fuel = 75;

  public checkForStart(): boolean {
    return this.fuel !== 0;
  }
}

const rocket = new Rocket() as Rocket & IRocketTank;

console.log(rocket.tankVolume); // 100
console.log(`Is ready for launch? ${rocket.isReadyForLaunch()}`);
