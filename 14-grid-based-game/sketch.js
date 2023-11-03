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
    y1: 8.25*squareSize,
    x2: centerBoard + 3.5*squareSize,
    y2: 6.25*squareSize,
    x3: centerBoard + 28*squareSize/3,
    y3: 8.75*squareSize,
    x4: centerBoard + 10*squareSize/3,
    y4: 6.75*squareSize,
  };

  return elevenLadder;
}

function secondLadder() {
  fourteenLadder = {
    x1: centerBoard + 19*squareSize/3,
    y1: 8.25*squareSize,
    x2: centerBoard + 22*squareSize/3,
    y2: 6.25*squareSize,
    x3: centerBoard + 6.75*squareSize,
    y3: 8.5*squareSize,
    x4: centerBoard + 7.75*squareSize,
    y4: 6.5*squareSize,
  };

  return fourteenLadder;
}

function thirdLadder() {
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

  line(fourteenLadder.x1, fourteenLadder.y1, fourteenLadder.x2, fourteenLadder.y2);
  line(fourteenLadder.x3, fourteenLadder.y3, fourteenLadder.x4, fourteenLadder.y4);

  line(twentyLadder.x1, twentyLadder.y1, twentyLadder.x2, twentyLadder.y2);
  line(twentyLadder.x3, twentyLadder.y3, twentyLadder.x4, twentyLadder.y4);

  line(twentyThreeLadder.x1, twentyThreeLadder.y1, twentyThreeLadder.x2, twentyThreeLadder.y2);
  line(thirtyNineLadder.x1, thirtyNineLadder.y1, thirtyNineLadder.x2, thirtyNineLadder.y2);
  line(fortyTwoLadder.x1, fortyTwoLadder.y1, fortyTwoLadder.x2, fortyTwoLadder.y2);
}

function createSnakes() {

}