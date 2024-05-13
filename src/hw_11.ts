//HW - 7 Умовні типи
type Types = string | number | symbol | object;
type TypeOfFunctionS<T> = T extends (...arg: Types[]) => infer D ? D : never;

function myFuncNumber(): number {
  return 31;
}
function myFuncLen(str: string): number {
  return str.length;
}

function myFuncString(): string {
  return "Hello World";
}

type TypeNumber = TypeOfFunctionS<typeof myFuncNumber>; //number
type TypeString = TypeOfFunctionS<typeof myFuncString>; //string
type TypeLen = TypeOfFunctionS<typeof myFuncLen>; //never

type TypeTyple<T> = T extends (args: infer P) => infer R
  ? [P, R]
  : never;
  type getTuple = TypeTyple<typeof myFuncLen>;
//HW - 12.

enum GridFilterTypeEnum {
  "Matching",
  "Range",
  "Values",
}

type GridFilterValue<T> = {
  type: GridFilterTypeEnum;
  filter: Extract<T, string | number>;
  filterTo?: Extract<T, string | number>;
};

type GridFilterSetValues<T> = {
  values: T[];
};

type FilterState = {
  name?: GridFilterValue<string>;
  year?: GridFilterValue<number>;
  rate?: GridFilterValue<number>;
  awards?: GridFilterSetValues<string>;
};

interface IFilm {
  readonly name: string;
  readonly year: number;
  rate: number;
  awards: string[];
}

interface IFilmCategory {
  readonly name: string;
  films: IFilm[];
}

class FilmList {
  films: IFilm[] = [];
  filters: FilterState;
  constructor(filmsList: IFilm[]) {
    this.films = filmsList;
    this.filters = {};
  }

  applySearchValue(field: keyof FilterState, value: string) {
    this.filters[field] = { type: GridFilterTypeEnum.Matching, filter: value };
  }

}
class FilmCategory implements IFilmCategory{
    name: string;
    films: IFilm[];
    filters: FilterState;
    constructor(category: string, films:IFilm[]) {
        this.films = films;
        this.name = category;
        this.filters = {};
      }

      applySearchValue(field: keyof FilterState, value: string) {
        this.filters[field] = { type:  GridFilterTypeEnum.Matching, filter: value };
      }

}
