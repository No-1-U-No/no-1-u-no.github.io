// Ball Object Notation Demo
// Oct 5, 2023

let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = spawnBall();
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function keyTyped() {
  if (key === " ") {
    ball = spawnBall();
  }
}

function spawnBall() {
  let ball = {
    x: random(width),
    y: random(height),
    d: random(30, 60),
    r: random(255),
    g: random(255),
    b: random(255),
    dx: random(-5, 5),
    dy: random(-5, 5)
  };
  return ball;
}

function moveBall() {
  if (ball.dx > 0 && ball.x - ball.d > width) {
    ball.x = 0 - ball.d;
  }
  else if (ball.dy > 0 && ball.y + ball.d > height) {
    ball.y = 0 - ball.d;
  }
  else if (ball.dx < 0 && ball.x - ball.d < 0) {
    ball.x = width - ball.d;
  }
  else if (ball.dy < 0 && ball.y + ball.d < 0) {
    ball.y = height - ball.d;
  }
  else {
    ball.x += ball.dx;
    ball.y += ball.dy;
  }
}

function displayBall() {
  fill(ball.r, ball.g, ball.b);
  circle(ball.x, ball.y, ball.d);
}