// Perlin Noise Ball

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");
  noStroke();
  spawnBall();

  //spawn a new ball every half second
  window.setInterval(spawnBall, 500);
}

function draw() {
  for (let theBall of ballArray) {
    fill(theBall.colour);
  
    //move
    theBall.x = noise(theBall.time) * width;
    theBall.y = noise(theBall.time + 300) * height;
  
    //display
    circle(theBall.x, theBall.y, theBall.size);
  
    theBall.time += 0.01;
  }
}

function mousePressed() {
  spawnBall();
}

function spawnBall() {
  let ball = {
    x: random(width),
    y: random(height),
    size: random(10, 50),
    colour: color(random(255), random(255), random(255), random(255)),
    time: random(1000)
  };
  ballArray.push(ball);
}