// Grid-Based Game
// Gabe PausJenssen
// November 13, 2023
//
// Extra for Experts:
// Created the snakes and the ladders from scratch
// If you turn your head to the right 45°, the third ladder (from 42 to 95) is the standout because 
// The fourth snake (from 97 to 25) is the standout because 

const BOARD_SIZE = 10;

let gameScreen = "Game";

let squareSize;
let board;
let centerBoard;
let numberBoard;

let ladder1;
let ladder2;
let ladder3;
let ladder4;

let moveStep;
let moveStepX;
let moveStepY;
let stepsNeeded;

let snake1;
let snake2;
let snake3;
let snake4;

let spreadEyes;
let spreadEyesMore;

let playerX;
let playerY;
let playerPos = 0;
let winPos = 100;

let die;
let diePos;
let dieState;
let dieRolls = 0;

let switchDie = 0;
let redDuration = 250;

let landedOnLadder = 0;
let landedOnSnake = 0;

let positions;
let position0;
let positions1to10;
let positions11to20;
let positions21to30;
let positions31to40;
let positions41to50;
let positions51to60;
let positions61to70;
let positions71to80;
let positions81to90;
let positions91to100;
let position100;

let winText;

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

  generatePositions();
  playerX = positions[playerPos].x;
  playerY = positions[playerPos].y;

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

  generatePositions();
  playerX = positions[playerPos].x;
  playerY = positions[playerPos].y;

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

  if (playerPos >= winPos) {
    createWinStats();
  }
}

function generatePositions() {
  positions = [];

  position0 = {
    x: centerBoard - 0.5*squareSize,
    y: 9.5*squareSize,
  };

  positions.push(position0);

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions1to10 = {
      x: centerBoard + 0.5*squareSize + currentPos*squareSize,
      y: 9.5*squareSize,
    };

    positions.push(positions1to10);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions11to20 = {
      x: centerBoard + 9.5*squareSize - currentPos*squareSize,
      y: 8.5*squareSize,
    };

    positions.push(positions11to20);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions21to30 = {
      x: centerBoard + 0.5*squareSize + currentPos*squareSize,
      y: 7.5*squareSize,
    };

    positions.push(positions21to30);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions31to40 = {
      x: centerBoard + 9.5*squareSize - currentPos*squareSize,
      y: 6.5*squareSize,
    };

    positions.push(positions31to40);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions41to50 = {
      x: centerBoard + 0.5*squareSize + currentPos*squareSize,
      y: 5.5*squareSize,
    };

    positions.push(positions41to50);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions51to60 = {
      x: centerBoard + 9.5*squareSize - currentPos*squareSize,
      y: 4.5*squareSize,
    };

    positions.push(positions51to60);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions61to70 = {
      x: centerBoard + 0.5*squareSize + currentPos*squareSize,
      y: 3.5*squareSize,
    };

    positions.push(positions61to70);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions71to80 = {
      x: centerBoard + 9.5*squareSize - currentPos*squareSize,
      y: 2.5*squareSize,
    };

    positions.push(positions71to80);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions81to90 = {
      x: centerBoard + 0.5*squareSize + currentPos*squareSize,
      y: 1.5*squareSize,
    };

    positions.push(positions81to90);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE; currentPos++) {
    positions91to100 = {
      x: centerBoard + 9.5*squareSize - currentPos*squareSize,
      y: 0.5*squareSize,
    };

    positions.push(positions91to100);
  }

  for (let currentPos = 0; currentPos < BOARD_SIZE/2; currentPos++) {
    position100 = {
      x: centerBoard + 0.5*squareSize,
      y: 0.5*squareSize,
    };

    positions.push(position100);
  }
}

function firstLadder() {
  ladder1 = {
    bottom: 11,
    top: 33,
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
  ladder2 = {
    bottom: 20,
    top: 92,
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
  ladder3 = {
    bottom: 42,
    top: 95,
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
  ladder4 = {
    bottom: 51,
    top: 71,
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
  moveStep = squareSize/5;
  stepsNeeded = 10;

  for (let stepNumber = 1; stepNumber < stepsNeeded; stepNumber++) {
    line(ladder1.leftX1 - moveStep, ladder1.leftY1 - moveStep, ladder1.rightX1 - moveStep, ladder1.rightY1 - moveStep);
    moveStep += squareSize/5;
  }
}

function secondLadderSteps() {
  moveStep = squareSize/5;
  stepsNeeded = 40;

  for (let stepNumber = 1; stepNumber < stepsNeeded; stepNumber++) {
    line(ladder2.leftX1 + moveStep, ladder2.leftY1 - moveStep, ladder2.rightX1 + moveStep, ladder2.rightY1 - moveStep);
    moveStep += squareSize/5;
  }
}

function thirdLadderSteps() {
  moveStep = squareSize/5;
  moveStepX = 0;
  moveStepY = -squareSize/25;
  stepsNeeded = 25;

  for (let stepNumber = 1; stepNumber < stepsNeeded; stepNumber++) {
    line(ladder3.leftX1 + moveStep + moveStepX, ladder3.leftY1 - moveStep + moveStepY, ladder3.rightX1 + moveStep + moveStepX, ladder3.rightY1 - moveStep + moveStepY);
    moveStep += squareSize/5;
    moveStepX += -squareSize/25;
  }
}

function fourthLadderSteps() {
  moveStep = squareSize/5;
  stepsNeeded = 10;
  
  for (let stepNumber = 1; stepNumber < stepsNeeded; stepNumber++) {
    line(ladder4.leftX1, ladder4.leftY1 - moveStep, ladder4.rightX1, ladder4.rightY1 - moveStep);
    moveStep += squareSize/5;
  }
}

function firstSnake() {
  snake1 = {
    top: 22,
    bottom: 8,
    x1: centerBoard + 1.5*squareSize,
    y1: 7.5*squareSize,
    curveX: centerBoard + 3.5*squareSize,
    curveY: 9.5*squareSize,
    x2: centerBoard + 7.5*squareSize,
    y2: 9.5*squareSize,
  };
}

function secondSnake() {
  snake2 = {
    top: 37,
    bottom: 14,
    x1: centerBoard + 3.5*squareSize,
    y1: 6.5*squareSize,
    curveX: centerBoard + 4.5*squareSize,
    curveY: 8.5*squareSize,
    x2: centerBoard + 6.5*squareSize,
    y2: 8.5*squareSize,
  };
}

function thirdSnake() {
  snake3 = {
    top: 45,
    bottom: 12,
    x1: centerBoard + 4.5*squareSize,
    y1: 5.5*squareSize,
    curveX: centerBoard + 7.5*squareSize,
    curveY: 5.5*squareSize,
    x2: centerBoard + 8.5*squareSize,
    y2: 8.5*squareSize,
  };
}

function fourthSnake() {
  snake4 = {
    top: 97,
    bottom: 25,
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

  point(snake1.x1 - spreadEyes, snake1.y1 + spreadEyes);
  point(snake1.x1 + spreadEyes, snake1.y1 - spreadEyes);

  point(snake2.x1 - spreadEyes, snake2.y1 + spreadEyes);
  point(snake2.x1 + spreadEyes, snake2.y1 - spreadEyes);

  point(snake3.x1, snake3.y1 + spreadEyesMore);
  point(snake3.x1, snake3.y1 - spreadEyesMore);

  point(snake4.x1 - spreadEyesMore, snake4.y1);
  point(snake4.x1 + spreadEyesMore, snake4.y1);
}

function numberDie() {
  if (dieState === 1) {
    point(diePos.middleX, diePos.middleY);
  }
  
  else if (dieState === 2) {
    point(diePos.left, diePos.lower);
    point(diePos.right, diePos.upper);
  }

  else if (dieState === 3) {
    point(diePos.left, diePos.lower);
    point(diePos.middleX, diePos.middleY);
    point(diePos.right, diePos.upper);
  }

  else if (dieState === 4) {
    point(diePos.left, diePos.upper);
    point(diePos.right, diePos.upper);
    point(diePos.left, diePos.lower);
    point(diePos.right, diePos.lower);
  }
  
  else if (dieState === 5) {
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

  line(ladder1.leftX1, ladder1.leftY1, ladder1.leftX2, ladder1.leftY2);
  line(ladder1.rightX1, ladder1.rightY1, ladder1.rightX2, ladder1.rightY2);

  line(ladder2.leftX1, ladder2.leftY1, ladder2.leftX2, ladder2.leftY2);
  line(ladder2.rightX1, ladder2.rightY1, ladder2.rightX2, ladder2.rightY2);
  
  line(ladder3.leftX1, ladder3.leftY1, ladder3.leftX2, ladder3.leftY2);
  line(ladder3.rightX1, ladder3.rightY1, ladder3.rightX2, ladder3.rightY2);

  line(ladder4.leftX1, ladder4.leftY1, ladder4.leftX2, ladder4.leftY2);
  line(ladder4.rightX1, ladder4.rightY1, ladder4.rightX2, ladder4.rightY2);

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
  curveVertex(snake1.x1, snake1.y1);
  curveVertex(snake1.x1, snake1.y1);
  curveVertex(snake1.curveX, snake1.curveY);
  curveVertex(snake1.x2, snake1.y2);
  curveVertex(snake1.x2, snake1.y2);
  endShape();

  beginShape();
  curveVertex(snake2.x1, snake2.y1);
  curveVertex(snake2.x1, snake2.y1);
  curveVertex(snake2.curveX, snake2.curveY);
  curveVertex(snake2.x2, snake2.y2);
  curveVertex(snake2.x2, snake2.y2);
  endShape();

  beginShape();
  curveVertex(snake3.x1, snake3.y1);
  curveVertex(snake3.x1, snake3.y1);
  curveVertex(snake3.curveX, snake3.curveY);
  curveVertex(snake3.x2, snake3.y2);
  curveVertex(snake3.x2, snake3.y2);
  endShape();

  beginShape();
  curveVertex(snake4.x1, snake4.y1);
  curveVertex(snake4.x1, snake4.y1);
  curveVertex(snake4.x1, snake4.curveY1);
  curveVertex(snake4.x2, snake4.curveY2);
  curveVertex(snake4.x2, snake4.curveY3);
  curveVertex(snake4.x1, snake4.curveY4);
  curveVertex(snake4.x1, snake4.curveY5);
  curveVertex(snake4.x2, snake4.curveY6);
  curveVertex(snake4.x2, snake4.y2);
  curveVertex(snake4.x2, snake4.y2);
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
  numberDie();
}

function createPlayer() {
  stroke("red");
  strokeWeight(25);
  point(playerX, playerY);
}

function mousePressed() {
  if (mouseX >= die.x && mouseX <= die.x + squareSize && mouseY >= die.y && mouseY <= die.y + squareSize && gameScreen === "Game") {
    newDie();
    movePlayer();
  }
}

function newDie() {
  dieRolls++;
  dieState = Math.round(random(1, 6));
  switchDie = millis();
}

function movePlayer() {
  playerPos += dieState;
  playerX = positions[playerPos].x;
  playerY = positions[playerPos].y;
  playerOnLadder();
  playerOnSnake();
}

function playerOnLadder() {
  if (playerPos === ladder1.bottom) {
    playerPos = ladder1.top;
    playerX = positions[ladder1.top].x;
    playerY = positions[ladder1.top].y;
    landedOnLadder++;
  }

  if (playerPos === ladder2.bottom) {
    playerPos = ladder2.top;
    playerX = positions[ladder2.top].x;
    playerY = positions[ladder2.top].y;
    landedOnLadder++;
  }

  if (playerPos === ladder3.bottom) {
    playerPos = ladder3.top;
    playerX = positions[ladder3.top].x;
    playerY = positions[ladder3.top].y;
    landedOnLadder++;
  }

  if (playerPos === ladder4.bottom) {
    playerPos = ladder4.top;
    playerX = positions[ladder4.top].x;
    playerY = positions[ladder4.top].y;
    landedOnLadder++;
  }
}

function playerOnSnake() {
  if (playerPos === snake1.top) {
    playerPos = snake1.bottom;
    playerX = positions[snake1.bottom].x;
    playerY = positions[snake1.bottom].y;
    landedOnSnake++;
  }

  if (playerPos === snake2.top) {
    playerPos = snake2.bottom;
    playerX = positions[snake2.bottom].x;
    playerY = positions[snake2.bottom].y;
    landedOnSnake++;
  }

  if (playerPos === snake3.top) {
    playerPos = snake3.bottom;
    playerX = positions[snake3.bottom].x;
    playerY = positions[snake3.bottom].y;
    landedOnSnake++;
  }

  if (playerPos === snake4.top) {
    playerPos = snake4.bottom;
    playerX = positions[snake4.bottom].x;
    playerY = positions[snake4.bottom].y;
    landedOnSnake++;
  }
}

function createWinStats() {
  winText = {
    textSize: 1.25*squareSize,
    x: 0,
    y: 0,
    width: width,
    height: height,
  };

  gameScreen = "Win";
  background(0);
  
  textAlign(CENTER, CENTER);
  textSize(winText.textSize);
  noStroke();
  fill("red");

  if (landedOnLadder !== 1 && landedOnSnake !== 1) {
    text(`Congratulations on winning the game in ${dieRolls} moves! You landed on ${landedOnLadder} ladders and ${landedOnSnake} snakes in the time.`, winText.x, winText.y, winText.width, winText.height);
  }

  else if (landedOnLadder === 1 && landedOnSnake !== 1) {
    text(`Congratulations on winning the game in ${dieRolls} moves! You landed on ${landedOnLadder} ladder and ${landedOnSnake} snakes in the time.`, winText.x, winText.y, winText.width, winText.height);
  }

  else if (landedOnLadder !== 1 && landedOnSnake === 1) {
    text(`Congratulations on winning the game in ${dieRolls} moves! You landed on ${landedOnLadder} ladders and ${landedOnSnake} snake in the time.`, winText.x, winText.y, winText.width, winText.height);
  }

  else {
    text(`Congratulations on winning the game in ${dieRolls} moves! You landed on ${landedOnLadder} ladder and ${landedOnSnake} snake in the time.`, winText.x, winText.y, winText.width, winText.height);
  }
}