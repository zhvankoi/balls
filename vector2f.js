class Vector2f {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get x() { return this._x; }
  set x(value) { this._x = value; }

  get y() { return this._y; }
  set y(value) { this._y = value; }

  get length() {
    return Math.sqrt(this._x * this._x + this._y * this._y);
  }

  add(vector) {
    return new Vector2f(this.x + vector.x, this.y + vector.y);
  }

  multiply(number) {
    return new Vector2f(this.x * number, this.y * number);
  }

  toString() {
    return `[${this.x}; ${this.y}]`;
  }
}