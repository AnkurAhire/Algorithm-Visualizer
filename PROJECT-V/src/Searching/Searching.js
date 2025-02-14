/* ----------------------------------------- VARIABLE DECLARATION ----------------------------------------- */

const cellContainer = document.querySelector(".cellContainer");
let Run_btn = document.getElementById("Run-btn");
let numLabel = document.getElementById("numLabel");
let Status = document.getElementById("Status");
let Container = document.querySelector(".container");

let List = [45, 33, 86, 11, 2, 1, 22];
let n = List.length;
let key;

/* --------------------------- Navbar Function ----------------------------------------- */

function HandleEvent(algorithm) {
  document.querySelectorAll("li").forEach((list) => {
    list.style.setProperty("background-color", "transparent");
    list.style.setProperty("color", "white");
  });

  const list = document.querySelector(`li[data-algo='${algorithm}']`);

  if (algorithm == "LinearSearch") {
    Shuffle();
    Run_btn.onclick = LinearSearch;
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
  } else if (algorithm == "BinarySearch") {
    Sort();
    Run_btn.onclick = BinarySearch;
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

/* ----------------------------------------- HELPER FUNCTIONS ----------------------------------------- */

async function delay(time) {
  await new Promise((resolve) => setTimeout(resolve, time));
}

function CreateCell() {
  for (let i = 0; i < n; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerHTML = List[i];
    cell.dataset.index = i;
    cellContainer.appendChild(cell);
  }
}

function Sort() {
  cellContainer.innerHTML = "";
  List.sort((a, b) => a - b);

  CreateCell();
}

function Shuffle() {
  cellContainer.innerHTML = "";

  for (let i = 0; i < n; i++) {
    let RandIdx = Math.floor(Math.random() * n);

    let temp = List[i];
    List[i] = List[RandIdx];
    List[RandIdx] = temp;
  }

  CreateCell();
}

function createArrow() {
  const arrowContainerUp = document.createElement("div");
  arrowContainerUp.classList.add("arrow-ConatainerUp");

  const arrowI = document.createElement("i");
  const arrowJ = document.createElement("i");
  const arrowK = document.createElement("i");
  const SpanI = document.createElement("span");
  const SpanJ = document.createElement("span");
  const SpanK = document.createElement("span");

  arrowI.setAttribute("class", "fa-solid fa-down-long");
  arrowI.setAttribute("id", "arrowI");
  arrowJ.setAttribute("class", "fa-solid fa-down-long");
  arrowJ.setAttribute("id", "arrowJ");
  arrowK.setAttribute("class", "fa-solid fa-down-long");
  arrowK.setAttribute("id", "arrowK");

  SpanI.setAttribute("id", "SpanI");
  arrowI.appendChild(SpanI);

  SpanJ.setAttribute("id", "SpanJ");
  arrowJ.appendChild(SpanJ);

  SpanK.setAttribute("id", "SpanK");
  arrowK.appendChild(SpanK);

  arrowI.style.display = "none";
  arrowJ.style.display = "none";
  arrowK.style.display = "none";

  arrowContainerUp.appendChild(arrowI);
  arrowContainerUp.appendChild(arrowJ);
  arrowContainerUp.appendChild(arrowK);
  Container.insertBefore(arrowContainerUp, cellContainer);
}

function removeArrow() {
  Container.removeChild(Container.children[0]);
}

function arrowI(i, text) {
  const arrow = document.getElementById("arrowI");
  arrow.style.display = "flex";
  const SpanI = document.getElementById("SpanI");
  const minCell = document.querySelector(`.cell[data-index='${i}']`);
  const minCellCoordinate = minCell.getBoundingClientRect();
  const cellContainerCoordinate = cellContainer.getBoundingClientRect();
  arrow.style.left = `${
    minCellCoordinate.left -
    cellContainerCoordinate.left +
    minCell.offsetWidth / 2 -
    arrow.offsetWidth / 2 +
    10
  }px`;
  SpanI.innerHTML = text;
}

function arrowJ(j, text) {
  const arrow = document.getElementById("arrowJ");
  arrow.style.display = "flex";
  const SpanJ = document.getElementById("SpanJ");
  const minCell = document.querySelector(`.cell[data-index='${j}']`);
  const minCellCoordinate = minCell.getBoundingClientRect();
  const cellContainerCoordinate = cellContainer.getBoundingClientRect();
  arrow.style.left = `${
    minCellCoordinate.left -
    cellContainerCoordinate.left +
    minCell.offsetWidth / 2 -
    arrow.offsetWidth / 2 +
    10
  }px`;
  SpanJ.innerHTML = text;
}

function arrowK(k, text) {
  const arrow = document.getElementById("arrowK");
  arrow.style.display = "flex";
  const SpanJ = document.getElementById("SpanK");
  const minCell = document.querySelector(`.cell[data-index='${k}']`);
  const minCellCoordinate = minCell.getBoundingClientRect();
  const cellContainerCoordinate = cellContainer.getBoundingClientRect();
  arrow.style.left = `${
    minCellCoordinate.left -
    cellContainerCoordinate.left +
    minCell.offsetWidth / 2 -
    arrow.offsetWidth / 2 +
    10
  }px`;
  SpanJ.innerHTML = text;
}

function HandleKey(event) {
  if (event.key == "Enter") {
    key = event.target.value;
    event.target.value = "";
    numLabel.innerHTML = key;
  }
}

/* ----------------------------------------- MAIN LOGIC ----------------------------------------- */

async function LinearSearch() {
  if (key == undefined) {
    alert("Enter Number First");
    return;
  }

  createArrow();
  Status.innerHTML = "Not Found";
  for (let i = 0; i < n; i++) {
    arrowI(i, "I");
    const cell = document.querySelector(`.cell[data-index='${i}']`);
    cell.classList.add("current");
    await delay(1000);
    if (List[i] == key) {
      Status.innerHTML = `Found At ${i} index`;
      cell.classList.remove("current");
      cell.classList.add("Found");
      removeArrow();
      return;
    }
  }

  removeArrow();
}

async function BinarySearch() {
  if (key == undefined) {
    alert("Enter Number First");
    return;
  }
  let low = 0;
  let high = n - 1;
  createArrow();
  Status.innerHTML = "Not Found";

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    arrowI(low, "low");
    arrowJ(high, "HIGH");
    arrowK(mid, "MID");
    await delay(1000);

    const cell = document.querySelector(`.cell[data-index='${mid}']`);

    if (List[mid] == key) {
      Status.innerHTML = `Found At ${mid} index`;
      cell.classList.add("Found");
      removeArrow();
      await delay(500);
      return;
    } else if (List[mid] > key) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }

    await delay(1000);
  }

  removeArrow();
  alert(`NOT FOUND ${key}`);
}

CreateCell();
