// Arrays and Object Notation Assignment
// Gabe PausJenssen
// October 19, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Browser window school computer: (1600, 775)
// Browser window school computer inspecting elements: (1045, 775)

// Browser window smaller school computer: (1072, 738)
// Browser window smaller school computer inspecting elements: (517, 738)

let gameScreen = instructions;

let gameTitleSize;
let gameTitleYcor;

function preload() {
  let mom = loadImage("frustrated-mom.png");
  let boy = loadImage("annoying-boy.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  values();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  values();
}

function draw() {
  background(220);
  instructions();
}

function values() {
  gameTitleSize = 0.03125*width;
  gameTitleYcor = height/77.5;
}

function instructions() {
  textSize(gameTitleSize);
  textAlign(CENTER);
  text("CHILDREN'S CHALLENGE", 0, gameTitleYcor, width, height);
}