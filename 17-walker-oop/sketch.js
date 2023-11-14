// Walker OOP Demo

class Walker {
  constructor(x, y, colour, speed, size) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.speed = speed;
    this.size = size;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.size);
  }

  move() {
    let choice = Math.round(random(1, 4));

    if (choice === 1) {
      //down
      this.y += this.speed;
    }

    else if (choice === 2) {
      //up
      this.y -= this.speed;
    }

    else if (choice === 3) {
      //left
      this.x -= this.speed;
    }

    else {
      //right
      this.x += this.speed;
    }
  }
}

let gabe;
let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  gabe = new Walker(width/2, height/2, "blue", 3, 5);
  walkers.push(gabe);
}

function draw() {
  for (let person of walkers) {
    person.move();
    person.display();
  }
}

function mousePressed() {
  let gabe = new Walker(mouseX, mouseY, "blue", 3, 5);
  walkers.push(gabe);
}