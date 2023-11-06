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
let board = [];
let centerBoard;
let numerBoard;

let elevenLadder;
let twentyLadder;
let fortyTwoLadder;
let fiftyOneLadder;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (width > height) {
    squareSize = height/BOARD_SIZE;
  }

  else {
    squareSize = width/BOARD_SIZE;
  }

  centerBoard = (width - BOARD_SIZE*squareSize)/2;

  firstLadder();
  secondLadder();
  thirdLadder();
  fourthLadder();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  if (width > height) {
    squareSize = height/BOARD_SIZE;
  }

  else {
    squareSize = width/BOARD_SIZE;
  }

  centerBoard = (width - BOARD_SIZE*squareSize)/2;

  firstLadder();
  secondLadder();
  thirdLadder();
  fourthLadder();
}

function draw() {
  background(220);
  createBoard();
  createLadders();
  createSnakes();
}

function firstLadder() {
  elevenLadder = {
    x1: centerBoard + 28*squareSize/3,
    y1: 26*squareSize/3,
    x2: centerBoard + 22*squareSize/3,
    y2: 20*squareSize/3,
    x3: centerBoard + 29*squareSize/3,
    y3: 25*squareSize/3,
    x4: centerBoard + 23*squareSize/3,
    y4: 19*squareSize/3,
  };

  return elevenLadder;
}

function secondLadder() {
  twentyLadder = {
    x1: centerBoard + squareSize/3,
    y1: 25*squareSize/3,
    x2: centerBoard + 25*squareSize/3,
    y2: squareSize/3,
    x3: centerBoard + 2*squareSize/3,
    y3: 26*squareSize/3,
    x4: centerBoard + 26*squareSize/3,
    y4: 2*squareSize/3,
  };

  return twentyLadder;
}

function thirdLadder() {
  fortyTwoLadder = {
    x1: centerBoard + 4*squareSize/3,
    y1: 16*squareSize/3,
    x2: centerBoard + 16*squareSize/3,
    y2: squareSize/3,
    x3: centerBoard + 5*squareSize/3,
    y3: 17*squareSize/3,
    x4: centerBoard + 17*squareSize/3,
    y4: 2*squareSize/3,
  };

  return fortyTwoLadder;
}

function fourthLadder() {
  fiftyOneLadder = {
    x1: centerBoard + 9.25*squareSize,
    y1: 4.5*squareSize,
    x2: centerBoard + 9.25*squareSize,
    y2: 2.5*squareSize,
    x3: centerBoard + 9.75*squareSize,
    y3: 4.5*squareSize,
    x4: centerBoard + 9.75*squareSize,
    y4: 2.5*squareSize,
  };

  return fiftyOneLadder;
}

function firstLadderSteps() {
  let i = -squareSize/5;
  while (i > -2*squareSize) {
    line(elevenLadder.x1 + i, elevenLadder.y1 + i, elevenLadder.x3 + i, elevenLadder.y3 + i);
    i -= squareSize/5;
  }
}

function secondLadderSteps() {
  let i = squareSize/5;
  while (i < 7.8*squareSize) {
    line(twentyLadder.x1 + i, twentyLadder.y1 - i, twentyLadder.x3 + i, twentyLadder.y3 - i);
    i += squareSize/5;
  }
}

function thirdLadderSteps() {
  let i = squareSize/5;
  let j = 0;
  let k = 0;
  while (i < 4.8*squareSize) {
    line(fortyTwoLadder.x1 + i + j, fortyTwoLadder.y1 - i + k, fortyTwoLadder.x3 + i + j, fortyTwoLadder.y3 - i + k);
    i += squareSize/5;
    j -= squareSize/25;
    k -= squareSize/625;
  }
}

function fourthLadderSteps() {
  let i = squareSize/5;
  while (i < 2*squareSize) {
    line(fiftyOneLadder.x1, fiftyOneLadder.y1 - i, fiftyOneLadder.x3, fiftyOneLadder.y3 - i);
    i += squareSize/5;
  }
}

function createBoard() {
  let numerBoard = 110;

  for (let y = 0; y < BOARD_SIZE; y++) {
    board.push([]);

    if (y % 2 === 0) {
      numerBoard -= 9;
    }
  
    else {
      numerBoard -= 11;
    }
    
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (y % 2 === 0) {
        if (x % 2 === 0) {
          board[y].push("white");
        }

        else {
          board[y].push("brown");
        }

        numerBoard--;
      }

      else {
        if (x % 2 === 0) {
          board[y].push("brown");
        }

        else {
          board[y].push("white");
        }

        numerBoard++;
      }

      noStroke();
      
      if (board[y][x] === "white") {
        fill("white");
        square(x*squareSize + centerBoard, y*squareSize, squareSize);
        fill("brown");
        text(numerBoard, x*squareSize + centerBoard, y*squareSize, squareSize, squareSize);
      }

      else {
        fill("brown");
        square(x*squareSize + centerBoard, y*squareSize, squareSize);
        fill("white");
        text(numerBoard, x*squareSize + centerBoard, y*squareSize, squareSize, squareSize);
      }
    }
  }
}

function createLadders() {
  stroke("blue");
  strokeWeight(5);

  line(elevenLadder.x1, elevenLadder.y1, elevenLadder.x2, elevenLadder.y2);
  line(elevenLadder.x3, elevenLadder.y3, elevenLadder.x4, elevenLadder.y4);

  line(twentyLadder.x1, twentyLadder.y1, twentyLadder.x2, twentyLadder.y2);
  line(twentyLadder.x3, twentyLadder.y3, twentyLadder.x4, twentyLadder.y4);
  
  line(fortyTwoLadder.x1, fortyTwoLadder.y1, fortyTwoLadder.x2, fortyTwoLadder.y2);
  line(fortyTwoLadder.x3, fortyTwoLadder.y3, fortyTwoLadder.x4, fortyTwoLadder.y4);

  line(fiftyOneLadder.x1, fiftyOneLadder.y1, fiftyOneLadder.x2, fiftyOneLadder.y2);
  line(fiftyOneLadder.x3, fiftyOneLadder.y3, fiftyOneLadder.x4, fiftyOneLadder.y4);

  firstLadderSteps();
  secondLadderSteps();
  thirdLadderSteps();
  fourthLadderSteps();
}

function createSnakes() {

}