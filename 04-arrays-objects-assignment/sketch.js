// Arrays and Object Notation Assignment
// Gabe PausJenssen
// October 19, 2023
//
// Extra for Experts:
// When you click on "View List" on the game screen, it displays all the items that Dad has added to the list; OR, when you hover over "Add Items" on the game screen, different popups with grocery categories and grocery items appear in a mostly responsive manner

let gameScreen = "Game Description";

let patience = 5;
let items = 0;

// Setting state variables that are triggered when hovering over "Add Items" and clicking "View List", respectively
let groceriesDisplayed = false;
let listDisplayed = false;

let groceryList = [];

let fruits = ["Apples", "Bananas", "Cherries", "Grapes", "Oranges"];
let vegetables = ["Broccoli", "Carrots", "Cucumbers", "Lettuce", "Mushrooms", "Onions", "Peppers", "Potatoes", "Spinach", "Tomatoes"];
let meat = ["Beef", "Chicken", "Duck", "Lamb", "Pork"];

let boyImage;
let dadImage;

let boyWant;
let boyNoWant;
let dadAngry;

// <div> elements
let showList;
let showGrocery1;
let showGrocery2;
let showGrocery3;
let showGrocery4;
let showGrocery5;

// Your brother randomly picks between yes and no to whatever you ask Dad for
let computerBoyChoices;
let computerBoyChoice;

function preload() {
  // Boy image source: https://metro.co.uk/wp-content/uploads/2015/08/child-screaming.jpg
  // Dad image source: https://media.istockphoto.com/id/1130554249/photo/elderly-man-in-white-shirt-with-his-arms-crossed-looking-depressed-and-annoyed.jpg?s=612x612&w=0&k=20&c=MJu2j1FeHF6vIKeiizq-enVRf6aotyRBVVNILldtZds=
  boyImage = loadImage("annoying-boy.png");
  dadImage = loadImage("annoyed-dad.png");

  // Boy want and no want sources: me
  // Dad angry source: one of my sound effects machines
  boyWant = loadSound("boy-want.mp4");
  boyNoWant = loadSound("boy-no-want.mp4");
  dadAngry = loadSound("dad-angry.mp4");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  displayObjects();

  // Creates header <div> when game starts; each item <div> will spawn if Dad adds an item to the list
  createList();

  computerBoyChoices = ["Yes", "No"];
  computerBoyChoice = random(computerBoyChoices);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  displayObjects();
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

  if (gameScreen === "Get Groceries") {
    background(0);
    win();
  }

  if (gameScreen === "Get Grounded") {
    background(0);
    loss();
  }
}

function mousePressed() {
  if (gameScreen === "Game Description") {
    gameScreen = "Game Instructions";
  }

  if (gameScreen === "Game On" && mouseX >= button.leftViewListText && mouseX <= button.rightViewListText && mouseY >= button.topText && mouseY <= button.bottomText) {
    displayList();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    gameScreen = "Game On";
  }

  // When you click "Escape", it hides the list
  if (keyCode === ESCAPE) {
    listDisplayed = false;
    showList.hide();

    // If the list has one item, it only has to hide the one item
    if (items === 1) {
      showGrocery1.hide();
    }
    
    // If the list has two items, it hides both the first and second items
    if (items === 2) {
      showGrocery1.hide();
      showGrocery2.hide();
    }

    // Following "if" statements follow the same pattern as above
    if (items === 3) {
      showGrocery1.hide();
      showGrocery2.hide();
      showGrocery3.hide();
    }

    if (items === 4) {
      showGrocery1.hide();
      showGrocery2.hide();
      showGrocery3.hide();
      showGrocery4.hide();
    }

    if (items === 5) {
      showGrocery1.hide();
      showGrocery2.hide();
      showGrocery3.hide();
      showGrocery4.hide();
      showGrocery5.hide();
    }
  }
}

function displayObjects() {
  // All objects (storing several variables filled with math) are saved here, called in both setup() and windowResized()
  introScreen = displayIntroScreens();
  showBoy = displayBoys();
  showDad = displayDad();
  button = displayButtons();
  categories = displayCategories();
  showFruits = displayFruits();
  showVegetables = displayVegetables();
  showMeat = displayMeat();
  groceries = displayGroceries();
  textBoxes = displayGameOverScreens();
}

function displayIntroScreens() {
  // Object to store coordinates and sizes of things appearing on the description() and instruction() screens
  let introScreen = {
    titleSize: 0.0625*width,
    titleText: "DOUBLE TROUBLE",
    xcor: 0,
    titleYcor: height/77.5,
    textBoxWidth: width,
    textBoxHeight: height,

    textSize: 0.03125*width,
    textYcor: height/2 - 0.078125*width,
    descriptionText: "Dad needs to go to the grocery store, but his twin boys are extremely difficult when it comes to making the list. One boy asks for too many things while the other randomly complains about some of the things his brother asks for. Dad only adds the first boy's requests if the second boy approves.",
    instructionsText: "You are the boy who asks for everything. You can ask for whatever you want, but if your brother complains 5 times prior to completing a list with 5 items on it, both of you will get grounded for a week. Here's a tip during the game: when you want to close the list view, click the Escape button.",
    
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

    // Boundaries of "Add Items" and "View List" buttons (for mouse-hovering and changing colour detection)
    leftAddItemsText: showBoy.firstBoyXcor + introScreen.textSize - showBoy.width/2,
    rightAddItemsText: showBoy.firstBoyXcor + introScreen.textSize + showBoy.width/2,
    leftViewListText: showBoy.secondBoyXcor - introScreen.textSize - showBoy.width/2,
    rightViewListText: showBoy.secondBoyXcor - introScreen.textSize + showBoy.width/2,
    topText: height/15.5,
    bottomText: 3*height/15.5,
  };

  return button;
}

function displayGameScreen() {
  imageMode(CENTER);

  image(boyImage, showBoy.firstBoyXcor, showBoy.ycor, showBoy.width, showBoy.height);
  image(dadImage, showDad.xcor, showDad.ycor, showDad.width, showDad.height);
  image(boyImage, showBoy.secondBoyXcor, showBoy.ycor, showBoy.width, showBoy.height);
  
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

function newComputerBoyChoice() {
  // computerBoyChoice() is defined in the setup(), but leaving it at that would make your brother give the same answer every single time
  // This makes your brother decide something new every time you click on a new item
  computerBoyChoice = random(computerBoyChoices);
}

function displayCategories() {
  // Food categories (in this game, just fruits, vegetables and meat)
  let categories = {
    ycor: button.ycor,
    height: button.height,
    textYcor: button.textYcor,

    fruitsText: "FRUITS",
    fruitsXcor: button.addItemsButtonXcor + 0.775*button.width,
    fruitsWidth: 0.6*button.width,

    vegetablesText: "VEGETABLES",
    vegetablesXcor: 0.66125*width,
    vegetablesWidth: 1.05*button.width,

    meatText: "MEAT",
    meatXcor: button.viewListButtonXcor + button.width/4,
    meatWidth: 0.5*button.width,
  };

  return categories;
}

function displayFruits() {
  // Coordinates and sizes of all the fruits' buttons
  let showFruits = {
    xcor: categories.fruitsXcor,
    width: categories.fruitsWidth,
    height: categories.height/2,
    textSize: introScreen.textSize,

    applesText: fruits[0],
    applesYcor: 1.75*categories.ycor,

    bananasText: fruits[1],
    bananasYcor: 2.25*categories.ycor,

    cherriesText: fruits[2],
    cherriesYcor: 2.75*categories.ycor,

    grapesText: fruits[3],
    grapesYcor: 3.25*categories.ycor,

    orangesText: fruits[4],
    orangesYcor: 3.75*categories.ycor,

    leftText: categories.fruitsXcor - categories.fruitsWidth/2,
    rightText: categories.fruitsXcor + categories.fruitsWidth/2,
    topText: categories.ycor - categories.height/2,
    bottomText: 3.75*categories.ycor + categories.height/4,

    applesTopText: 1.75*categories.ycor - categories.height/4,
    applesBottomText: 1.75*categories.ycor + categories.height/4,

    bananasTopText: 2.25*categories.ycor - categories.height/4,
    bananasBottomText: 2.25*categories.ycor + categories.height/4,

    cherriesTopText: 2.75*categories.ycor - categories.height/4,
    cherriesBottomText: 2.75*categories.ycor + categories.height/4,

    grapesTopText: 3.25*categories.ycor - categories.height/4,
    grapesBottomText: 3.25*categories.ycor + categories.height/4,

    orangesTopText: 3.75*categories.ycor - categories.height/4,
  };

  return showFruits;
}

function displayVegetables() {
  // Coordinates and sizes of all the vegetables' buttons
  let showVegetables = {
    width: categories.vegetablesWidth/2,
    height: categories.height/2,
    textSize: introScreen.textSize,

    leftXcor: categories.vegetablesXcor - categories.vegetablesWidth/4,
    rightXcor: categories.vegetablesXcor + categories.vegetablesWidth/4,

    broccoliText: vegetables[0],
    broccoliYcor: showFruits.applesYcor,

    carrotsText: vegetables[1],
    carrotsYcor: showFruits.bananasYcor,

    cucumbersText: vegetables[2],
    cucumbersYcor: showFruits.cherriesYcor,

    lettuceText: vegetables[3],
    lettuceYcor: showFruits.grapesYcor,

    mushroomsText: vegetables[4],
    mushroomsYcor: showFruits.orangesYcor,

    onionsText: vegetables[5],
    onionsYcor: showFruits.applesYcor,

    peppersText: vegetables[6],
    peppersYcor: showFruits.bananasYcor,

    potatoesText: vegetables[7],
    potatoesYcor: showFruits.cherriesYcor,

    spinachText: vegetables[8],
    spinachYcor: showFruits.grapesYcor,

    tomatoesText: vegetables[9],
    tomatoesYcor: showFruits.orangesYcor,

    leftText: categories.vegetablesXcor - categories.vegetablesWidth/2,
    centerText: categories.vegetablesXcor,
    rightText: categories.vegetablesXcor + categories.vegetablesWidth/2,
    topText: categories.ycor - categories.height/2,
    bottomText: 3.75*categories.ycor + categories.height/4,

    broccoliTopText: showFruits.applesTopText,
    broccoliBottomText: showFruits.applesBottomText,

    carrotsTopText: showFruits.bananasTopText,
    carrotsBottomText: showFruits.bananasBottomText,

    cucumbersTopText: showFruits.cherriesTopText,
    cucumbersBottomText: showFruits.cherriesBottomText,

    lettuceTopText: showFruits.grapesTopText,
    lettuceBottomText: showFruits.grapesBottomText,

    mushroomsTopText: showFruits.orangesTopText,

    onionsTopText: showFruits.applesTopText,
    onionsBottomText: showFruits.applesBottomText,

    peppersTopText: showFruits.bananasTopText,
    peppersBottomText: showFruits.bananasBottomText,

    potatoesTopText: showFruits.cherriesTopText,
    potatoesBottomText: showFruits.cherriesBottomText,

    spinachTopText: showFruits.grapesTopText,
    spinachBottomText: showFruits.grapesBottomText,

    tomatoesTopText: showFruits.orangesTopText,
  };

  return showVegetables;
}

function displayMeat() {
  // Coordinates and sizes of all the meats' buttons
  let showMeat = {
    xcor: categories.meatXcor,
    width: categories.meatWidth,
    height: categories.height/2,
    textSize: introScreen.textSize,

    beefText: meat[0],
    beefYcor: showFruits.applesYcor,

    chickenText: meat[1],
    chickenYcor: showFruits.bananasYcor,

    duckText: meat[2],
    duckYcor: showFruits.cherriesYcor,

    lambText: meat[3],
    lambYcor: showFruits.grapesYcor,

    porkText: meat[4],
    porkYcor: showFruits.orangesYcor,

    leftText: categories.meatXcor - categories.meatWidth/2,
    rightText: categories.meatXcor + categories.meatWidth/2,
    topText: categories.ycor - categories.height/2,
    bottomText: 3.75*categories.ycor + categories.height/4,

    beefTopText: showFruits.applesTopText,
    beefBottomText: showFruits.applesBottomText,

    chickenTopText: showFruits.bananasTopText,
    chickenBottomText: showFruits.bananasBottomText,

    duckTopText: showFruits.cherriesTopText,
    duckBottomText: showFruits.cherriesBottomText,

    lambTopText: showFruits.grapesTopText,
    lambBottomText: showFruits.grapesBottomText,

    porkTopText: showFruits.orangesTopText,
  };

  return showMeat;
}

function displayGroceries() {
  // Fruits button
  fill(50);
  rect(categories.fruitsXcor, categories.ycor, categories.fruitsWidth, categories.height);
  fill("green");
  text(categories.fruitsText, categories.fruitsXcor, categories.textYcor, categories.fruitsWidth, categories.height);

  // Fruits button changes colour when hovering over it
  if (mouseX >= showFruits.leftText && mouseX <= showFruits.rightText && mouseY >= showFruits.topText && mouseY <= showFruits.bottomText) {
    fill("green");
    rect(categories.fruitsXcor, categories.ycor, categories.fruitsWidth, categories.height);
    fill(50);
    text(categories.fruitsText, categories.fruitsXcor, categories.textYcor, categories.fruitsWidth, categories.height);
  }

  // Moving your mouse below the lowest fruit button causes the popup menus to disappear
  else if (mouseY >= showFruits.bottomText) {
    groceriesDisplayed = false;
  }
  
  // Pattern above follows
  fill(50);
  rect(categories.vegetablesXcor, categories.ycor, categories.vegetablesWidth, categories.height);
  fill("green");
  text(categories.vegetablesText, categories.vegetablesXcor, categories.textYcor, categories.vegetablesWidth, categories.height);

  if (mouseX >= showVegetables.leftText && mouseX <= showVegetables.rightText && mouseY >= showVegetables.topText && mouseY <= showVegetables.bottomText) {
    fill("green");
    rect(categories.vegetablesXcor, categories.ycor, categories.vegetablesWidth, categories.height);
    fill(50);
    text(categories.vegetablesText, categories.vegetablesXcor, categories.textYcor, categories.vegetablesWidth, categories.height);  
  }

  else if (mouseY >= showFruits.bottomText) {
    groceriesDisplayed = false;
  }

  fill(50);
  rect(categories.meatXcor, categories.ycor, categories.meatWidth, categories.height);
  fill("green");
  text(categories.meatText, categories.meatXcor, categories.textYcor, categories.meatWidth, categories.height);

  if (mouseX >= showMeat.leftText && mouseX <= showMeat.rightText && mouseY >= showMeat.topText && mouseY <= showMeat.bottomText) {
    fill("green");
    rect(categories.meatXcor, categories.ycor, categories.meatWidth, categories.height);
    fill(50);
    text(categories.meatText, categories.meatXcor, categories.textYcor, categories.meatWidth, categories.height);  
  }

  else if (mouseY >= showMeat.bottomText) {
    groceriesDisplayed = false;
  }
  
  // The above three buttons are for the categories; all the following ones are for each item
  textSize(introScreen.textSize);

  // Apples button
  if (mouseX >= showFruits.leftText && mouseX <= showFruits.rightText && mouseY >= showFruits.topText && mouseY <= showFruits.bottomText) {
    fill(50);
    rect(showFruits.xcor, showFruits.applesYcor, showFruits.width, showFruits.height);
    fill("green");
    text(showFruits.applesText, showFruits.xcor, showFruits.applesYcor, showFruits.width, showFruits.height);

    // Apples button changes colour when hovering over it
    if (mouseX >= showFruits.leftText && mouseX <= showFruits.rightText && mouseY >= showFruits.applesTopText && mouseY <= showFruits.applesBottomText) {
      fill("green");
      rect(showFruits.xcor, showFruits.applesYcor, showFruits.width, showFruits.height);
      fill(50);
      text(showFruits.applesText, showFruits.xcor, showFruits.applesYcor, showFruits.width, showFruits.height);

      // Clicking on "Apples" hides the popup menus
      if (mouseIsPressed) {
        groceriesDisplayed = false;

        // If your brother approves, he regenerates his random pick and the apples are pushed to the groceryList array
        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showFruits.applesText);
          
          // If the apples are the first item to the list, it is set as the first item to create the first item <div>
          if (items === 1) {
            createGrocery1();
          }

          // If the apples are the second item to the list, it is set as the second item to create the second item <div>
          else if (items === 2) {
            createGrocery2();
          }

          // Pattern from the previous comment follows for the following "else if" statements
          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        // If your brother disapproves, he regenerates his random pick and Dad's patience decreases by 1
        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    // Apple pattern follows for the rest of the grocery items (each category)
    fill(50);
    rect(showFruits.xcor, showFruits.bananasYcor, showFruits.width, showFruits.height);
    fill("green");
    text(showFruits.bananasText, showFruits.xcor, showFruits.bananasYcor, showFruits.width, showFruits.height);

    if (mouseX >= showFruits.leftText && mouseX <= showFruits.rightText && mouseY >= showFruits.bananasTopText && mouseY <= showFruits.bananasBottomText) {
      fill("green");
      rect(showFruits.xcor, showFruits.bananasYcor, showFruits.width, showFruits.height);
      fill(50);
      text(showFruits.bananasText, showFruits.xcor, showFruits.bananasYcor, showFruits.width, showFruits.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showFruits.bananasText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }
  
    fill(50);
    rect(showFruits.xcor, showFruits.cherriesYcor, showFruits.width, showFruits.height);
    fill("green");
    text(showFruits.cherriesText, showFruits.xcor, showFruits.cherriesYcor, showFruits.width, showFruits.height);

    if (mouseX >= showFruits.leftText && mouseX <= showFruits.rightText && mouseY >= showFruits.cherriesTopText && mouseY <= showFruits.cherriesBottomText) {
      fill("green");
      rect(showFruits.xcor, showFruits.cherriesYcor, showFruits.width, showFruits.height);
      fill(50);
      text(showFruits.cherriesText, showFruits.xcor, showFruits.cherriesYcor, showFruits.width, showFruits.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showFruits.cherriesText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }
  
    fill(50);
    rect(showFruits.xcor, showFruits.grapesYcor, showFruits.width, showFruits.height);
    fill("green");
    text(showFruits.grapesText, showFruits.xcor, showFruits.grapesYcor, showFruits.width, showFruits.height);

    if (mouseX >= showFruits.leftText && mouseX <= showFruits.rightText && mouseY >= showFruits.grapesTopText && mouseY <= showFruits.grapesBottomText) {
      fill("green");
      rect(showFruits.xcor, showFruits.grapesYcor, showFruits.width, showFruits.height);
      fill(50);
      text(showFruits.grapesText, showFruits.xcor, showFruits.grapesYcor, showFruits.width, showFruits.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showFruits.grapesText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }
  
    fill(50);
    rect(showFruits.xcor, showFruits.orangesYcor, showFruits.width, showFruits.height);
    fill("green");
    text(showFruits.orangesText, showFruits.xcor, showFruits.orangesYcor, showFruits.width, showFruits.height);

    if (mouseX >= showFruits.leftText && mouseX <= showFruits.rightText && mouseY >= showFruits.orangesTopText && mouseY <= showFruits.bottomText) {
      fill("green");
      rect(showFruits.xcor, showFruits.orangesYcor, showFruits.width, showFruits.height);
      fill(50);
      text(showFruits.orangesText, showFruits.xcor, showFruits.orangesYcor, showFruits.width, showFruits.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showFruits.orangesText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }
  }

  if (mouseX >= showVegetables.leftText && mouseX <= showVegetables.rightText && mouseY >= showVegetables.topText && mouseY <= showVegetables.bottomText) {
    fill(50);
    rect(showVegetables.leftXcor, showVegetables.broccoliYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.broccoliText, showVegetables.leftXcor, showVegetables.broccoliYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.leftText && mouseX <= showVegetables.centerText && mouseY >= showVegetables.broccoliTopText && mouseY <= showVegetables.broccoliBottomText) {
      fill("green");
      rect(showVegetables.leftXcor, showVegetables.broccoliYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.broccoliText, showVegetables.leftXcor, showVegetables.broccoliYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.broccoliText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showVegetables.leftXcor, showVegetables.carrotsYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.carrotsText, showVegetables.leftXcor, showVegetables.carrotsYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.leftText && mouseX <= showVegetables.centerText && mouseY >= showVegetables.carrotsTopText && mouseY <= showVegetables.carrotsBottomText) {
      fill("green");
      rect(showVegetables.leftXcor, showVegetables.carrotsYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.carrotsText, showVegetables.leftXcor, showVegetables.carrotsYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.carrotsText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showVegetables.leftXcor, showVegetables.cucumbersYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.cucumbersText, showVegetables.leftXcor, showVegetables.cucumbersYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.leftText && mouseX <= showVegetables.centerText && mouseY >= showVegetables.cucumbersTopText && mouseY <= showVegetables.cucumbersBottomText) {
      fill("green");
      rect(showVegetables.leftXcor, showVegetables.cucumbersYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.cucumbersText, showVegetables.leftXcor, showVegetables.cucumbersYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.cucumbersText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showVegetables.leftXcor, showVegetables.lettuceYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.lettuceText, showVegetables.leftXcor, showVegetables.lettuceYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.leftText && mouseX <= showVegetables.centerText && mouseY >= showVegetables.lettuceTopText && mouseY <= showVegetables.lettuceBottomText) {
      fill("green");
      rect(showVegetables.leftXcor, showVegetables.lettuceYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.lettuceText, showVegetables.leftXcor, showVegetables.lettuceYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.lettuceText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showVegetables.leftXcor, showVegetables.mushroomsYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.mushroomsText, showVegetables.leftXcor, showVegetables.mushroomsYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.leftText && mouseX <= showVegetables.centerText && mouseY >= showVegetables.mushroomsTopText && mouseY <= showVegetables.bottomText) {
      fill("green");
      rect(showVegetables.leftXcor, showVegetables.mushroomsYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.mushroomsText, showVegetables.leftXcor, showVegetables.mushroomsYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.mushroomsText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showVegetables.rightXcor, showVegetables.onionsYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.onionsText, showVegetables.rightXcor, showVegetables.onionsYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.centerText && mouseX <= showVegetables.rightText && mouseY >= showVegetables.onionsTopText && mouseY <= showVegetables.onionsBottomText) {
      fill("green");
      rect(showVegetables.rightXcor, showVegetables.onionsYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.onionsText, showVegetables.rightXcor, showVegetables.onionsYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.onionsText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showVegetables.rightXcor, showVegetables.peppersYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.peppersText, showVegetables.rightXcor, showVegetables.peppersYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.centerText && mouseX <= showVegetables.rightText && mouseY >= showVegetables.peppersTopText && mouseY <= showVegetables.peppersBottomText) {
      fill("green");
      rect(showVegetables.rightXcor, showVegetables.peppersYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.peppersText, showVegetables.rightXcor, showVegetables.peppersYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.peppersText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showVegetables.rightXcor, showVegetables.potatoesYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.potatoesText, showVegetables.rightXcor, showVegetables.potatoesYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.centerText && mouseX <= showVegetables.rightText && mouseY >= showVegetables.potatoesTopText && mouseY <= showVegetables.potatoesBottomText) {
      fill("green");
      rect(showVegetables.rightXcor, showVegetables.potatoesYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.potatoesText, showVegetables.rightXcor, showVegetables.potatoesYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.potatoesText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showVegetables.rightXcor, showVegetables.spinachYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.spinachText, showVegetables.rightXcor, showVegetables.spinachYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.centerText && mouseX <= showVegetables.rightText && mouseY >= showVegetables.spinachTopText && mouseY <= showVegetables.spinachBottomText) {
      fill("green");
      rect(showVegetables.rightXcor, showVegetables.spinachYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.spinachText, showVegetables.rightXcor, showVegetables.spinachYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.spinachText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showVegetables.rightXcor, showVegetables.tomatoesYcor, showVegetables.width, showVegetables.height);
    fill("green");
    text(showVegetables.tomatoesText, showVegetables.rightXcor, showVegetables.tomatoesYcor, showVegetables.width, showVegetables.height);

    if (mouseX >= showVegetables.centerText && mouseX <= showVegetables.rightText && mouseY >= showVegetables.tomatoesTopText && mouseY <= showVegetables.bottomText) {
      fill("green");
      rect(showVegetables.rightXcor, showVegetables.tomatoesYcor, showVegetables.width, showVegetables.height);
      fill(50);
      text(showVegetables.tomatoesText, showVegetables.rightXcor, showVegetables.tomatoesYcor, showVegetables.width, showVegetables.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;
  
        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showVegetables.tomatoesText);
          
          if (items === 1) {
            createGrocery1();
          }
  
          else if (items === 2) {
            createGrocery2();
          }
  
          else if (items === 3) {
            createGrocery3();
          }
  
          else if (items === 4) {
            createGrocery4();
          }
  
          else if (items === 5) {
            createGrocery5();
          }
        }
  
        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }
  }

  if (mouseX >= showMeat.leftText && mouseX <= showMeat.rightText && mouseY >= showMeat.topText && mouseY <= showMeat.bottomText) {
    fill(50);
    rect(showMeat.xcor, showMeat.beefYcor, showMeat.width, showMeat.height);
    fill("green");
    text(showMeat.beefText, showMeat.xcor, showMeat.beefYcor, showMeat.width, showMeat.height);

    if (mouseX >= showMeat.leftText && mouseX <= showMeat.rightText && mouseY >= showMeat.beefTopText && mouseY <= showMeat.beefBottomText) {
      fill("green");
      rect(showMeat.xcor, showMeat.beefYcor, showMeat.width, showMeat.height);
      fill(50);
      text(showMeat.beefText, showMeat.xcor, showMeat.beefYcor, showMeat.width, showMeat.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showMeat.beefText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }

    fill(50);
    rect(showMeat.xcor, showMeat.chickenYcor, showMeat.width, showMeat.height);
    fill("green");
    text(showMeat.chickenText, showMeat.xcor, showMeat.chickenYcor, showMeat.width, showMeat.height);

    if (mouseX >= showMeat.leftText && mouseX <= showMeat.rightText && mouseY >= showMeat.chickenTopText && mouseY <= showMeat.chickenBottomText) {
      fill("green");
      rect(showMeat.xcor, showMeat.chickenYcor, showMeat.width, showMeat.height);
      fill(50);
      text(showMeat.chickenText, showMeat.xcor, showMeat.chickenYcor, showMeat.width, showMeat.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showMeat.chickenText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }
  
    fill(50);
    rect(showMeat.xcor, showMeat.duckYcor, showMeat.width, showMeat.height);
    fill("green");
    text(showMeat.duckText, showMeat.xcor, showMeat.duckYcor, showMeat.width, showMeat.height);

    if (mouseX >= showMeat.leftText && mouseX <= showMeat.rightText && mouseY >= showMeat.duckTopText && mouseY <= showMeat.duckBottomText) {
      fill("green");
      rect(showMeat.xcor, showMeat.duckYcor, showMeat.width, showMeat.height);
      fill(50);
      text(showMeat.duckText, showMeat.xcor, showMeat.duckYcor, showMeat.width, showMeat.height);  

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showMeat.duckText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }
  
    fill(50);
    rect(showMeat.xcor, showMeat.lambYcor, showMeat.width, showMeat.height);
    fill("green");
    text(showMeat.lambText, showMeat.xcor, showMeat.lambYcor, showMeat.width, showMeat.height);

    if (mouseX >= showMeat.leftText && mouseX <= showMeat.rightText && mouseY >= showMeat.lambTopText && mouseY <= showMeat.lambBottomText) {
      fill("green");
      rect(showMeat.xcor, showMeat.lambYcor, showMeat.width, showMeat.height);
      fill(50);
      text(showMeat.lambText, showMeat.xcor, showMeat.lambYcor, showMeat.width, showMeat.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showMeat.lambText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }
  
    fill(50);
    rect(showMeat.xcor, showMeat.porkYcor, showMeat.width, showMeat.height);
    fill("green");
    text(showMeat.porkText, showMeat.xcor, showMeat.porkYcor, showMeat.width, showMeat.height);

    if (mouseX >= showMeat.leftText && mouseX <= showMeat.rightText && mouseY >= showMeat.porkTopText && mouseY <= showMeat.bottomText) {
      fill("green");
      rect(showMeat.xcor, showMeat.porkYcor, showMeat.width, showMeat.height);
      fill(50);
      text(showMeat.porkText, showMeat.xcor, showMeat.porkYcor, showMeat.width, showMeat.height);

      if (mouseIsPressed) {
        groceriesDisplayed = false;

        if (computerBoyChoice === "Yes") {
          boyWant.play();
          items ++;
          newComputerBoyChoice();
          groceryList.push(showMeat.porkText);
          
          if (items === 1) {
            createGrocery1();
          }

          else if (items === 2) {
            createGrocery2();
          }

          else if (items === 3) {
            createGrocery3();
          }

          else if (items === 4) {
            createGrocery4();
          }

          else if (items === 5) {
            createGrocery5();
          }
        }

        else {
          boyNoWant.play();
          patience --;
          newComputerBoyChoice();
        }
      }
    }
  }
}

function createList() {
  // <div> for grocery list header and styling/alignment (same styling/alignment for the following five <div> elements)
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
}

function createGrocery1() {
  // <div> for first item
  showGrocery1 = createDiv(`${groceryList[0]}`);
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
}

function createGrocery2() {
  // <div> for second item
  showGrocery2 = createDiv(`${groceryList[1]}`);
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
}

function createGrocery3() {
  // Pattern from previous two functions follow for the following createGrocery() functions
  showGrocery3 = createDiv(`${groceryList[2]}`);
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
}

function createGrocery4() {
  showGrocery4 = createDiv(`${groceryList[3]}`);
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
}

function createGrocery5() {
  showGrocery5 = createDiv(`${groceryList[4]}`);
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
  listDisplayed = true;
  showList.show();

  // If the list has one item, it only has to show the one item
  if (items === 1) {
    showGrocery1.show();
  }
 
  // If the list has two items, it shows both the first and second items
  if (items === 2) {
    showGrocery1.show();
    showGrocery2.show();
  }

  // Following "if" statements follow the same pattern as above
  if (items === 3) {
    showGrocery1.show();
    showGrocery2.show();
    showGrocery3.show();
  }

  if (items === 4) {
    showGrocery1.show();
    showGrocery2.show();
    showGrocery3.show();
    showGrocery4.show();
  }
  
  if (items === 5) {
    showGrocery1.show();
    showGrocery2.show();
    showGrocery3.show();
    showGrocery4.show();
    showGrocery5.show();
  }
}

function game() {
  // You are able to play the game as long as the number of items are less than 5 and Dad's patience is greater than 0
  if (items < 5 && patience > 0) {
    displayGameScreen();

    // Hovering over the "Add Items" button flips the groceriesDisplayed boolean to true, displaying the groceries
    if (mouseX >= button.leftAddItemsText && mouseX <= button.rightAddItemsText && mouseY >= button.topText && mouseY <= button.bottomText && listDisplayed === false) {
      fill("green");
      rect(button.addItemsButtonXcor, button.ycor, button.width, button.height);
      fill(50);
      text(button.addItemsText, button.addItemsButtonXcor, button.textYcor);
      groceriesDisplayed = true;
    }
  
    if (groceriesDisplayed) {
      displayGroceries();
    }
    
    // Hovering over the "View List" button changes the button's colour, while clicking on it (called in mousePressed(), ~line 100) shows the list
    if (mouseX >= button.leftViewListText && mouseX <= button.rightViewListText && mouseY >= button.topText && mouseY <= button.bottomText && groceriesDisplayed === false) {
      fill("green");
      rect(button.viewListButtonXcor, button.ycor, button.width, button.height);
      fill(50);
      text(button.viewListText, button.viewListButtonXcor, button.textYcor);
    }
  }

  // If the grocery list has 5 items, the family goes grocery shopping (win)
  else if (items === 5) {
    gameScreen = "Get Groceries";
  }

  // If Dad's patience hits 0, you and your brother get grounded (loss)
  else {
    gameScreen = "Get Grounded";
  }
}

function displayGameOverScreens() {
  let textBoxes = {
    xcor: width/2,
    ycor: height/2,
    width: width,
    height: height,
  };

  return textBoxes;
}

function win() {
  fill("green");
  text(`Congratulations! Dad is happy and you can all go to the grocery store to buy some ${groceryList[0].toLowerCase()}, ${groceryList[1].toLowerCase()}, ${groceryList[2].toLowerCase()}, ${groceryList[3].toLowerCase()}, and ${groceryList[4].toLowerCase()}! Have fun getting groceries!`, textBoxes.xcor, textBoxes.ycor, textBoxes.width, textBoxes.height);
}

function loss() {
  dadAngry.play();
  fill("red");
  text("Oh no! Your brother pushed Dad to the max! Have fun getting grounded!", textBoxes.xcor, textBoxes.ycor, textBoxes.width, textBoxes.height);
}