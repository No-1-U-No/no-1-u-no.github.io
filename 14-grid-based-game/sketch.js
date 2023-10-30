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
// let board = [["white", "brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown"],
//              ["brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown", "white"],
//              ["white", "brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown"],
//              ["brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown", "white"],
//              ["white", "brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown"],
//              ["brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown", "white"],
//              ["white", "brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown"],
//              ["brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown", "white"],
//              ["white", "brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown"],
//              ["brown", "white", "brown", "white", "brown", "white", "brown", "white", "brown", "white"],
//              ["brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown"],
//              ["brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown", "brown"]];

let board = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (width > height) {
    squareSize = height/BOARD_SIZE;
  }

  else {
    squareSize = width/BOARD_SIZE;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  if (width > height) {
    squareSize = height/BOARD_SIZE;
  }

  else {
    squareSize = width/BOARD_SIZE;
  }
}

function draw() {
  background(220);
  createBoard();
}

function createBoard() {
  let numberingBoard = 100;

  for (let y = 0; y < BOARD_SIZE; y++) {
    board.push([]);
    
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (y % 2 === 0) {
        if (x % 2 === 0) {
          board[y].push("white");
        }

        else {
          board[y].push("brown");
        }
      }

      else {
        if (x % 2 === 0) {
          board[y].push("brown");
        }

        else {
          board[y].push("white");
        }
      }
      
      if (board[y][x] === "white") {
        fill("white");
        square(x*squareSize, y*squareSize, squareSize);
        fill("brown");
        text(numberingBoard, x*squareSize, y*squareSize, squareSize, squareSize);
        numberingBoard--;
      }

      else {
        fill("brown");
        square(x*squareSize, y*squareSize, squareSize);
        fill("white");
        text(numberingBoard, x*squareSize, y*squareSize, squareSize, squareSize);
        numberingBoard--;
      }
    }
  }
}