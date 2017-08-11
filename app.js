class BallsAnimation {
  constructor(container) {
    this._container = container;

    let ball1 = new Ball(50, 240, 22, 4);
    let ball2 = new Ball(450, 260, 12, 4);
    ball1.setVelocity(1, 0);
    ball2.setVelocity(-1, 0);
    this._drawableBalls = [
      new DrawableBall(container, ball1, "red"),
      new DrawableBall(container, ball2, "blue")
    ];


    this._interval = 0;
  }

  start() {
    this._interval = setInterval(() => {
      this.update();
      this.render();
    }, 10);

  }

  update() {
    for (let i = 0; i < this._drawableBalls.length; ++i) {
      let firstBall = this._drawableBalls[i].ball;
      for (let j = 0; j < i; ++j) {
        let secondBall = this._drawableBalls[j].ball;
        this.collide(firstBall, secondBall);
      }
    }

    for (let drawableBall of this._drawableBalls) {
      let ball = drawableBall.ball;
      //left
      if (ball.x - ball.radius <= 0) {
        console.log(ball.x + ' --- ' + ball.radius);
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

  render() {
    for (let i = 0; i < this._drawableBalls.length; ++i) {
      this._drawableBalls[i].draw();
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

    console.log('First velocity: ' + first.velocity);
    console.log('Second velocity: ' + second.velocity);
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