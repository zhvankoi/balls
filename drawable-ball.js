class DrawableBall {
  constructor(dom, ball, color) {
    this._color = color;
    this._ball = ball;
    this._dom = dom;
    this._element = null;
  }

  get ball() { return this._ball; }
  get color() { return this._color; }

  draw() {
    if (this._element === null) {
      this._element = this.createElement();
      this._element.style.width = this._ball.radius * 2 + 'px';
      this._element.style.height = this._ball.radius * 2 + 'px';
      this._element.style.borderRadius = this._ball.radius + 'px';
      this._element.style.backgroundColor = this._color;
      this._dom.appendChild(this._element);
    }

    this._element.style.left = this._ball.x - this._ball.radius + 'px';
    this._element.style.top = this._ball.y - this._ball.radius + 'px';

  }

  createElement() {
    let element = document.createElement('div');
    element.setAttribute('class', 'ball');
    return element;
  }
}