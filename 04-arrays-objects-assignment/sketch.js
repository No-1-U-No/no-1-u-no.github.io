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

let patience = 5;
let items = 0;

let listDisplayed = false;
let groceriesDisplayed = false;

let groceryList = ["I", "THINK", "I", "GET", "THIS?"];

let fruits = ["Apples", "Bananas", "Blackberries", "Blueberries", "Cherries", "Grapes", "Kiwi", "Mangoes", "Oranges", "Peaches", "Pears", "Pineapples", "Raspberries", "Strawberries", "Watermelon"];
let vegetables = ["Asparagus", "Broccoli", "Brussel sprouts", "Cabbage", "Carrots", "Cauliflower", "Corn", "Cucumbers", "Lettuce", "Mushrooms", "Onions", "Peppers", "Potatoes", "Spinach", "Tomatoes"];
let meat = ["Beef", "Chicken", "Duck", "Lamb", "Pork"];

let boyImage;
let dadImage;

let introScreen;

let showBoy;
let showDad;

let playerBoy;
let dad;
let computerBoy;

let button;

let categories;

let showGrocery1;
let showGrocery2;
let showGrocery3;
let showGrocery4;
let showGrocery5;

let computerBoyChoices;
let computerBoyChoice;

function preload() {
  // Boy image source: https://metro.co.uk/wp-content/uploads/2015/08/child-screaming.jpg
  // Dad image source: https://media.istockphoto.com/id/1130554249/photo/elderly-man-in-white-shirt-with-his-arms-crossed-looking-depressed-and-annoyed.jpg?s=612x612&w=0&k=20&c=MJu2j1FeHF6vIKeiizq-enVRf6aotyRBVVNILldtZds=
  
  boyImage = loadImage("annoying-boy.png");
  dadImage = loadImage("annoyed-dad.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  introScreen = displayIntroScreens();
  showBoy = displayBoys();
  showDad = displayDad();
  button = displayButtons();
  categories = createGroceries();
  createList();
  computerBoyChoices = ["Yes", "No"];
  computerBoyChoice = random(computerBoyChoices);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  introScreen = displayIntroScreens();
  showBoy = displayBoys();
  showDad = displayDad();
  button = displayButtons();
  categories = createGroceries();
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

function mousePressed() {
  if (gameScreen === "Game Description") {
    gameScreen = "Game Instructions";
  }

  if (mouseX >= button.leftViewListText && mouseX <= button.rightViewListText && mouseY >= button.topText && mouseY <= button.bottomText && gameScreen === "Game On") {
    displayList();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    gameScreen = "Game On";
  }

  if (keyCode === ESCAPE) {
    showList.hide();
    showGrocery1.hide();
    showGrocery2.hide();
    showGrocery3.hide();
    showGrocery4.hide();
    showGrocery5.hide();

    listDisplayed = false;
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
    instructionsText: "You are the boy who asks for everything. If you ask Dad for healthy food and both him and your brother are happy with it, Dad will add it to the list. If Dad rejects 5 of your requests before completing a list with 5 items on it, you and your brother will be grounded for a week.",
    
    footerSize: 0.025*width,
    footerYcor: 0.9625*height - 0.0125*width,
    descriptionFooterText: "(click anywhere on screen to continue)",
    instructionsFooterText: "(press Enter to start game)",
  };

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
}

function instructions() {
  textAlign(CENTER);
  textSize(introScreen.titleSize);
  text(introScreen.titleText, introScreen.xcor, introScreen.titleYcor, introScreen.textBoxWidth, introScreen.textBoxHeight);
  
  textSize(introScreen.textSize);
  text(introScreen.instructionsText, introScreen.xcor, introScreen.textYcor, introScreen.textBoxWidth, introScreen.textBoxHeight);

  textSize(introScreen.footerSize);
  text(introScreen.instructionsFooterText, introScreen.xcor, introScreen.footerYcor, introScreen.textBoxWidth, introScreen.textBoxHeight);
}

function displayBoys() {
  let showBoy = {
    firstBoyXcor: 0.15*width,
    secondBoyXcor: 0.85*width,
    ycor: height - 0.219375*height,
    width: 0.3*width,
    height: 0.43875*height,
  };

  return showBoy;
}

function displayDad() {
  let showDad = {
    xcor: width/2,
    ycor: height - 0.2625*height,
    width: 0.3825*width,
    height: 0.525*height,
  };
  
  return showDad;
}

function displayButtons() {
  let button = {
    addItemsButtonXcor: showBoy.firstBoyXcor + introScreen.textSize,
    viewListButtonXcor: showBoy.secondBoyXcor - introScreen.textSize,
    ycor: height/7.75,
    width: showBoy.width,
    height: height/7.75,

    textSize: 1.5*introScreen.textSize,
    textYcor: height/7.75 + height/150,
    addItemsText: "ADD ITEMS",
    viewListText: "VIEW LIST",

    leftAddItemsText: showBoy.firstBoyXcor + introScreen.textSize - showBoy.width/2,
    rightAddItemsText: showBoy.firstBoyXcor + introScreen.textSize + showBoy.width/2,
    leftViewListText: showBoy.secondBoyXcor - introScreen.textSize - showBoy.width/2,
    rightViewListText: showBoy.secondBoyXcor - introScreen.textSize + showBoy.width/2,
    topText: height/7.75 - height/15.5,
    bottomText: height/7.75 + height/15.5,
  };

  return button;
}

function displayGameScreen() {
  imageMode(CENTER);

  playerBoy = image(boyImage, showBoy.firstBoyXcor, showBoy.ycor, showBoy.width, showBoy.height);
  dad = image(dadImage, showDad.xcor, showDad.ycor, showDad.width, showDad.height);
  computerBoy = image(boyImage, showBoy.secondBoyXcor, showBoy.ycor, showBoy.width, showBoy.height);
  
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
  text(patience, showDad.xcor, button.textYcor, showDad.width, button.height);
}

function createGroceries() {
  let categories = {
    ycor: button.ycor,
    height: button.height,
    textYcor: button.textYcor,

    fruitsText: "FRUITS",
    fruitsXcor: button.addItemsButtonXcor + 0.775*button.width, //406.71625
    fruitsWidth: 0.6*button.width,

    vegetablesText: "VEGETABLES",
    vegetablesXcor: 650,
    vegetablesWidth: 1.05*button.width,

    meatText: "MEAT",
    meatXcor: button.viewListButtonXcor + button.width/4, //878.55625
    meatWidth: 0.5*button.width,
  };

  return categories;
}

function displayGroceries() {
  fill("green");
  rect(categories.fruitsXcor, categories.ycor, categories.fruitsWidth, categories.height);
  fill(50);
  text(categories.fruitsText, categories.fruitsXcor, categories.textYcor, categories.fruitsWidth, categories.height);
  
  fill("green");
  rect(categories.vegetablesXcor, categories.ycor, categories.vegetablesWidth, categories.height);
  fill(50);
  text(categories.vegetablesText, categories.vegetablesXcor, categories.textYcor, categories.vegetablesWidth, categories.height);

  fill("green");
  rect(categories.meatXcor, categories.ycor, categories.meatWidth, categories.height);
  fill(50);
  text(categories.meatText, categories.meatXcor, categories.textYcor, categories.meatWidth, categories.height);
}

function createList() {
  showList = createDiv(`GROCERY LIST FOR ${month()}/${day()}/${year()}:`);
  showList.position((button.addItemsButtonXcor - button.width/2)/width*100, (button.ycor - button.height/2)/height*100);
  showList.style(`left: ${(button.addItemsButtonXcor - button.width/2)/width*50}%`);
  showList.style(`top: ${(button.ycor - button.height/2)/height*50}%`);
  showList.style(`width: ${(button.viewListButtonXcor + button.width/2)/width*100}%`);
  showList.style(`height: ${(button.ycor + button.height/2)/height*250}%`);
  showList.style(`font-size: ${height/button.height*25}%`);
  showList.style(`line-height: ${height/button.height*10}%`);
  showList.style("text-align: center");
  showList.style("color: green");
  showList.style("background-color: black");
  showList.hide();

  showGrocery1 = createDiv(groceryList[0]);
  showGrocery1.position((button.addItemsButtonXcor - button.width/2)/width*100, (button.ycor - button.height/2)/height*100);
  showGrocery1.style(`left: ${(button.addItemsButtonXcor - button.width/2)/width*50}%`);
  showGrocery1.style(`top: ${(button.ycor - button.height/2)/height*50}%`);
  showGrocery1.style(`width: ${(button.viewListButtonXcor + button.width/2)/width*100}%`);
  showGrocery1.style(`height: ${(button.ycor + button.height/2)/height*100}%`);
  showGrocery1.style(`font-size: ${height/button.height*25}%`);
  showGrocery1.style(`line-height: ${height/button.height*60}%`);
  showGrocery1.style("text-align: center");
  showGrocery1.style("color: green");
  showGrocery1.hide();

  showGrocery2 = createDiv(groceryList[1]);
  showGrocery2.position((button.addItemsButtonXcor - button.width/2)/width*100, (button.ycor - button.height/2)/height*100);
  showGrocery2.style(`left: ${(button.addItemsButtonXcor - button.width/2)/width*50}%`);
  showGrocery2.style(`top: ${(button.ycor - button.height/2)/height*50}%`);
  showGrocery2.style(`width: ${(button.viewListButtonXcor + button.width/2)/width*100}%`);
  showGrocery2.style(`height: ${(button.ycor + button.height/2)/height*100}%`);
  showGrocery2.style(`font-size: ${height/button.height*25}%`);
  showGrocery2.style(`line-height: ${height/button.height*110}%`);
  showGrocery2.style("text-align: center");
  showGrocery2.style("color: green");
  showGrocery2.hide();

  showGrocery3 = createDiv(groceryList[2]);
  showGrocery3.position((button.addItemsButtonXcor - button.width/2)/width*100, (button.ycor - button.height/2)/height*100);
  showGrocery3.style(`left: ${(button.addItemsButtonXcor - button.width/2)/width*50}%`);
  showGrocery3.style(`top: ${(button.ycor - button.height/2)/height*50}%`);
  showGrocery3.style(`width: ${(button.viewListButtonXcor + button.width/2)/width*100}%`);
  showGrocery3.style(`height: ${(button.ycor + button.height/2)/height*100}%`);
  showGrocery3.style(`font-size: ${height/button.height*25}%`);
  showGrocery3.style(`line-height: ${height/button.height*160}%`);
  showGrocery3.style("text-align: center");
  showGrocery3.style("color: green");
  showGrocery3.hide();

  showGrocery4 = createDiv(groceryList[3]);
  showGrocery4.position((button.addItemsButtonXcor - button.width/2)/width*100, (button.ycor - button.height/2)/height*100);
  showGrocery4.style(`left: ${(button.addItemsButtonXcor - button.width/2)/width*50}%`);
  showGrocery4.style(`top: ${(button.ycor - button.height/2)/height*50}%`);
  showGrocery4.style(`width: ${(button.viewListButtonXcor + button.width/2)/width*100}%`);
  showGrocery4.style(`height: ${(button.ycor + button.height/2)/height*100}%`);
  showGrocery4.style(`font-size: ${height/button.height*25}%`);
  showGrocery4.style(`line-height: ${height/button.height*210}%`);
  showGrocery4.style("text-align: center");
  showGrocery4.style("color: green");
  showGrocery4.hide();

  showGrocery5 = createDiv(groceryList[4]);
  showGrocery5.position((button.addItemsButtonXcor - button.width/2)/width*100, (button.ycor - button.height/2)/height*100);
  showGrocery5.style(`left: ${(button.addItemsButtonXcor - button.width/2)/width*50}%`);
  showGrocery5.style(`top: ${(button.ycor - button.height/2)/height*50}%`);
  showGrocery5.style(`width: ${(button.viewListButtonXcor + button.width/2)/width*100}%`);
  showGrocery5.style(`height: ${(button.ycor + button.height/2)/height*100}%`);
  showGrocery5.style(`font-size: ${height/button.height*25}%`);
  showGrocery5.style(`line-height: ${height/button.height*260}%`);
  showGrocery5.style("text-align: center");
  showGrocery5.style("color: green");
  showGrocery5.hide();
}

function displayList() {
  showList.show();
  showGrocery1.show();
  showGrocery2.show();
  showGrocery3.show();
  showGrocery4.show();
  showGrocery5.show();

  listDisplayed = true;
}

function game() {
  displayGameScreen();

  if (mouseX >= button.leftAddItemsText && mouseX <= button.rightAddItemsText && mouseY >= button.topText && mouseY <= button.bottomText) {
    fill("green");
    rect(button.addItemsButtonXcor, button.ycor, button.width, button.height);
    fill(50);
    text(button.addItemsText, button.addItemsButtonXcor, button.textYcor);

    if (listDisplayed === false) {
      displayGroceries();
      groceriesDisplayed = true;
    }
  }
  
  if (mouseX >= button.leftViewListText && mouseX <= button.rightViewListText && mouseY >= button.topText && mouseY <= button.bottomText) {
    fill("green");
    rect(button.viewListButtonXcor, button.ycor, button.width, button.height);
    fill(50);
    text(button.viewListText, button.viewListButtonXcor, button.textYcor);
  }
}