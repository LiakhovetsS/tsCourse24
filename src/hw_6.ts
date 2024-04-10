interface IUnion {
  [key: string]: number | string;
}

interface IFunction {
  [key: string]: (...args: string[]) => void;
  [key: symbol]: (...args: number[]) => number;
  [key: number]: (...args: string[]) => string[];
}

interface IArray {
  [key: number]: string;
}
const arrayObj:IArray={
    0:'1',
    1:'2',
    2:'3',
    3:'4'
}

interface IIdentifierNumber {
  [key: string]: number;
  [key: number]: number;
  name: number;
}
interface IIdentifierString {
  [key: string]: string;
  [key: number]: string;
  name: string;
}

interface IBase {
  [key: string]: string;
}

interface IExtended extends IBase {
  fullName: string;
}


function checkProp(obj: IUnion, criteria: string): boolean | never {
    for (let key in obj) {
      if (typeof obj[key] !== criteria) throw new Error(`property: ${key} is not ${criteria}`);
    }
    return true;
  }

  const testObj: IUnion = {
    a: 1,
    b: "two",
    c: 3,
  };
  checkProp(testObj, "number");