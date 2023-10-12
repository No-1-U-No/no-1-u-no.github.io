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
let gameDescriptionSize;
let gameDescriptionYcor;

function preload() {
  let dad = loadImage("annoyed-dad.png");
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
  background(0);
  instructions();
}

function values() {
  gameTitleSize = 0.0625*width;
  gameTitleYcor = height/77.5;
  gameDescriptionSize = 0.03125*width;
  gameDescriptionYcor = height/2;
}

function instructions() {
  textSize(gameTitleSize);
  textAlign(CENTER);
  fill("red");
  text("DOUBLE TROUBLE", 0, gameTitleYcor, width, height);

  textSize(gameDescriptionSize);
  text("Dad needs to go to the grocery store, but his twin boys are extremely difficult when it comes to creating the list. One boy asks for too many things, while the other complains about nearly anything his brother suggests. Both behaviours frustrate Dad to an extremity.", 0, gameDescriptionYcor, width, height);
}