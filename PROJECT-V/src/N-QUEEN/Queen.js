/* --------------------------- Navbar Function ----------------------------------------- */

function HandleEvent(algorithm) {
  document.querySelectorAll("li").forEach((list) => {
    list.style.setProperty("background-color", "transparent");
    list.style.setProperty("color", "white");
  });

  const list = document.querySelector(`li[data-algo='${algorithm}']`);

  if (algorithm == "NQueen") {
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
  } else if (algorithm == "SudokoSolver") {
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
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

/* ------------------------------------------------------------------------------------ NQUEEN LOGIC----------------------------------------------------------------------------------------------- */

const board = document.getElementById("board");
let Slider = document.getElementById("Speed");
let Size = document.getElementById("Size");
Size.addEventListener("input", UpdateSize);
let Nlabel = document.getElementById("N-label");
let Nspeed = document.getElementById("N-speed");
let n = Size.value;

function UpdateSize() {
  n = Size.value;
  Nlabel.innerHTML = `${n} x ${n}`;
  board.innerHTML = "";
  board.style.setProperty("height", `${50 * n}px`);
  board.style.setProperty("width", `${50 * n}px`);

  board.style.setProperty("grid-template-rows", `repeat(${n},50px)`);
  board.style.setProperty("grid-template-columns", `repeat(${n},50px)`);

  createCell();
}

function isSafe(i, j) {
  for (let a = 0; a < n; a++) {
    if (
      document.querySelector(`.cell[data-row='${i}'][data-col='${a}'] img`) ||
      document.querySelector(`.cell[data-row='${a}'][data-col='${j}'] img`)
    ) {
      return false;
    }
  }

  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      if (a + b == i + j || a - b == i - j) {
        if (
          document.querySelector(`.cell[data-row='${a}'][data-col='${b}'] img`)
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

async function nqueen(noq) {
  disableInteraction();

  if (noq == 0) {
    enableInteraction();
    return true;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let currCell = document.querySelector(
        `.cell[data-row='${i}'][data-col='${j}'] img`
      );

      if (!currCell && isSafe(i, j)) {
        const img = document.createElement("img");
        img.src = "/Photos/Queen.jpg";
        img.height = 40;
        img.width = 40;
        img.style.mixBlendMode = "multiply";
        document
          .querySelector(`.cell[data-row='${i}'][data-col='${j}']`)
          .appendChild(img);
        await new Promise((resolve) => setTimeout(resolve, Slider.value));

        if (await nqueen(noq - 1)) {
          return true;
        }

        await new Promise((resolve) => setTimeout(resolve, Slider.value));

        document
          .querySelector(`.cell[data-row='${i}'][data-col='${j}']`)
          .removeChild(img);
      }
    }
  }
  return false;
}

function createCell() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;

      if ((i + j) % 2 == 0) {
        cell.classList.add("white");
      } else {
        cell.classList.add("green");
      }
      board.appendChild(cell);
    }
  }
}

function resetCell() {
  const cell = document.querySelectorAll(".cell");

  cell.forEach((cell) => {
    while (cell.firstChild) {
      cell.removeChild(cell.firstChild);
    }
  });
}

function enableInteraction() {
  Run_btn.disabled = false;
  Rst_btn.disabled = false;
  Size.disabled = false;
}

function disableInteraction() {
  Run_btn.disabled = true;
  Rst_btn.disabled = true;
  Size.disabled = true;
}

UpdateSize();

const Run_btn = document.getElementById("Run-btn");
Run_btn.addEventListener("click", async () => {
  let Posssible = await nqueen(n);

  if (!Posssible) {
    alert("No Solution Exist");
    enableInteraction();
  }
});

const Rst_btn = document.getElementById("Rst-btn");
Rst_btn.addEventListener("click", resetCell);
