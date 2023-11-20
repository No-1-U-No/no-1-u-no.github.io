// Fireworks Demo

let fireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // for (let firework of fireworks) {
  for (let i = fireworks.length-1; i >= 0; i--) {
    let firework = fireworks[i];
    firework.update();

    if (firework.isDead()) {
      //remove from array
      fireworks.splice(i, 1);
    }

    else {
      firework.display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 100; i++) {
    let dx = random(-5, 5);
    let dy = random(-5, 5);
    let particle = new Particle(mouseX, mouseY, dx, dy);
    fireworks.push(particle);
  }
}

class Particle {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 5;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.a = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.radius*2);
  }

  update() {
    //move
    this.x += this.dx;
    this.y += this.dy;
    this.a--;
  }

  isDead() {
    return this.alpha <= 0;
  }
}