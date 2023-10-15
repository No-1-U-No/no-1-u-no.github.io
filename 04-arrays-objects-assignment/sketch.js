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

let gameScreen = "Game Description";

let patience = 10;
let items = 0;

let boyImage;
let dadImage;

let introScreen;

let boy;
let dad;
let button;

function preload() {
  // Boy image source: https://metro.co.uk/wp-content/uploads/2015/08/child-screaming.jpg
  // Dad image source: https://media.istockphoto.com/id/1130554249/photo/elderly-man-in-white-shirt-with-his-arms-crossed-looking-depressed-and-annoyed.jpg?s=612x612&w=0&k=20&c=MJu2j1FeHF6vIKeiizq-enVRf6aotyRBVVNILldtZds=
  
  boyImage = loadImage("annoying-boy.png");
  dadImage = loadImage("annoyed-dad.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  introScreen = displayIntroScreens();
  boy = displayBoys();
  dad = displayDad();
  button = displayButtons();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  introScreen = displayIntroScreens();
  boy = displayBoys();
  dad = displayDad();
  button = displayButtons();
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

function displayIntroScreens() {
  let introScreen = {
    titleSize: 0.0625*width,
    titleText: "DOUBLE TROUBLE",
    xcor: 0,
    titleYcor: height/77.5,
    textBoxWidth: width,
    textBoxHeight: height,

    textSize: 0.03125*width,
    textYcor: height/2 - 0.0625*width,
    descriptionText: "Dad needs to go to the grocery store, but his twin boys are extremely difficult when it comes to making the list. One boy asks for too many things, while the other complains about nearly anything his brother asks for. Both behaviours frustrate Dad, and he will eventually blow up.",
    instructionsText: "You are the boy who asks for everything. If you ask Dad for healthy food and both him and your brother are happy with it, Dad will add it to the list. If Dad rejects 10 of your requests before completing a list with 10 items on it, you and your brother will be grounded for a week.",
    
    footerSize: 0.025*width,
    footerYcor: 0.9625*height - 0.0125*width,
    descriptionFooterText: "(click anywhere on screen to continue)",
    instructionsFooterText: "(press Enter to start game)",
  }

  return introScreen;
}

function description() {
  textAlign(CENTER);
  textSize(introScreen.titleSize);
  fill("red");
  text(introScreen.titleText, introScreen.xcor, introScreen.titleYcor, introScreen.textBoxWidth, introScreen.textBoxHeight);

  textSize(introScreen.textSize);
  text(introScreen.descriptionText, introScreen.xcor, introScreen.textYcor, introScreen.textBoxWidth, introScreen.textBoxHeight);
  
  textSize(introScreen.footerSize);
  text(introScreen.descriptionFooterText, introScreen.xcor, introScreen.footerYcor, introScreen.textBoxWidth, introScreen.textBoxHeight);
  
  if (mouseIsPressed && gameScreen === "Game Description") {
    gameScreen = "Game Instructions";
  }
}

function instructions() {
  textAlign(CENTER);
  textSize(introScreen.titleSize);
  text(introScreen.titleText, introScreen.xcor, introScreen.titleYcor, introScreen.textBoxWidth, introScreen.textBoxHeight);
  
  textSize(introScreen.textSize);
  text(introScreen.instructionsText, introScreen.xcor, introScreen.textYcor, introScreen.textBoxWidth, introScreen.textBoxHeight);

  textSize(introScreen.footerSize);
  text(introScreen.instructionsFooterText, introScreen.xcor, introScreen.footerYcor, introScreen.textBoxWidth, introScreen.textBoxHeight);
  
  if (keyIsPressed && keyCode === ENTER) {
    gameScreen = "Game On";
  }
}

function displayBoys() {
  let boy = {
    firstBoyXcor: 0.15*width,
    secondBoyXcor: 0.85*width,
    ycor: height - 0.219375*height,
    width: 0.3*width,
    height: 0.43875*height,
  };

  return boy;
}

function displayDad() {
  let dad = {
    xcor: width/2,
    ycor: height - 0.2625*height,
    width: 0.3825*width,
    height: 0.525*height,
  };
  
  return dad;
}

function displayButtons() {
  let button = {
    addItemsButtonXcor: boy.firstBoyXcor + introScreen.textSize,
    viewListButtonXcor: boy.secondBoyXcor - introScreen.textSize,
    ycor: height/7.75,
    width: boy.width,
    height: height/7.75,

    textSize: 1.5*introScreen.textSize,
    textYcor: height/7.75 + height/150,
    addItemsText: "ADD ITEMS",
    viewListText: "VIEW LIST",

    leftAddItemsText: boy.firstBoyXcor + introScreen.textSize - boy.width/2,
    rightAddItemsText: boy.firstBoyXcor + introScreen.textSize + boy.width/2,
    leftViewListText: boy.secondBoyXcor - introScreen.textSize - boy.width/2,
    rightViewListText: boy.secondBoyXcor - introScreen.textSize + boy.width/2,
    topText: height/7.75 - height/15.5,
    bottomText: height/7.75 + height/15.5,
  };

  return button;
}

function displayGameScreen() {
  imageMode(CENTER);
  image(boyImage, boy.firstBoyXcor, boy.ycor, boy.width, boy.height);
  image(dadImage, dad.xcor, dad.ycor, dad.width, dad.height);
  image(boyImage, boy.secondBoyXcor, boy.ycor, boy.width, boy.height);
  
  fill(50);
  rectMode(CENTER);
  rect(button.addItemsButtonXcor, button.ycor, button.width, button.height);
  rect(button.viewListButtonXcor, button.ycor, button.width, button.height);
  
  fill("green");
  textAlign(CENTER, CENTER);
  textSize(button.textSize);
  text(button.addItemsText, button.addItemsButtonXcor, button.textYcor, button.width, button.height);
  text(button.viewListText, button.viewListButtonXcor, button.textYcor, button.width, button.height);
  
  fill("red");
  text(patience, dad.xcor, button.textYcor, dad.width, button.height);
}

function game() {
  displayGameScreen();

  if (mouseX >= button.leftAddItemsText && mouseX <= button.rightAddItemsText && mouseY >= button.topText && mouseY <= button.bottomText) {
    fill("green");
    rect(button.addItemsButtonXcor, button.ycor, button.width, button.height);
    fill(50);
    text(button.addItemsText, button.addItemsButtonXcor, button.textYcor);
  }

  if (mouseX >= button.leftViewListText && mouseX <= button.rightViewListText && mouseY >= button.topText && mouseY <= button.bottomText) {
    fill("green");
    rect(button.viewListButtonXcor, button.ycor, button.width, button.height);
    fill(50);
    text(button.viewListText, button.viewListButtonXcor, button.textYcor);
  }
}