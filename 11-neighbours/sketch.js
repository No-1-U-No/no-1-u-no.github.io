// 2D Grid Neighbours

let grid;
let cellSize;
const GRID_SIZE = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (width > height) {
    cellSize = height/GRID_SIZE;
  }

  else {
    cellSize = width/GRID_SIZE;
  }

  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  toggleCell(x, y); //current cell
  toggleCell(x, y-1); //north neighbour
  toggleCell(x, y+1); //south neighbour
  toggleCell(x+1, y); //east neighbour
  toggleCell(x-1, y); //west neighbour
}

function toggleCell(x, y) {
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  
    else {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }

      else {
        fill("black");
      }

      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function generateRandomGrid(columns, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);

    for (let x = 0; x < columns; x++) {
      if (random(100) < 50) {
        newGrid[y].push(0);
      }

      else {
        newGrid[y].push(1);
      }
    }
  }

  return newGrid;
}

function generateEmptyGrid(columns, rows) {
  let newGrid = [];

  for (let y = 0; y < rows; y++) {
    newGrid.push([]);

    for (let x = 0; x < columns; x++) {
      newGrid[y].push(0);
    }
  }

  return newGrid;
}