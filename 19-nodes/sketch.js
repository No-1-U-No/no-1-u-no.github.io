// Connected Nodes OOP Demo

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  //draw the lines first
  for (let point of points) {
    point.connect(points);
    point.update();
  }

  //draw the circles after (to keep the lines outside of the circles)
  for (let point of points) {
    point.display();
  }
}

function mousePressed() {
  let point = new MovingPoint(mouseX, mouseY);
  points.push(point);
}

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = color(random(255), random(255), random(255));
    this.radius = 15;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.reach = 150;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius*2);
  }

  update() {
    //move point
    let dx = noise(this.xTime);
    this.dx = map(dx, 0, 1, -5, 5);
    let dy = noise(this.yTime);
    this.dy = map(dy, 0, 1, -5, 5);

    this.x += this.dx;
    this.y += this.dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;

    //wrap around screen
    if (this.x + this.radius < 0) {
      this.x += width;
    }

    else if (this.x - this.radius > width) {
      this.x -= width;
    }

    else if (this.y + this.radius < 0) {
      this.y += height;
    }

    else if (this.y - this.radius > height) {
      this.y -= height;
    }

    //adjust size based on mouse
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach) {
      //make circle bigger
      let size = map(mouseDistance, 0, this.reach, 30, 15);
      this.radius = size;
    }

    else {
      //set circle to regular size
      this.radius = 15;
    }
  }

  connect(pointsArray) {
    for (let otherPoint of pointsArray) {
      if (this !== otherPoint) {
        if (dist(this.x, this.y, otherPoint.x, otherPoint.y) < this.reach) {
          stroke(this.colour);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }
}