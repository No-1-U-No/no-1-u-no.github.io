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
let fourteenLadder;
let twentyLadder;
let twentyThreeLadder;
let thirtyNineLadder;
let fortyTwoLadder;

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
  fifthLadder();
  sixthLadder();
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
  fifthLadder();
  sixthLadder();
}

function draw() {
  background(220);
  createBoard();
  createLadders();
  createSnakes();
}

function firstLadder() {
  elevenLadder = {
    x1: centerBoard + 9.5*squareSize,
    y1: 8.5*squareSize,
    x2: centerBoard + 3.5*squareSize,
    y2: 6.5*squareSize,
  };

  return elevenLadder;
}

function secondLadder() {
  fourteenLadder = {
    x1: centerBoard + 6.5*squareSize,
    y1: 8.5*squareSize,
    x2: centerBoard + 7.5*squareSize,
    y2: 6.5*squareSize,
  };

  return fourteenLadder;
}

function thirdLadder() {
  twentyLadder = {
    x1: centerBoard + 0.5*squareSize,
    y1: 8.5*squareSize,
    x2: centerBoard + 8.5*squareSize,
    y2: 0.5*squareSize,
  };

  return twentyLadder;
}

function fourthLadder() {
  twentyThreeLadder = {
    x1: centerBoard + 2.5*squareSize,
    y1: 7.5*squareSize,
    x2: centerBoard + 9.5*squareSize,
    y2: 2.5*squareSize,
  };

  return twentyThreeLadder;
}

function fifthLadder() {
  thirtyNineLadder = {
    x1: centerBoard + 1.5*squareSize,
    y1: 6.5*squareSize,
    x2: centerBoard + 9.5*squareSize,
    y2: 4.5*squareSize,
  };

  return thirtyNineLadder;
}

function sixthLadder() {
  fortyTwoLadder = {
    x1: centerBoard + 1.5*squareSize,
    y1: 5.5*squareSize,
    x2: centerBoard + 5.5*squareSize,
    y2: 0.5*squareSize,
  };

  return fortyTwoLadder;
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
  line(elevenLadder.x1, elevenLadder.y1, elevenLadder.x2, elevenLadder.y2);
  line(fourteenLadder.x1, fourteenLadder.y1, fourteenLadder.x2, fourteenLadder.y2);
  line(twentyLadder.x1, twentyLadder.y1, twentyLadder.x2, twentyLadder.y2);
  line(twentyThreeLadder.x1, twentyThreeLadder.y1, twentyThreeLadder.x2, twentyThreeLadder.y2);
  line(thirtyNineLadder.x1, thirtyNineLadder.y1, thirtyNineLadder.x2, thirtyNineLadder.y2);
  line(fortyTwoLadder.x1, fortyTwoLadder.y1, fortyTwoLadder.x2, fortyTwoLadder.y2);
}

function createSnakes() {

}