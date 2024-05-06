//1.Generics

function filterArray<T>(list: T[], condition: (item: T) => boolean): T[] {
  return list.filter(condition);
}

class Stack<T> {
  private list: T[];
  constructor(list: T[]) {
    this.list = list;
  }
  public push(item: T): void {
    this.list.push(item);
  }
  public pop(): T | undefined {
    return this.list.pop();
  }
  public peek(): T | undefined {
    return this.list[this.list.length - 1];
  }
}

type Keys = string | number | symbol;

type MapedType<K extends Keys, V> = {
  [key in K]?: V;
};

class Dictionary<K extends Keys, V> {
  private list: MapedType<K, V> = {};

  public set(key: K, value: V): void {
    this.list[key] = value;
  }
  public get(key: K): V | undefined {
    return this.list[key];
  }
  public has(key: K): boolean {
    return key in this.list;
  }
}

//2.

type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
};

type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: DeepRequireReadonly<T[K]>;
};

type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

type ObjectToPropertyDescriptor<T extends { [key: string]: any }> = {
  [K in keyof T]: PropertyDescriptor;
};

interface ICar {
  name: string;
  number: number;
  vibe: {
    radio: string;
    BT: boolean;
  };
  scope: string[];
}

let car: DeepReadonly<ICar>;
car.name = "Skoda";
car.vibe.radio = "FM";
car.scope[0] = "tank";
