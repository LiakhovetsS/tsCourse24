interface IShape {
  readonly name: string;
  readonly color: string;
  calculateArea(): number;
}
interface ICircle extends IShape {
  radius: number;
}
interface ICornerShape extends IShape {
  width: number;
  height: number;
}

interface IRectangle extends ICornerShape {
  print(): string;
}

abstract class AbstractShape implements IShape {
  public abstract name: string;
  public abstract color: string;
  public constructor(name: string, color: string) {}
  public abstract calculateArea(): number;
}

class Circle extends AbstractShape implements ICircle {
  public readonly name: string;
  public readonly color: string;
  private _radius: number;
  constructor(name: string, radius: number, color: string) {
    super(name, color);
    this._radius = radius;
    this.name = name;
    this.color = color;
  }
  get radius(): number {
    return this._radius;
  }

  override calculateArea(): number {
    return Math.PI * this.radius;
  }
}

class Triangle extends AbstractShape implements ICornerShape {
  public readonly name: string;
  public readonly color: string;
  public width: number;
  public height: number;
  constructor(name: string, color: string, width: number, height: number) {
    super(name, color);
    this.name = name;
    this.color = color;
    this.width = width;
    this.height = height;
  }
  override calculateArea(): number {
    return (this.height * this.width) / 2;
  }
}

class Rectangle extends AbstractShape implements IRectangle {
  public readonly name: string;
  public readonly color: string;
  public width: number;
  public height: number;
  constructor(name: string, color: string, width: number, height: number) {
    super(name, color);
    this.name = name;
    this.color = color;
    this.width = width;
    this.height = height;
  }
   override calculateArea(): number {
    return this.height * this.width;
  }
  print(): string {
    return `${this.height} * ${this.width}`;
  }
}

class Square extends Rectangle implements IRectangle {
    public readonly name: string;
    public readonly color: string;
    public width: number;
    public height: number;
    constructor(name: string, color: string, width: number, height: number) {
      super(name, color, width, height);
      this.name = name;
      this.color = color;
      this.width = width;
      this.height = height;
    }
}
