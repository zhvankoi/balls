class BallsAnimation {
  constructor(container) {
    this._container = container;
    this._balls = [
      new Ball(container, new Vector2f(1, 0), 10, 13, 50, 240),
      new Ball(container, new Vector2f(0, 0), 10, 13, 450, 260),
      new Ball(container, new Vector2f(1, 2), 10, 13, 450, 50),
      new Ball(container, new Vector2f(-1, 3), 10, 13, 50, 450),
      new Ball(container, new Vector2f(1, 2), 10, 13, 100, 50),
      new Ball(container, new Vector2f(-1, 3), 10, 13, 100, 450)
    ];
    this.refresh();
    this._interval = 0;
  }

  start() {
    this._interval = setInterval(() => {
      this.move();
      this.refresh();
    }, 100);

  }

  move() {
    for (let i = 0; i < this._balls.length; ++i) {
      for (let j = 0; j < i; ++j) {
        this.collide(this._balls[i], this._balls[j]);
      }
    }

    for (let ball of this._balls) {
      //left
      if (ball.x - ball.radius <= 0) {
        ball.velocity.x = Math.abs(ball.velocity.x);
      }
      //right 
      else if (ball.x + ball.radius >= 500) {
        ball.velocity.x = -Math.abs(ball.velocity.x);
      }
      //top
      else if (ball.y - ball.radius <= 0) {
        ball.velocity.y = Math.abs(ball.velocity.y);
      }
      //bottom
      else if (ball.y + ball.radius >= 500) {
        ball.velocity.y = -Math.abs(ball.velocity.y);
      }
      ball.move();
    }
  }

  refresh() {
    for (let i = 0; i < this._balls.length; ++i) {
      let ball = this._balls[i];
      let ballDom = document.getElementsByClassName('ball')[i];

      ballDom.style.top = ball.y - ball.radius + 'px';
      ballDom.style.left = ball.x - ball.radius + 'px';
    }
  }

  collide(first, second) {
    let collition = false;
    let distance = MathHelper.distance(first.x, first.y, second.x, second.y);
    let minDistance = first.radius + second.radius;
    if (distance <= minDistance) {
      collition = true;
    }

    if (!collition) {
      return;
    }

    console.log('-------Collition started-------')

    let colVector = new Vector2f(second.x - first.x, second.y - first.y);
    console.log('Collition vector: ' + colVector.toString());
    let proj1 = this.projection(colVector, first.velocity);
    let proj2 = this.projection(colVector, second.velocity);

    console.log('First projection: ' + proj1);
    console.log('Second projection: ' + proj2);

    let proj1vector = colVector.multiply(proj1 / colVector.length);
    let proj2vector = colVector.multiply(proj2 / colVector.length);

    console.log('First projection vector: ' + proj1vector.toString());
    console.log('Second projection vector: ' + proj2vector.toString());

    let forwardVec1 = first.velocity.add(proj1vector.multiply(-1))
    let forwardVec2 = second.velocity.add(proj2vector.multiply(-1));

    console.log('First forward vector: ' + forwardVec1.toString());
    console.log('Second forward vector: ' + forwardVec2.toString());

    let colVelocity1 = MathHelper.collition(proj1vector, proj2vector, first.weight, second.weight);
    let colVelocity2 = MathHelper.collition(proj2vector, proj1vector, second.weight, first.weight);

    first.velocity = forwardVec1.add(colVelocity1);
    second.velocity = forwardVec2.add(colVelocity2);

    //this.stop();
  }

  projection(v1, v2) {
    return (v1.x * v2.x + v1.y * v2.y) / (v1.length);
  }

  stop() {
    clearInterval(this._interval);
  }
}

class Application {
  static init() {
    var container = document.getElementById('container');
    Application.animation = new BallsAnimation(container);
  }

  static main() {

  }

  test() {
    alert('test');
  }
}