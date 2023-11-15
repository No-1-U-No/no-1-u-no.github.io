// Ball OOP Demo

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(15, 30);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  move() {
    if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
      this.dx *= -1;
    }

    else if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  display() {
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, 2*this.radius);
  }

  bounceOff(otherBall) {
    let radiiSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);

    if (radiiSum > distanceApart) {
      //balls hitting each other
      let tempX = this.dx;
      let tempY = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;

      otherBall.dx = tempX;
      otherBall.dy = tempY;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  let ball = new Ball(width/2, height/2);
  ballArray.push(ball);
}

function draw() {
  background(220);
  for (let currentBall of ballArray) {
    currentBall.move();

    for (let otherBall of ballArray) {
      //avoid checking if hitting self
      if (currentBall !== otherBall) {
        currentBall.bounceOff(otherBall);
      }
    }

    currentBall.display();
  }
}

function mousePressed() {
  let ball = new Ball(mouseX, mouseY);
  ballArray.push(ball);
}