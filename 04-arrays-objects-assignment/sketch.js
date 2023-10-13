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

let gameScreen;

let gameTitleSize;
let gameTitleYcor;
let gameInstructionsSize;
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
  description();

  if (gameScreen === "Game Instructions") {
    background(100);
    instructions();
  }

  if (gameScreen === "Game On") {
    background(0);
  }
}

function values() {
  gameTitleSize = 0.0625*width;
  gameTitleYcor = height/77.5;
  gameInstructionsSize = 0.03125*width;
  gameDescriptionYcor = height/2 - 2*gameInstructionsSize;
  gameInstructionsYcor = height/2 - 2.5*gameInstructionsSize;
  footerSize = 0.025*width;
  footerYcor = 0.9625*height - footerSize/2;
}

function description() {
  textAlign(CENTER);
  textSize(gameTitleSize);
  fill("red");
  text("DOUBLE TROUBLE", 0, gameTitleYcor, width, height);

  textSize(gameInstructionsSize);
  text("Dad needs to go to the grocery store, but his twin boys are extremely difficult when it comes to making the list. One boy asks for too many things, while the other complains about nearly anything his brother asks for. Both behaviours frustrate Dad, and he will eventually blow up.", 0, gameDescriptionYcor, width, height);

  textSize(footerSize);
  text("(press Enter to continue)", 0, footerYcor, width, height);

  if (keyIsPressed && keyCode === ENTER) {
    gameScreen = "Game Instructions";
  }
}

function instructions() {
  textAlign(CENTER);
  textSize(gameTitleSize);
  text("DOUBLE TROUBLE", 0, gameTitleYcor, width, height);

  textSize(gameInstructionsSize);
  text("You are the boy who asks for everything. If you ask Dad for healthy food and both him and your brother are happy with it, Dad will add it to the list. The goal is to have a list with 15 items. If your dad rejects 10 of your requests before then, you and your brother will be grounded for a week. Be careful with what you ask for.", 0, gameInstructionsYcor, width, height);

  textSize(footerSize);
  text("(press Enter to start game)", 0, footerYcor, width, height);

  if (keyIsPressed && keyCode === ENTER) {
    gameScreen = "Game On";
  }
}