class Ball {
  constructor(x, y, radius, density = 1) {
    if (radius <= 0) {
      this._radius = 1;
    } else {
      this._radius = radius;
    }

    this._x = x;
    this._y = y;
    this._velocity = new Vector2f(0, 0);
    this._density = density;
  }

  move() {
    this._x += this._velocity.x;
    this._y += this._velocity.y;
  }

  setVelocity(dx, dy) {
    this._velocity.x = dx;
    this._velocity.y = dy;
  }

  get radius() { return this._radius; }

  get x() { return this._x; }
  set x(value) { this._x = value; }

  get y() { return this._y; }
  set y(value) { this._y = value; }

  get velocity() { return this._velocity; }
  set velocity(value) { this._velocity = value; }

  get speed() { return this._velocity.length; }

  get weight() { return MathHelper.sphereVolume(this._radius) * this._density; }
}