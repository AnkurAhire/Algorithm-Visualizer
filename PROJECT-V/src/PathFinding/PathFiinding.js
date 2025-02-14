const Grid = document.getElementById("grid");
const styles = window.getComputedStyle(Grid);

const height = styles.getPropertyValue("height");
const width = styles.getPropertyValue("width");

var numberCols = Math.floor(parseInt(height) / 20);
var numberRows = Math.floor(parseInt(width) / 20);

Grid.style.setProperty("grid-template-columns", `repeat(${numberCols},20px)`);
Grid.style.setProperty("grid-template-rows", `repeat(${numberRows},20px)`);

const Run_btn = document.getElementById("Run-Btn");

let Rst_btn = document.getElementById("Reset-btn");
Rst_btn.addEventListener("click", RestGrid);

let GenearateWall = document.getElementById("Genearate-Wall");
GenearateWall.addEventListener("click", WallGenerator);

let title = document.getElementById("algo-title");

let slider = document.getElementById("Speed");

let startCell = null;
let goalCell = null;
var wall = [];
const direction = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function HandleEvent(algorithm) {
  RestGrid();

  document.querySelectorAll("li").forEach((list) => {
    list.style.setProperty("background-color", "transparent");
    list.style.setProperty("color", "white");
  });

  const list = document.querySelector(`li[data-algo='${algorithm}']`);

  if (algorithm == "BFS") {
    Run_btn.onclick = bfs;
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
    title.innerHTML = "BFS &nbsp; PathFinder";
  } else if (algorithm == "DFS") {
    Run_btn.onclick = dfs;
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
    title.innerHTML = "DFS &nbsp; PathFinder";
  } else if (algorithm == "ASTAR") {
    Run_btn.onclick = AStar;
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
    title.innerHTML = "A* &nbsp; PathFinder";
  }
}

function toggleMenu() {
  const navContainer = document.querySelector(".nav-container");
  const ul = document.querySelector("ul");
  const navbar = document.querySelector(".navbar");

  navContainer.classList.toggle("Column");
  ul.classList.toggle("ULColumn");
  navbar.classList.toggle("anim");
}

function ArrayDim() {
  for (let i = 0; i < numberRows; i++) {
    wall[i] = [];

    for (let j = 0; j < numberCols; j++) {
      wall[i][j] = 0;
    }
  }
}

function createCell() {
  for (let i = 0; i < numberRows; i++) {
    for (let j = 0; j < numberCols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", handleCellClick);
      Grid.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  const cell = event.target;

  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (startCell === null) {
    startCell = cell;
    cell.classList.add("start");
    var b = document.querySelector(".cell.start");
    b.innerHTML = "S";
    wall[row][col] = "S";
  } else if (goalCell === null) {
    if (wall[row][col] != "S") {
      goalCell = cell;
      cell.classList.add("goal");
      var b = document.querySelector(".cell.goal");
      b.innerHTML = "G";
      wall[row][col] = "G";
    }
  } else {
    if (wall[row][col] != "S" && wall[row][col] != "G") {
      let isToggle = cell.classList.toggle("wall");

      if (isToggle) {
        wall[row][col] = 1;
      } else {
        wall[row][col] = 0;
      }
    }
  }
}

async function bfs() {
  if (startCell == null || goalCell == null) {
    return;
  }

  let startCellRow = parseInt(startCell.dataset.row);
  let startCellCol = parseInt(startCell.dataset.col);
  let goalCellRow = parseInt(goalCell.dataset.row);
  let goalCellCol = parseInt(goalCell.dataset.col);
  disableInteraction();

  const queue = [];
  const parents = {};
  const visited = Array.from({ length: numberRows }, () =>
    Array(numberCols).fill(false)
  );
  queue.push([startCellRow, startCellCol]);
  visited[startCellRow][startCellCol] = true;

  while (queue.length > 0) {
    const [currRow, currCol] = queue.shift();

    if (currRow == goalCellRow && currCol == goalCellCol) {
      await reconstpath(parents, goalCellRow, goalCellCol);
      enableInteraction();
      return;
    }

    for (const [a, b] of direction) {
      let newRow = currRow + a;
      let newCol = currCol + b;

      if (
        newRow >= 0 &&
        newRow < numberRows &&
        newCol >= 0 &&
        newCol < numberCols &&
        !visited[newRow][newCol] &&
        wall[newRow][newCol] != 1
      ) {
        queue.push([newRow, newCol]);
        visited[newRow][newCol] = true;
        parents[`${newRow},${newCol}`] = `${currRow},${currCol}`;
        const explored = document.querySelector(
          `.cell[data-row='${newRow}'][data-col='${newCol}']`
        );
        if (wall[newRow][newCol] != "G") {
          await new Promise((resolve) => setTimeout(resolve, slider.value));
          explored.classList.add("explored");
          await new Promise((resolve) => setTimeout(resolve, slider.value));
        }
      }
    }
  }
  enableInteraction();
  alert("No Path Found");
  RestGrid();
}

async function reconstpath(parents, row, col) {
  let currentKey = `${row},${col}`;
  let forwardPath = [];
  forwardPath.push();

  while (parents[currentKey] !== undefined) {
    const [prevRow, prevCol] = parents[currentKey].split(",").map(Number);
    currentKey = `${prevRow},${prevCol}`;
    forwardPath.push(currentKey);
    row = prevRow;
    col = prevCol;
  }

  forwardPath.pop();

  while (forwardPath.length > 0) {
    const [row, col] = forwardPath.pop().split(",").map(Number);
    await new Promise((resolve) => setTimeout(resolve, 50));
    document
      .querySelector(`.cell[data-row='${row}'][data-col='${col}']`)
      .classList.add("path");
    document.querySelector(
      `.cell[data-row='${row}'][data-col='${col}']`
    ).innerHTML = "*";
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

async function dfs() {
  if (startCell == null || goalCell == null) {
    return;
  }

  let startCellRow = parseInt(startCell.dataset.row);
  let startCellCol = parseInt(startCell.dataset.col);
  let goalCellRow = parseInt(goalCell.dataset.row);
  let goalCellCol = parseInt(goalCell.dataset.col);
  disableInteraction();

  const stack = [];
  const parents = {};
  const visited = Array.from({ length: numberRows }, () =>
    Array(numberCols).fill(false)
  );
  stack.push([startCellRow, startCellCol]);
  visited[startCellRow][startCellCol] = true;

  while (stack.length > 0) {
    const [currRow, currCol] = stack.pop();

    if (currRow == goalCellRow && currCol == goalCellCol) {
      await reconstpath(parents, goalCellRow, goalCellCol);
      enableInteraction();
      return;
    }

    for (const [x, y] of direction) {
      let newRow = currRow + x;
      let newCol = currCol + y;

      if (
        newRow >= 0 &&
        newRow < numberRows &&
        newCol >= 0 &&
        newCol < numberCols &&
        !visited[newRow][newCol] &&
        wall[newRow][newCol] != 1
      ) {
        stack.push([newRow, newCol]);
        visited[newRow][newCol] = true;
        parents[`${newRow},${newCol}`] = `${currRow},${currCol}`;
        const explored = document.querySelector(
          `.cell[data-row='${newRow}'][data-col='${newCol}']`
        );
        await new Promise((resolve) => setTimeout(resolve, slider.value));
        explored.classList.add("explored");
        await new Promise((resolve) => setTimeout(resolve, slider.value));
      }
    }
  }
  enableInteraction();
  alert("No Path Found");
  RestGrid();
}

function getHeuristic(cell1) {
  const [x1, y1] = cell1;
  const x2 = parseInt(goalCell.dataset.row);
  const y2 = parseInt(goalCell.dataset.col);

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function pq(list) {
  let lowestFN = Infinity;
  let lowesetList = [];

  for (const [fn, i, j] of list) {
    if (fn < lowestFN) {
      if (lowesetList.length > 0) {
        lowesetList.shift();
      }

      lowestFN = fn;
      lowesetList.push([fn, i, j]);
    }
  }
  return lowesetList[0];
}

async function AStar() {
  if (startCell == null || goalCell == null) {
    return;
  }

  let startCellRow = parseInt(startCell.dataset.row);
  let startCellCol = parseInt(startCell.dataset.col);
  let goalCellRow = parseInt(goalCell.dataset.row);
  let goalCellCol = parseInt(goalCell.dataset.col);
  disableInteraction();

  const parents = {};
  let openList = [];
  const closedList = Array.from({ length: numberRows }, () =>
    Array(numberCols).fill(false)
  );
  let fn = Array.from({ length: numberRows }, () =>
    Array(numberCols).fill(Infinity)
  );
  let gn = Array.from({ length: numberRows }, () =>
    Array(numberCols).fill(Infinity)
  );
  gn[startCellRow][startCellCol] = 0;
  fn[startCellRow][startCellCol] =
    gn[startCellRow][startCellCol] + getHeuristic([startCellRow, startCellCol]);
  openList.push([fn[startCellRow][startCellCol], startCellRow, startCellCol]);

  while (openList.length > 0) {
    const [currFN, currRow, currCol] = pq(openList);

    const explored = document.querySelector(
      `.cell[data-row='${currRow}'][data-col='${currCol}']`
    );
    await new Promise((resolve) => setTimeout(resolve, slider.value));
    explored.classList.add("explored");
    await new Promise((resolve) => setTimeout(resolve, slider.value));

    if (currRow == goalCellRow && currCol == goalCellCol) {
      await reconstpath(parents, goalCellRow, goalCellCol);
      enableInteraction();
      return;
    }

    for (const [x, y] of direction) {
      let newRow = currRow + x;
      let newCol = currCol + y;

      if (
        newRow >= 0 &&
        newRow < numberRows &&
        newCol >= 0 &&
        newCol < numberCols &&
        !closedList[newRow][newCol] &&
        wall[newRow][newCol] != 1
      ) {
        let tempGN = gn[currRow][currCol] + 1;
        let tempFN = getHeuristic([newRow, newCol]) + tempGN;

        if (tempGN < fn[newRow][newCol]) {
          openList.push([tempFN, newRow, newCol]);
          gn[newRow][newCol] = tempGN;
          fn[startCellRow][startCellCol] = tempFN;
          parents[`${newRow},${newCol}`] = `${currRow},${currCol}`;
        }
      }
    }
    openList = openList.filter(
      (list) =>
        JSON.stringify(list) !== JSON.stringify([currFN, currRow, currCol])
    );
    closedList[currRow][currCol] = true;
  }

  enableInteraction();
  alert("No Path Found");
  RestGrid();
}

function WallGenerator() {
  let target = Math.floor((numberCols + numberRows) / 2);
  let fillded = 0;

  if (startCell == null || goalCell == null) {
    return;
  }

  while (fillded < target) {
    let i = Math.floor(Math.random() * numberRows);
    let j = Math.floor(Math.random() * numberCols);

    if (wall[i][j] != "S" && wall[i][j] != "G" && wall[i][j] != 1) {
      document
        .querySelector(`.cell[data-row='${i}'][data-col='${j}']`)
        .classList.add("wall");
      wall[i][j] = 1;
      fillded += 1;
    }
  }
}

function RestGrid() {
  startCell = null;
  goalCell = null;
  Grid.innerHTML = "";
  ArrayDim();
  createCell();
}

function enableInteraction() {
  document.querySelectorAll("li").forEach((list) => {
    list.style.pointerEvents = "auto";
  });

  Run_btn.disabled = false;
  Rst_btn.disabled = false;
  GenearateWall.disabled = false;
}

function disableInteraction() {
  document.querySelectorAll("li").forEach((list) => {
    list.style.pointerEvents = "none";
  });

  Run_btn.disabled = true;
  Rst_btn.disabled = true;
  GenearateWall.disabled = true;
}

slider.addEventListener("input", () => {
  const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, white ${value}%, red ${value}% )`;
});

ArrayDim();
createCell();
