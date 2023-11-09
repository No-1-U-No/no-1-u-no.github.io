// Grid-Based Game
// Gabe PausJenssen
// November 13, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// School computer: (1600, 775)

// DO NOT function values() or displayObjects(); ONLY create global variables

// Snakes & Ladders game

const BOARD_SIZE = 10;

let squareSize;
let board;
let centerBoard;
let numberBoard;

let elevenLadder;
let twentyLadder;
let fortyTwoLadder;
let fiftyOneLadder;

let twentyTwoSnake;
let thirtySevenSnake;
let fortyFiveSnake;
let ninetySevenSnake;

let stepCor;
let stepXcor;
let stepYcor;
let stepNumber;

let spreadEyes;
let spreadEyesMore;

let playerX;
let playerY;
let playerPos;

let die;
let dieState;
let dieRolls = 0;
let diePos;
let switchDie = 0;
let redDuration = 250;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (width > height) {
    squareSize = height/BOARD_SIZE;

    die = {
      x: width - squareSize - width/160,
      y: 4.5*squareSize,
    };
  }

  else {
    squareSize = width/BOARD_SIZE;

    die = {
      x: width/2 - 0.5*squareSize,
      y: height - squareSize - height/160,
    };
  }

  centerBoard = (width - BOARD_SIZE*squareSize)/2;
  dieState = random(1, 6);

  firstLadder();
  secondLadder();
  thirdLadder();
  fourthLadder();

  firstSnake();
  secondSnake();
  thirdSnake();
  fourthSnake();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  if (width > height) {
    squareSize = height/BOARD_SIZE;

    die = {
      x: width - squareSize - width/160,
      y: 4.5*squareSize,
    };
  }

  else {
    squareSize = width/BOARD_SIZE;

    die = {
      x: width/2 - 0.5*squareSize,
      y: height - squareSize - height/160,
    };
  }

  centerBoard = (width - BOARD_SIZE*squareSize)/2;

  firstLadder();
  secondLadder();
  thirdLadder();
  fourthLadder();

  firstSnake();
  secondSnake();
  thirdSnake();
  fourthSnake();
}

function draw() {
  background(220);
  createBoard();
  createLadders();
  createSnakes();
  createDie();
  createPlayer();
}

function firstLadder() {
  elevenLadder = {
    leftX1: centerBoard + 28*squareSize/3,
    leftY1: 26*squareSize/3,
    leftX2: centerBoard + 22*squareSize/3,
    leftY2: 20*squareSize/3,
    rightX1: centerBoard + 29*squareSize/3,
    rightY1: 25*squareSize/3,
    rightX2: centerBoard + 23*squareSize/3,
    rightY2: 19*squareSize/3,
  };
}

function secondLadder() {
  twentyLadder = {
    leftX1: centerBoard + squareSize/3,
    leftY1: 25*squareSize/3,
    leftX2: centerBoard + 25*squareSize/3,
    leftY2: squareSize/3,
    rightX1: centerBoard + 2*squareSize/3,
    rightY1: 26*squareSize/3,
    rightX2: centerBoard + 26*squareSize/3,
    rightY2: 2*squareSize/3,
  };
}

function thirdLadder() {
  fortyTwoLadder = {
    leftX1: centerBoard + 4*squareSize/3,
    leftY1: 16*squareSize/3,
    leftX2: centerBoard + 16*squareSize/3,
    leftY2: squareSize/3,
    rightX1: centerBoard + 5*squareSize/3,
    rightY1: 17*squareSize/3,
    rightX2: centerBoard + 17*squareSize/3,
    rightY2: 2*squareSize/3,
  };
}

function fourthLadder() {
  fiftyOneLadder = {
    leftX1: centerBoard + 9.25*squareSize,
    leftY1: 4.5*squareSize,
    leftX2: centerBoard + 9.25*squareSize,
    leftY2: 2.5*squareSize,
    rightX1: centerBoard + 9.75*squareSize,
    rightY1: 4.5*squareSize,
    rightX2: centerBoard + 9.75*squareSize,
    rightY2: 2.5*squareSize,
  };
}

function firstLadderSteps() {
  stepCor = squareSize/5;
  stepNumber = 0;

  while (stepNumber < 9) {
    line(elevenLadder.leftX1 - stepCor, elevenLadder.leftY1 - stepCor, elevenLadder.rightX1 - stepCor, elevenLadder.rightY1 - stepCor);
    stepCor += squareSize/5;
    stepNumber++;
  }
}

function secondLadderSteps() {
  stepCor = squareSize/5;
  stepNumber = 0;

  while (stepNumber < 39) {
    line(twentyLadder.leftX1 + stepCor, twentyLadder.leftY1 - stepCor, twentyLadder.rightX1 + stepCor, twentyLadder.rightY1 - stepCor);
    stepCor += squareSize/5;
    stepNumber++;
  }
}

function thirdLadderSteps() {
  stepCor = squareSize/5;
  stepXcor = 0;
  stepYcor = -squareSize/25;
  stepNumber = 0;

  while (stepNumber < 24) {
    line(fortyTwoLadder.leftX1 + stepCor + stepXcor, fortyTwoLadder.leftY1 - stepCor + stepYcor, fortyTwoLadder.rightX1 + stepCor + stepXcor, fortyTwoLadder.rightY1 - stepCor + stepYcor);
    stepCor += squareSize/5;
    stepXcor -= squareSize/25;
    stepNumber++;
  }
}

function fourthLadderSteps() {
  stepCor = squareSize/5;
  stepNumber = 0;
  
  while (stepNumber < 9) {
    line(fiftyOneLadder.leftX1, fiftyOneLadder.leftY1 - stepCor, fiftyOneLadder.rightX1, fiftyOneLadder.rightY1 - stepCor);
    stepCor += squareSize/5;
    stepNumber++;
  }
}

function firstSnake() {
  twentyTwoSnake = {
    x1: centerBoard + 1.5*squareSize,
    y1: 7.5*squareSize,
    curveX: centerBoard + 3.5*squareSize,
    curveY: 9.5*squareSize,
    x2: centerBoard + 7.5*squareSize,
    y2: 9.5*squareSize,
  };
}

function secondSnake() {
  thirtySevenSnake = {
    x1: centerBoard + 3.5*squareSize,
    y1: 6.5*squareSize,
    curveX: centerBoard + 4.5*squareSize,
    curveY: 8.5*squareSize,
    x2: centerBoard + 6.5*squareSize,
    y2: 8.5*squareSize,
  };
}

function thirdSnake() {
  fortyFiveSnake = {
    x1: centerBoard + 4.5*squareSize,
    y1: 5.5*squareSize,
    curveX: centerBoard + 7.5*squareSize,
    curveY: 5.5*squareSize,
    x2: centerBoard + 8.5*squareSize,
    y2: 8.5*squareSize,
  };
}

function fourthSnake() {
  ninetySevenSnake = {
    x1: centerBoard + 3.5*squareSize,
    y1: 0.5*squareSize,
    curveY1: 1.5*squareSize,
    curveY2: 2.5*squareSize,
    curveY3: 3.5*squareSize,
    curveY4: 4.5*squareSize,
    curveY5: 5.5*squareSize,
    curveY6: 6.5*squareSize,
    x2: centerBoard + 4.5*squareSize,
    y2: 7.5*squareSize,
  };
}

function snakeEyes() {
  spreadEyes = squareSize/35;
  spreadEyesMore = squareSize/25;

  point(twentyTwoSnake.x1 - spreadEyes, twentyTwoSnake.y1 + spreadEyes);
  point(twentyTwoSnake.x1 + spreadEyes, twentyTwoSnake.y1 - spreadEyes);

  point(thirtySevenSnake.x1 - spreadEyes, thirtySevenSnake.y1 + spreadEyes);
  point(thirtySevenSnake.x1 + spreadEyes, thirtySevenSnake.y1 - spreadEyes/2);

  point(fortyFiveSnake.x1, fortyFiveSnake.y1 + spreadEyesMore);
  point(fortyFiveSnake.x1, fortyFiveSnake.y1 - spreadEyesMore);

  point(ninetySevenSnake.x1 - spreadEyesMore, ninetySevenSnake.y1);
  point(ninetySevenSnake.x1 + spreadEyesMore, ninetySevenSnake.y1);
}

function createBoard() {
  board = [];
  numberBoard = 110;

  noStroke();

  for (let y = 0; y < BOARD_SIZE; y++) {
    board.push([]);

    if (y % 2 === 0) {
      numberBoard -= 9;
    }
  
    else {
      numberBoard -= 11;
    }
    
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (y % 2 === 0) {
        if (x % 2 === 0) {
          board[y].push("white");
        }

        else {
          board[y].push("brown");
        }

        numberBoard--;
      }

      else {
        if (x % 2 === 0) {
          board[y].push("brown");
        }

        else {
          board[y].push("white");
        }

        numberBoard++;
      }
      
      if (board[y][x] === "white") {
        fill("white");
        square(x*squareSize + centerBoard, y*squareSize, squareSize);
        fill("sienna");
        text(numberBoard, x*squareSize + centerBoard, y*squareSize, squareSize, squareSize);
      }

      else {
        fill("sienna");
        square(x*squareSize + centerBoard, y*squareSize, squareSize);
        fill("white");
        text(numberBoard, x*squareSize + centerBoard, y*squareSize, squareSize, squareSize);
      }
    }
  }
}

function createLadders() {
  stroke("blue");
  strokeWeight(5);

  line(elevenLadder.leftX1, elevenLadder.leftY1, elevenLadder.leftX2, elevenLadder.leftY2);
  line(elevenLadder.rightX1, elevenLadder.rightY1, elevenLadder.rightX2, elevenLadder.rightY2);

  line(twentyLadder.leftX1, twentyLadder.leftY1, twentyLadder.leftX2, twentyLadder.leftY2);
  line(twentyLadder.rightX1, twentyLadder.rightY1, twentyLadder.rightX2, twentyLadder.rightY2);
  
  line(fortyTwoLadder.leftX1, fortyTwoLadder.leftY1, fortyTwoLadder.leftX2, fortyTwoLadder.leftY2);
  line(fortyTwoLadder.rightX1, fortyTwoLadder.rightY1, fortyTwoLadder.rightX2, fortyTwoLadder.rightY2);

  line(fiftyOneLadder.leftX1, fiftyOneLadder.leftY1, fiftyOneLadder.leftX2, fiftyOneLadder.leftY2);
  line(fiftyOneLadder.rightX1, fiftyOneLadder.rightY1, fiftyOneLadder.rightX2, fiftyOneLadder.rightY2);

  firstLadderSteps();
  secondLadderSteps();
  thirdLadderSteps();
  fourthLadderSteps();
}

function createSnakes() {
  noFill();
  stroke("springgreen");
  strokeWeight(5);

  beginShape();
  curveVertex(twentyTwoSnake.x1, twentyTwoSnake.y1);
  curveVertex(twentyTwoSnake.x1, twentyTwoSnake.y1);
  curveVertex(twentyTwoSnake.curveX, twentyTwoSnake.curveY);
  curveVertex(twentyTwoSnake.x2, twentyTwoSnake.y2);
  curveVertex(twentyTwoSnake.x2, twentyTwoSnake.y2);
  endShape();

  beginShape();
  curveVertex(thirtySevenSnake.x1, thirtySevenSnake.y1);
  curveVertex(thirtySevenSnake.x1, thirtySevenSnake.y1);
  curveVertex(thirtySevenSnake.curveX, thirtySevenSnake.curveY);
  curveVertex(thirtySevenSnake.x2, thirtySevenSnake.y2);
  curveVertex(thirtySevenSnake.x2, thirtySevenSnake.y2);
  endShape();

  beginShape();
  curveVertex(fortyFiveSnake.x1, fortyFiveSnake.y1);
  curveVertex(fortyFiveSnake.x1, fortyFiveSnake.y1);
  curveVertex(fortyFiveSnake.curveX, fortyFiveSnake.curveY);
  curveVertex(fortyFiveSnake.x2, fortyFiveSnake.y2);
  curveVertex(fortyFiveSnake.x2, fortyFiveSnake.y2);
  endShape();

  beginShape();
  curveVertex(ninetySevenSnake.x1, ninetySevenSnake.y1);
  curveVertex(ninetySevenSnake.x1, ninetySevenSnake.y1);
  curveVertex(ninetySevenSnake.x1, ninetySevenSnake.curveY1);
  curveVertex(ninetySevenSnake.x2, ninetySevenSnake.curveY2);
  curveVertex(ninetySevenSnake.x2, ninetySevenSnake.curveY3);
  curveVertex(ninetySevenSnake.x1, ninetySevenSnake.curveY4);
  curveVertex(ninetySevenSnake.x1, ninetySevenSnake.curveY5);
  curveVertex(ninetySevenSnake.x2, ninetySevenSnake.curveY6);
  curveVertex(ninetySevenSnake.x2, ninetySevenSnake.y2);
  curveVertex(ninetySevenSnake.x2, ninetySevenSnake.y2);
  endShape();

  stroke("black");
  snakeEyes();
}

function createDie() {
  diePos = {
    left: die.x + 0.25*squareSize,
    middleX: die.x + 0.5*squareSize,
    right: die.x + 0.75*squareSize,
    upper: die.y + 0.25*squareSize,
    middleY: die.y + 0.5*squareSize,
    lower: die.y + 0.75*squareSize,
  };

  if (millis() < switchDie + redDuration) {
    stroke("red");
    fill("red");
  }

  else {
    stroke("black");
    fill("black");
  }

  square(die.x, die.y, squareSize);
  stroke("white");
  strokeWeight(10);

  if (Math.round(dieState) === 1) {
    point(diePos.middleX, diePos.middleY);
  }
  
  else if (Math.round(dieState) === 2) {
    point(diePos.left, diePos.lower);
    point(diePos.right, diePos.upper);
  }

  else if (Math.round(dieState) === 3) {
    point(diePos.left, diePos.lower);
    point(diePos.middleX, diePos.middleY);
    point(diePos.right, diePos.upper);
  }

  else if (Math.round(dieState) === 4) {
    point(diePos.left, diePos.upper);
    point(diePos.right, diePos.upper);
    point(diePos.left, diePos.lower);
    point(diePos.right, diePos.lower);
  }
  
  else if (Math.round(dieState) === 5) {
    point(diePos.left, diePos.upper);
    point(diePos.right, diePos.upper);
    point(diePos.middleX, diePos.middleY);
    point(diePos.left, diePos.lower);
    point(diePos.right, diePos.lower);
  }

  else {
    point(diePos.left, diePos.upper);
    point(diePos.right, diePos.upper);
    point(diePos.left, diePos.middleY);
    point(diePos.right, diePos.middleY);
    point(diePos.left, diePos.lower);
    point(diePos.right, diePos.lower);
  }
}

function createPlayer() {
  stroke("red");
  strokeWeight(25);
  movePlayer();
}

function mousePressed() {
  if (mouseX >= die.x && mouseX <= die.x + squareSize && mouseY >= die.y && mouseY <= die.y + squareSize) {
    newDie();
  }
}

function newDie() {
  dieRolls++;
  dieState = random(1, 6);
  switchDie = millis();
}

function movePlayer() {
  playerX = centerBoard + 0.5*squareSize;
  playerY = 9.5*squareSize;
  playerPos = 1;

  if (dieRolls === 0) {
    point(playerX, playerY);
  }

  else {
    playerX += Math.round(dieState)*squareSize;
    playerPos += Math.round(dieState);
    point(playerX, playerY);
  }
}