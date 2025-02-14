let n = 9;
let num;
const board = document.getElementById("board");
let Slider = document.getElementById("Speed");
let Status = document.getElementById("Status");

function CreateCell() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.innerHTML = null;
      cell.addEventListener("click", HandleClick);
      cell.classList.add("cell");
      if ((i + j) % 2 == 0) {
        cell.classList.add("white");
      }
      board.appendChild(cell);
    }
  }
}

function ResetCell() {
  Status.innerHTML = "None";
  Status.style.color = "black";

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      document.querySelector(
        `.cell[data-row='${i}'][data-col='${j}']`
      ).innerHTML = "";
    }
  }
}

function generateRandom() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let RandomNum = Math.floor(Math.random() * 10);

      if ((i + j) % 2 == 0 && isSafe(i, j, RandomNum) && RandomNum > 0) {
        document.querySelector(
          `.cell[data-row='${i}'][data-col='${j}']`
        ).innerHTML = RandomNum;
      }
    }
  }
}

function isSafe(row, col, num) {
  for (let i = 0; i < n; i++) {
    if (
      document.querySelector(`.cell[data-row='${row}'][data-col='${i}']`)
        .innerHTML == num ||
      document.querySelector(`.cell[data-row='${i}'][data-col='${col}']`)
        .innerHTML == num
    ) {
      return false;
    }
  }

  let startRow = 3 * Math.floor(row / 3);
  let startCol = 3 * Math.floor(col / 3);

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (
        document.querySelector(`.cell[data-row='${i}'][data-col='${j}']`)
          .innerHTML == num
      ) {
        return false;
      }
    }
  }

  return true;
}

async function SolveSudko(row, col) {
  disableInteraction();
  Status.innerHTML = "Pending";

  if (row == n - 1 && col == n) {
    Status.innerHTML = "Solution Exist";
    Status.style.color = "green";
    enableInteraction();
    return true;
  }

  if (col == n) {
    row += 1;
    col = 0;
  }

  if (
    document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`)
      .innerHTML > 0
  ) {
    return SolveSudko(row, col + 1);
  }

  for (let num = 1; num <= n; num++) {
    if (isSafe(row, col, num)) {
      document
        .querySelector(`.cell[data-row='${row}'][data-col='${col}']`)
        .classList.add("current");
      document.querySelector(
        `.cell[data-row='${row}'][data-col='${col}']`
      ).innerHTML = num;
      await new Promise((resolve) => setTimeout(resolve, Slider.value));
      document
        .querySelector(`.cell[data-row='${row}'][data-col='${col}']`)
        .classList.remove("current");

      if ((await SolveSudko(row, col + 1)) == true) {
        return true;
      }
      document.querySelector(
        `.cell[data-row='${row}'][data-col='${col}']`
      ).innerHTML = "";
      await new Promise((resolve) => setTimeout(resolve, Slider.value));
    }
  }

  return false;
}

function enableInteraction() {
  Run_btn.disabled = false;
  Rst_btn.disabled = false;
  rand_btn.disabled = false;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", HandleClick);
  });
}

function disableInteraction() {
  Run_btn.disabled = true;
  Rst_btn.disabled = true;
  rand_btn.disabled = true;

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.removeEventListener("click", HandleClick);
  });
}

CreateCell();

const rand_btn = document.getElementById("Random");
rand_btn.addEventListener("click", generateRandom);

const Rst_btn = document.getElementById("Rst-btn");
Rst_btn.addEventListener("click", ResetCell);

const Run_btn = document.getElementById("Run-btn");

/* -----------------------------------------------------  HELPER FUNCTIONS ----------------------------------------------------------- */

async function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function HandleClick(event) {
  if (!(event.target.tagName === "DIV")) {
    return;
  }

  num = undefined;
  const cell = event.target;
  cell.innerHTML = "";
  const Input = document.createElement("input");
  Input.type = "text";
  Input.inputMode = "numeric";
  Input.maxLength = "1";
  cell.appendChild(Input);

  Input.addEventListener("input", function (e) {
    var num = /[^1-9]/gi;
    if (!Number.isFinite(Input.value)) {
      Input.value = this.value.replace(num, "");
    }
    if (!isSafe(cell.dataset.row, cell.dataset.col, e.target.value)) {
      cell.innerHTML = "";
    } else {
      cell.innerHTML = e.target.value;
    }
  });

  await delay(1000);
  if (Input.value == "") {
    cell.innerHTML = "";
  }
}

function isEmpty() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let curCell = document.querySelector(
        `.cell[data-row='${i}'][data-col='${j}']`
      );

      if (curCell.innerHTML.trim() !== "") {
        return false;
      }
    }
  }
  return true;
}

async function isValid() {
  let Posssible = await SolveSudko(0, 0);

  if (!Posssible) {
    Status.innerHTML = "Solution Not Exist";
    Status.style.color = "red";
    enableInteraction();
  }
}

Slider.addEventListener("input", () => {
  const value = ((Slider.value - Slider.min) / (Slider.max - Slider.min)) * 100;
  Slider.style.background = `linear-gradient(to right, white ${value}%, red ${value}% )`;
});
