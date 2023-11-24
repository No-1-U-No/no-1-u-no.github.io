// Inheritance OOP Demo

let particle;
let confetti;

function setup() {
  createCanvas(windowWidth, windowHeight);
  particle = new Particle(width/2, height/2);
  confetti = new Confetti (width/2, height/2);
}

function draw() {
  background(0);
  particle.update();
  particle.display();
  confetti.update();
  confetti.display();
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
  }

  update() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  display() {
    circle(this.x, this.y, this.size);
  }
}

class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
  }

  update() {
    super.update();
    this.size += random(-5, 5);
  }

  display() {
    square(this.x, this.y, this.size);
  }
}