let CANVAS_SIZE;
let GRID_SIZE;
let CELL_SIZE;
let COLORS;

let sandPiles = [];
let initialSandPile;
let startingPoint;
let maxLimit;

let rounds = 2;

function setup() {
  CANVAS_SIZE = 500;
  GRID_SIZE = 50;
  CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

  COLORS = ["#363946", "#696773", "#819595", "#B1B6A6", "#645244", "#F4743B"];

  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  initGrid();
  initialSandPile = 4000;
  maxLimit = 3;
  // startingPoint = [
  //   Math.floor(Math.random() * GRID_SIZE),
  //   Math.floor(Math.random() * GRID_SIZE),
  // ];
  startingPoint = [Math.floor(GRID_SIZE / 2), Math.floor(GRID_SIZE / 2)];
  sandPiles[startingPoint[0]][startingPoint[1]] = initialSandPile;
}

function initGrid() {
  sandPiles = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    sandPiles[row] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      sandPiles[row][col] = 0;
    }
  }
}

function draw() {
  background(COLORS[0]);
  rectMode(CORNER);
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      let c =
        sandPiles[row][col] > maxLimit
          ? COLORS[maxLimit + 1]
          : COLORS[sandPiles[row][col]];
      fill(c);
      noStroke();
      //stroke(50);
      rect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    if (!distribute()) {
      noLoop();
    }
  }

  function distribute() {
    let changed = false;
    //console.table(grid);
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (sandPiles[row][col] > maxLimit) {
          changed = true;
          sandPiles[row][col] = sandPiles[row][col] - (maxLimit + 1);

          if (row - 1 >= 0) {
            sandPiles[row - 1][col]++;
          }

          if (row + 1 < GRID_SIZE) {
            sandPiles[row + 1][col]++;
          }

          if (col - 1 >= 0) {
            sandPiles[row][col - 1]++;
          }

          if (col + 1 < GRID_SIZE) {
            sandPiles[row][col + 1]++;
          }
        }
      }
    }
    return changed;
  }
}
