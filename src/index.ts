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