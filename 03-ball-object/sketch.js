// Ball Object Notation Demo
// Oct 5, 2023

let ball = {
  x: 100,
  y: 100,
  d: 50,
  r: 255,
  g: 0,
  b: 0,
  dx: 10,
  dy: -10
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function moveBall() {
  if (ball.dx > 0 && ball.x >= width) {
    ball.x = 0 - ball.d;
  }
  else if (ball.dy > 0 && ball.y >= height) {
    ball.y = 0 - ball.d;
  }
  else if (ball.dx < 0 && ball.x <= 0) {
    ball.x = width - ball.d;
  }
  else if (ball.dy < 0 && ball.y <= 0) {
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