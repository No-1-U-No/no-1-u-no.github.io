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
const LOWER_SCREEN_SIZE = 2;

let squareSize;
let board;

let createBoardArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (width > height) {
    squareSize = height/BOARD_SIZE;
  }

  else {
    squareSize = width/BOARD_SIZE;
  }

  board = createBoard(BOARD_SIZE + LOWER_SCREEN_SIZE, BOARD_SIZE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  if (width > height) {
    squareSize = height/BOARD_SIZE;
  }

  else {
    squareSize = width/BOARD_SIZE;
  }

  board = createBoard(BOARD_SIZE + LOWER_SCREEN_SIZE, BOARD_SIZE);
}

function draw() {
  background(220);
}

function createBoard(columns, rows) {
  for (let y = 0; y < columns; y++) {
    createBoardArray.push([]);

    for (let x = 0; x < rows; x++) {
      //generate brown and white squares
    }
  }

  return createBoardArray;
}