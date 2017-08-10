class Ball {
  constructor(dom, velocity, weight, radius, x = 1, y = 1) {
    if (radius <= 0) {
      this._radius = 1;
    } else {
      this._radius = radius;
    }

    this._x = x;
    this._y = y;
    this._velocity = velocity;
    this._weight = weight;

    dom.innerHTML += this.getHtml();
  }

  move() {
    this._x += this._velocity.x;
    this._y += this._velocity.y;
  }

  getHtml() { return `<div class="ball"></div>`; }

  get radius() { return this._radius; }

  get x() { return this._x; }
  set x(value) { this._x = value; }

  get y() { return this._y; }
  set y(value) { this._y = value; }

  get velocity() { return this._velocity; }
  set velocity(value) { this._velocity = value; }

  get weight() { return this._weight; }
  set weight(value) { this._weight = value; }
}