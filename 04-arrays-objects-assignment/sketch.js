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

let dad;
let boy;

let gameTitleSize;
let gameTitleYcor;
let gameInstructionsSize;
let gameDescriptionYcor;
let gameInstructionsYcor;
let footerSize;
let footerYcor;

let dadWidth;
let dadHeight;
let dadXcor;
let dadYcor;

let boyWidth;
let boyHeight;
let boyYcor;
let firstBoyXcor;
let secondBoyXcor;

function preload() {
  // Dad image source: https://media.istockphoto.com/id/1130554249/photo/elderly-man-in-white-shirt-with-his-arms-crossed-looking-depressed-and-annoyed.jpg?s=612x612&w=0&k=20&c=MJu2j1FeHF6vIKeiizq-enVRf6aotyRBVVNILldtZds=
  // Boy image source: https://metro.co.uk/wp-content/uploads/2015/08/child-screaming.jpg

  dad = loadImage("annoyed-dad.png");
  boy = loadImage("annoying-boy.png");
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
    background(50);
    instructions();
  }

  if (gameScreen === "Game On") {
    background(0);
    game();
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

  dadWidth = 0.3825*width;
  dadHeight = 0.525*height;
  dadXcor = width/2;
  dadYcor = height - dadHeight/2;

  boyWidth = 0.3*width;
  boyHeight = 0.43875*height;
  boyYcor = height - boyHeight/2;
  firstBoyXcor = boyWidth/2;
  secondBoyXcor = 0.85*width;
}

function description() {
  textAlign(CENTER);
  textSize(gameTitleSize);
  fill("red");
  text("DOUBLE TROUBLE", 0, gameTitleYcor, width, height);

  textSize(gameInstructionsSize);
  text("Dad needs to go to the grocery store, but his twin boys are extremely difficult when it comes to making the list. One boy asks for too many things, while the other complains about nearly anything his brother asks for. Both behaviours frustrate Dad, and he will eventually blow up.", 0, gameDescriptionYcor, width, height);

  textSize(footerSize);
  text("(click anywhere on screen to continue)", 0, footerYcor, width, height);

  if (mouseIsPressed) {
    gameScreen = "Game Instructions";
  }
}

function instructions() {
  textAlign(CENTER);
  textSize(gameTitleSize);
  text("DOUBLE TROUBLE", 0, gameTitleYcor, width, height);

  textSize(gameInstructionsSize);
  text("You are the boy who asks for everything. If you ask Dad for healthy food and both him and your brother are happy with it, Dad will add it to the list. The goal is to have a list with 15 items, but if your dad rejects 10 of your requests before then, you and your brother will be grounded for a week.", 0, gameInstructionsYcor, width, height);

  textSize(footerSize);
  text("(press Enter to start game)", 0, footerYcor, width, height);

  if (keyIsPressed && keyCode === ENTER) {
    gameScreen = "Game On";
  }
}

function game() {
  imageMode(CENTER);
  image(boy, firstBoyXcor, boyYcor, boyWidth, boyHeight);
  image(dad, dadXcor, dadYcor, dadWidth, dadHeight);
  image(boy, secondBoyXcor, boyYcor, boyWidth, boyHeight);
}