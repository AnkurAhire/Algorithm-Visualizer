let cellContainer = document.getElementById("cellContainer");
let Container = document.querySelector(".Container");

let Run_btn = document.getElementById("Run-btn");
let Shuffle_btn = document.getElementById("Shuffle-btn");

let List = [81, 2, 0, 30, 10, 1, 45];
let n = List.length;

async function SelectionSort() {
  if (isSorted()) {
    alert("List Is Sorted ");
    return;
  }

  disableInteraction();
  createArrow();

  for (let i = 0; i < n; i++) {
    let min = i;
    arrowI(i);

    document.querySelector(`.cell[data-index='${i}']`).classList.add("compare");
    for (let j = i + 1; j < n; j++) {
      document
        .querySelector(`.cell[data-index='${j}']`)
        .classList.add("current");
      arrowJ(j, "j");
      await delay(2000);

      if (List[j] < List[min]) {
        min = j;
      }

      arrowJ(min, "MIN");
      await delay(500);
      document
        .querySelector(`.cell[data-index='${j}']`)
        .classList.remove("current");
    }

    document
      .querySelector(`.cell[data-index='${i}']`)
      .classList.remove("compare");
    await swap(i, min);
    document.querySelector(`.cell[data-index='${i}']`).classList.add("sorted");
  }

  removeArrow();
  enableInteraction();
}

async function BubbleSort() {
  if (isSorted()) {
    alert("List Is Sorted ");
    return;
  }

  disableInteraction();
  let counter = 0;

  while (counter < n) {
    for (let i = 0; i < n; i++) {
      while (List[i] > List[i + 1]) {
        document
          .querySelector(`.cell[data-index='${i + 1}']`)
          .classList.add("compare");
        document
          .querySelector(`.cell[data-index='${i}']`)
          .classList.add("current");
        await SwapNoArrow(i, i + 1);
        await delay(200);
        document
          .querySelector(`.cell[data-index='${i}']`)
          .classList.remove("compare");
        document
          .querySelector(`.cell[data-index='${i + 1}']`)
          .classList.remove("current");
      }
    }

    counter++;
    await delay(500);
    document
      .querySelector(`.cell[data-index='${n - counter}']`)
      .classList.add("bubble");
    await delay(500);
  }

  enableInteraction();
}

function CreateCell() {
  for (let i = 0; i < n; i++) {
    let newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.dataset.index = i;
    newCell.innerHTML = List[i];
    cellContainer.appendChild(newCell);
  }
}

function createArrow() {
  const arrowContainerUp = document.createElement("div");
  arrowContainerUp.classList.add("arrow-ConatainerUp");

  const arrowContainerDown = document.createElement("div");
  arrowContainerDown.classList.add("arrow-ConatainerDown");

  const arrowI = document.createElement("i");
  const arrowJ = document.createElement("i");
  const SpanI = document.createElement("span");
  const SpanJ = document.createElement("span");

  arrowI.setAttribute("class", "fa-solid fa-down-long");
  arrowJ.setAttribute("class", "fa-solid fa-up-long");
  arrowI.setAttribute("id", "arrowI");
  arrowJ.setAttribute("id", "arrowJ");

  SpanI.setAttribute("id", "SpanI");
  SpanJ.setAttribute("id", "SpanJ");

  arrowI.appendChild(SpanI);
  arrowJ.appendChild(SpanJ);

  arrowContainerUp.append(arrowI);
  arrowContainerDown.append(arrowJ);
  Container.insertBefore(arrowContainerUp, cellContainer);
  Container.appendChild(arrowContainerDown);

  arrowContainerUp.style.display = "none";
  arrowContainerDown.style.display = "none";
}

function removeArrow() {
  Container.removeChild(Container.children[0]);
  Container.removeChild(Container.children[1]);
}

function Shuffle() {
  cellContainer.innerHTML = "";

  for (let i = 0; i < n; i++) {
    let i = Math.floor(Math.random() * n);
    let j = Math.floor(Math.random() * n);

    let temp = List[i];
    List[i] = List[j];
    List[j] = temp;
  }

  CreateCell();
}

async function swap(i, j) {
  if (i == j) {
    return;
  }

  let temp = List[i];
  List[i] = List[j];
  List[j] = temp;

  const cell = document.querySelectorAll(".cell");

  const SwapCell = document.querySelector(`.cell[data-index='${i}']`);
  const SwapFromCell = document.querySelector(`.cell[data-index='${j}']`);
  const arrowI = document.getElementById("arrowI");
  const arrowJ = document.getElementById("arrowJ");

  const SwapCell_Coordinate = SwapCell.getBoundingClientRect();
  const SwapFromCell_Coordinate = SwapFromCell.getBoundingClientRect();

  const x = SwapFromCell_Coordinate.left - SwapCell_Coordinate.left;

  SwapCell.style.transform = `translateY(${-50}px)`;
  arrowI.style.transform = `translateY(${-70}px)`;
  SwapFromCell.style.transform = `translateY(${50}px)`;
  arrowJ.style.transform = `translateY(${70}px)`;
  await delay(500);

  SwapCell.style.transform = `translate(${x}px,-50px)`;
  SwapFromCell.style.transform = `translate(${-x}px,50px)`;
  await delay(700);

  SwapCell.style.transform = `translate(${x}px,0px)`;
  SwapFromCell.style.transform = `translate(${-x}px,0px)`;
  await delay(200);
  arrowI.style.transform = `translateY(${0}px)`;
  arrowJ.style.transform = `translateY(${0}px)`;
  await delay(500);

  SwapCell.style.transform = "";
  SwapFromCell.style.transform = "";
  arrowI.style.transform = "";
  arrowJ.style.transform = "";

  cellContainer.insertBefore(SwapFromCell, SwapCell);
  cellContainer.insertBefore(SwapCell, cell[j + 1]);

  SwapCell.style.transition = "";
  SwapFromCell.style.transition = "";

  SwapFromCell.dataset.index = i;
  SwapCell.dataset.index = j;
}

async function SwapNoArrow(i, j) {
  if (i == j) {
    return;
  }

  let temp = List[i];
  List[i] = List[j];
  List[j] = temp;

  const cell = document.querySelectorAll(".cell");

  const SwapCell = document.querySelector(`.cell[data-index='${i}']`);
  const SwapFromCell = document.querySelector(`.cell[data-index='${j}']`);

  const SwapCell_Coordinate = SwapCell.getBoundingClientRect();
  const SwapFromCell_Coordinate = SwapFromCell.getBoundingClientRect();

  const x = SwapFromCell_Coordinate.left - SwapCell_Coordinate.left;

  SwapCell.style.transform = `translateY(${-50}px)`;
  SwapFromCell.style.transform = `translateY(${50}px)`;
  await delay(500);

  SwapCell.style.transform = `translate(${x}px,-50px)`;
  SwapFromCell.style.transform = `translate(${-x}px,50px)`;
  await delay(700);

  SwapCell.style.transform = `translate(${x}px,0px)`;
  SwapFromCell.style.transform = `translate(${-x}px,0px)`;
  await delay(500);

  SwapCell.style.transform = "";
  SwapFromCell.style.transform = "";

  cellContainer.insertBefore(SwapFromCell, SwapCell);
  cellContainer.insertBefore(SwapCell, cell[j + 1]);

  SwapCell.style.transition = "";
  SwapFromCell.style.transition = "";

  SwapFromCell.dataset.index = i;
  SwapCell.dataset.index = j;
}

function arrowJ(min, text) {
  document.querySelector(".arrow-ConatainerDown").style.display = "flex";
  const arrow = document.getElementById("arrowJ");
  const SpanJ = document.getElementById("SpanJ");
  const minCell = document.querySelector(`.cell[data-index='${min}']`);
  const minCellCoordinate = minCell.getBoundingClientRect();
  const cellContainerCoordinate = cellContainer.getBoundingClientRect();
  arrow.style.left = `${
    minCellCoordinate.left -
    cellContainerCoordinate.left +
    minCell.offsetWidth / 2 -
    arrow.offsetWidth / 2 +
    20
  }px`;
  SpanJ.innerHTML = text;
}

function arrowI(i) {
  document.querySelector(".arrow-ConatainerUp").style.display = "flex";
  const arrow = document.getElementById("arrowI");
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
  SpanI.innerHTML = "i";
}

async function delay(time) {
  await new Promise((resolve) => setTimeout(resolve, time));
}

/* -----------------------------------------------------  HELPER FUNCTIONS ----------------------------------------------------------- */

function isSorted() {
  for (let i = 0; i < n; i++) {
    if (List[i] > List[i + 1]) {
      return false;
    }
  }

  return true;
}

function enableInteraction() {
  document.querySelectorAll("li").forEach((list) => {
    list.style.pointerEvents = "auto";
  });

  Run_btn.disabled = false;
  Shuffle_btn.disabled = false;
}

function disableInteraction() {
  document.querySelectorAll("li").forEach((list) => {
    list.style.pointerEvents = "none";
  });

  Run_btn.disabled = true;
  Shuffle_btn.disabled = true;
}

function HandleEvent(algorithm) {
  Shuffle();

  document.querySelectorAll("li").forEach((list) => {
    list.style.setProperty("background-color", "transparent");
    list.style.setProperty("color", "white");
  });

  const list = document.querySelector(`li[data-algo='${algorithm}']`);

  if (algorithm == "SelectionSort") {
    Run_btn.onclick = SelectionSort;
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
  } else if (algorithm == "BubbleSort") {
    Run_btn.onclick = BubbleSort;
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
  } else if (algorithm == "InsertionSort") {
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
  } else if (algorithm == "MergeSort") {
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
  } else if (algorithm == "QuickSort") {
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

CreateCell();
