// Grid-Based Game
// Gabe PausJenssen
// November 13, 2023
//
// Extra for Experts:
// Created the snakes and the ladders from scratch
// The third ladder (from 42 to 95) is the standout ladder because it is angled and more math was required to properly adjust the steps
// The fourth snake (from 97 to 25) is the standout snake because it has multiple curves, whereas the other three have simply one curve

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
let playerPosition = 0;
let winPosition = 100;

let die;
let diePosition;
let dieNumber;
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

    // Locates the die differently, depending on whether the width or height is larger
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

  // The board is aligned to the far right by subtracting the entire board's width from the device's width
  // Dividing the above value by 2 shifts the board over a bit left to create an equal amount of whitespace on each side of the board
  // The x-coordinate centerBoard is the left side of the board
  centerBoard = (width - BOARD_SIZE*squareSize)/2;
  dieNumber = Math.round(random(1, 6));

  // Creates all possible positions on board and also where the player starts
  generatePositions();
  playerX = positions[playerPosition].x;
  playerY = positions[playerPosition].y;

  // Creates ladder objects
  firstLadder();
  secondLadder();
  thirdLadder();
  fourthLadder();

  // Creates snake objects
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

  // When resizing the window, the player's coordinates adjust to the new screen size, but remains in the same spot
  generatePositions();
  playerX = positions[playerPosition].x;
  playerY = positions[playerPosition].y;

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

  if (playerPosition >= winPosition) {
    createWinStats();
  }
}

function generatePositions() {
  positions = [];

  // Pushes starting position (0) to the positions array
  position0 = {
    x: centerBoard - 0.5*squareSize,
    y: 9.5*squareSize,
  };

  positions.push(position0);

  // Pushes positions 1 to 10 to the positions array (pattern follows)
  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions1to10 = {
      x: centerBoard + 0.5*squareSize + currentPosition*squareSize,
      y: 9.5*squareSize,
    };

    positions.push(positions1to10);
  }

  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions11to20 = {
      x: centerBoard + 9.5*squareSize - currentPosition*squareSize,
      y: 8.5*squareSize,
    };

    positions.push(positions11to20);
  }

  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions21to30 = {
      x: centerBoard + 0.5*squareSize + currentPosition*squareSize,
      y: 7.5*squareSize,
    };

    positions.push(positions21to30);
  }

  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions31to40 = {
      x: centerBoard + 9.5*squareSize - currentPosition*squareSize,
      y: 6.5*squareSize,
    };

    positions.push(positions31to40);
  }

  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions41to50 = {
      x: centerBoard + 0.5*squareSize + currentPosition*squareSize,
      y: 5.5*squareSize,
    };

    positions.push(positions41to50);
  }

  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions51to60 = {
      x: centerBoard + 9.5*squareSize - currentPosition*squareSize,
      y: 4.5*squareSize,
    };

    positions.push(positions51to60);
  }

  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions61to70 = {
      x: centerBoard + 0.5*squareSize + currentPosition*squareSize,
      y: 3.5*squareSize,
    };

    positions.push(positions61to70);
  }

  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions71to80 = {
      x: centerBoard + 9.5*squareSize - currentPosition*squareSize,
      y: 2.5*squareSize,
    };

    positions.push(positions71to80);
  }

  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions81to90 = {
      x: centerBoard + 0.5*squareSize + currentPosition*squareSize,
      y: 1.5*squareSize,
    };

    positions.push(positions81to90);
  }

  for (let currentPosition = 0; currentPosition < BOARD_SIZE; currentPosition++) {
    positions91to100 = {
      x: centerBoard + 9.5*squareSize - currentPosition*squareSize,
      y: 0.5*squareSize,
    };

    positions.push(positions91to100);
  }

  // Pushes win position (100) to the array five times
  // This is in case the player is between 95 and 99 and the following die roll would move the player between 101 and 105, so an error won't occur
  for (let currentPosition = 0; currentPosition < BOARD_SIZE/2; currentPosition++) {
    position100 = {
      x: centerBoard + 0.5*squareSize,
      y: 0.5*squareSize,
    };

    positions.push(position100);
  }
}

function firstLadder() {
  ladder1 = {
    // Positions of bottom and top of ladder (pattern follows)
    bottom: 11,
    top: 33,

    // Bottom of left side rail of ladder (pattern follows)
    leftX1: centerBoard + 28*squareSize/3,
    leftY1: 26*squareSize/3,

    // Top of left side rail of ladder (pattern follows)
    leftX2: centerBoard + 22*squareSize/3,
    leftY2: 20*squareSize/3,

    // Bottom of right side rail of ladder (pattern follows)
    rightX1: centerBoard + 29*squareSize/3,
    rightY1: 25*squareSize/3,

    // Top of right side rail of ladder (pattern follows)
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
    // Each step moving up moves to the left and up by moveStep, and moveStep increases with each step up
    line(ladder1.leftX1 - moveStep, ladder1.leftY1 - moveStep, ladder1.rightX1 - moveStep, ladder1.rightY1 - moveStep);
    moveStep += squareSize/5;
  }
}

function secondLadderSteps() {
  moveStep = squareSize/5;
  stepsNeeded = 40;

  for (let stepNumber = 1; stepNumber < stepsNeeded; stepNumber++) {
    // Each step moving up moves to the right and up by moveStep, and moveStep increases with each step up
    line(ladder2.leftX1 + moveStep, ladder2.leftY1 - moveStep, ladder2.rightX1 + moveStep, ladder2.rightY1 - moveStep);
    moveStep += squareSize/5;
  }
}

function thirdLadderSteps() {
  // Special angled ladder: the x values decreases slightly more with each step up
  // Also, the y values are each subtracted by squareSize/25 to move each step up slightly higher
  moveStep = squareSize/5;
  moveStepX = 0;
  moveStepY = -squareSize/25;
  stepsNeeded = 25;

  for (let stepNumber = 1; stepNumber < stepsNeeded; stepNumber++) {
    // Each step moving up moves to the right and up by moveStep, and moveStep increases with each step up
    line(ladder3.leftX1 + moveStep + moveStepX, ladder3.leftY1 - moveStep + moveStepY, ladder3.rightX1 + moveStep + moveStepX, ladder3.rightY1 - moveStep + moveStepY);
    moveStep += squareSize/5;
    moveStepX += -squareSize/25;
  }
}

function fourthLadderSteps() {
  moveStep = squareSize/5;
  stepsNeeded = 10;
  
  for (let stepNumber = 1; stepNumber < stepsNeeded; stepNumber++) {
    // Each step moving up moves up by moveStep, and moveStep increases with each step up (x not affected)
    line(ladder4.leftX1, ladder4.leftY1 - moveStep, ladder4.rightX1, ladder4.rightY1 - moveStep);
    moveStep += squareSize/5;
  }
}

function firstSnake() {
  snake1 = {
    // Positions of top and bottom of snake (pattern follows)
    top: 22,
    bottom: 8,

    // Top of snake (pattern follows)
    x1: centerBoard + 1.5*squareSize,
    y1: 7.5*squareSize,

    // Control points of where the curve in the snake should take place (pattern follows)
    curveX: centerBoard + 3.5*squareSize,
    curveY: 9.5*squareSize,

    // Bottom of snake (pattern follows)
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

    // Three sets of control points are created to create the special curvy snake
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
  // The distance between the two eyes of the first two snakes are even, as they both travel southeast
  // The distance between the two eyes of the third snake is higher because the snake travels east
  // The distance between the two eyes of the fourth snake is longer because the snake travels south
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
  // The random choice of dieNumber between 1 and 6 determines how many points are on the die and where to display them
  if (dieNumber === 1) {
    point(diePosition.middleX, diePosition.middleY);
  }
  
  else if (dieNumber === 2) {
    point(diePosition.left, diePosition.lower);
    point(diePosition.right, diePosition.upper);
  }

  else if (dieNumber === 3) {
    point(diePosition.left, diePosition.lower);
    point(diePosition.middleX, diePosition.middleY);
    point(diePosition.right, diePosition.upper);
  }

  else if (dieNumber === 4) {
    point(diePosition.left, diePosition.upper);
    point(diePosition.right, diePosition.upper);
    point(diePosition.left, diePosition.lower);
    point(diePosition.right, diePosition.lower);
  }
  
  else if (dieNumber === 5) {
    point(diePosition.left, diePosition.upper);
    point(diePosition.right, diePosition.upper);
    point(diePosition.middleX, diePosition.middleY);
    point(diePosition.left, diePosition.lower);
    point(diePosition.right, diePosition.lower);
  }

  else {
    point(diePosition.left, diePosition.upper);
    point(diePosition.right, diePosition.upper);
    point(diePosition.left, diePosition.middleY);
    point(diePosition.right, diePosition.middleY);
    point(diePosition.left, diePosition.lower);
    point(diePosition.right, diePosition.lower);
  }
}

function createBoard() {
  board = [];
  numberBoard = 110;
  noStroke();

  for (let columns = 0; columns < BOARD_SIZE; columns++) {
    board.push([]);

    if (columns % 2 === 0) {
      // If the column number is even, the first number of the new row will be 9 less than the last number of the previous row
      // Through each square of the row, the number keeps going down by 1 (shown in for loop below)
      // Ex. when numberBoard is 110, the first square of the row is 101, and the for loop makes the numbers of the squares be 100-91
      numberBoard -= 9;
    }
  
    else {
      // If the column number is odd, the first number of the new row will be 11 less than the last number of the previous row
      // Through each square of the row, the number keeps going up by 1 (shown in for loop below)
      // Ex. when numberBoard is 91, the first square of the row is 80, and the for loop makes the numbers of the squares be 81-90
      numberBoard -= 11;
    }
    
    for (let rows = 0; rows < BOARD_SIZE; rows++) {
      if (columns % 2 === 0) {
        // Even-numbered columns produce white squares for even-numbered rows and brown squares for odd-numbered rows
        if (rows % 2 === 0) {
          board[columns].push("white");
        }

        else {
          board[columns].push("brown");
        }

        // As we move along the row, the number on the board decreases by 1 so that the last number ends in 1
        numberBoard--;
      }

      else {
        // Odd-numbered columns produce brown squares for even-numbered rows and white squares for odd-numbered rows
        if (rows % 2 === 0) {
          board[columns].push("brown");
        }

        else {
          board[columns].push("white");
        }

        // As we move along the row, the number on the board increases by 1 so that the last number ends in 0
        numberBoard++;
      }
      
      if (board[columns][rows] === "white") {
        fill("white");
        square(rows*squareSize + centerBoard, columns*squareSize, squareSize);
        fill("sienna");
        text(numberBoard, rows*squareSize + centerBoard, columns*squareSize, squareSize, squareSize);
      }

      else {
        fill("sienna");
        square(rows*squareSize + centerBoard, columns*squareSize, squareSize);
        fill("white");
        text(numberBoard, rows*squareSize + centerBoard, columns*squareSize, squareSize, squareSize);
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

  // The first curveVertex() argument is the starting point of the curve (pattern follows)
  // The curveVertex() arguments in the middle are the points where the curves occur (pattern follows)
  // The last curveVertex() argument is the ending point of the curve (pattern follows)
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
  diePosition = {
    left: die.x + 0.25*squareSize,
    middleX: die.x + 0.5*squareSize,
    right: die.x + 0.75*squareSize,

    upper: die.y + 0.25*squareSize,
    middleY: die.y + 0.5*squareSize,
    lower: die.y + 0.75*squareSize,
  };

  // After clicking on die, it turns red for 0.25 seconds (because redDuration = 250 milliseconds) then switches back to black
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
  // Clicking on the die rolls it and moves the player the number displayed on it
  if (mouseX >= die.x && mouseX <= die.x + squareSize && mouseY >= die.y && mouseY <= die.y + squareSize && gameScreen === "Game") {
    newDie();
    movePlayer();
  }
}

function newDie() {
  dieRolls++;
  dieNumber = Math.round(random(1, 6));
  switchDie = millis();
}

function movePlayer() {
  playerPosition += dieNumber;
  playerX = positions[playerPosition].x;
  playerY = positions[playerPosition].y;
  playerOnLadder();
  playerOnSnake();
}

function playerOnLadder() {
  // Detects if player is touching bottom of ladder; moves player to top of ladder and increases number of times landed on ladder (pattern follows)
  if (playerPosition === ladder1.bottom) {
    playerPosition = ladder1.top;
    playerX = positions[ladder1.top].x;
    playerY = positions[ladder1.top].y;
    landedOnLadder++;
  }

  if (playerPosition === ladder2.bottom) {
    playerPosition = ladder2.top;
    playerX = positions[ladder2.top].x;
    playerY = positions[ladder2.top].y;
    landedOnLadder++;
  }

  if (playerPosition === ladder3.bottom) {
    playerPosition = ladder3.top;
    playerX = positions[ladder3.top].x;
    playerY = positions[ladder3.top].y;
    landedOnLadder++;
  }

  if (playerPosition === ladder4.bottom) {
    playerPosition = ladder4.top;
    playerX = positions[ladder4.top].x;
    playerY = positions[ladder4.top].y;
    landedOnLadder++;
  }
}

function playerOnSnake() {
  // Detects if player is touching top of snake; moves player to bottom of snake and increases number of times landed on snake (pattern follows)
  if (playerPosition === snake1.top) {
    playerPosition = snake1.bottom;
    playerX = positions[snake1.bottom].x;
    playerY = positions[snake1.bottom].y;
    landedOnSnake++;
  }

  if (playerPosition === snake2.top) {
    playerPosition = snake2.bottom;
    playerX = positions[snake2.bottom].x;
    playerY = positions[snake2.bottom].y;
    landedOnSnake++;
  }

  if (playerPosition === snake3.top) {
    playerPosition = snake3.bottom;
    playerX = positions[snake3.bottom].x;
    playerY = positions[snake3.bottom].y;
    landedOnSnake++;
  }

  if (playerPosition === snake4.top) {
    playerPosition = snake4.bottom;
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

  // Win stats tell you how many die rolls you made, including how many times you landed on snakes and/or ladders
  // If statement adjusts text grammar (singular/plural) based on number of times landed on snakes and/or ladders
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