const cellContainer = document.getElementById("cellContainer");
const svgContainer = document.getElementById("svgContainer");
let Create_btn = document.getElementById("Create-btn");
let InputData = document.getElementById("InputNumber");
let SearchNumber = document.getElementById("SearchNumber");

let NodeType;
let Nodeindex = 0;
/*------------------------------------------------------------------------ MAIN LOGIC ------------------------------------------------------------------------------------------------------*/

class NodeT1 {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class NodeT2 {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class SingleyLinkedList {
  constructor() {
    this.head = null;
  }

  insertAtTail(data) {
    let newNode = new NodeT1(data);

    if (this.head == null) {
      this.head = newNode;
    } else {
      let curr = this.head;

      while (curr.next != null) {
        curr = curr.next;
      }
      curr.next = newNode;
    }
  }

  display() {
    let curr = this.head;

    while (curr != null) {
      console.log(curr.data);
      curr = curr.next;
    }
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
  }

  insertAtTail(data) {
    let newNode = new NodeT2(data);

    if (this.head == null) {
      this.head = newNode;
    } else {
      let curr = this.head;

      while (curr.next != null) {
        curr = curr.next;
      }
      newNode.prev = curr;
      curr.next = newNode;
    }
  }

  display() {
    let curr = this.head;

    while (curr != null) {
      console.log(curr.data);
      curr = curr.next;
    }
  }
}

L = new SingleyLinkedList();
DL = new DoublyLinkedList();

async function createCellL(num) {
  const node = document.createElement("div");
  node.classList.add("node");
  const data = document.createElement("div");
  data.classList.add("data");
  const Link = document.createElement("div");
  Link.classList.add("link");
  const point = document.createElement("span");
  point.classList.add("point");

  data.innerHTML = num;
  node.dataset.index = Nodeindex;
  Nodeindex++;

  node.append(data);

  Link.appendChild(point);
  node.append(Link);
  cellContainer.appendChild(node);
  await delay(300);
  drawLine("normal", "Single");
}

async function createCellDL(num) {
  const node = document.createElement("div");
  node.classList.add("nodeDL");
  const data = document.createElement("div");
  data.classList.add("dataDL");
  const Link = document.createElement("div");
  Link.classList.add("linkDL");
  const Link2 = document.createElement("div");
  Link2.classList.add("linkDL");
  const point = document.createElement("span");
  const point2 = document.createElement("span");
  point.classList.add("pointF");
  point2.classList.add("pointB");

  data.innerHTML = num;
  node.dataset.index = Nodeindex;
  Nodeindex++;

  Link.appendChild(point);
  Link2.appendChild(point2);

  node.append(Link);
  node.append(data);
  node.append(Link2);

  cellContainer.appendChild(node);
  await delay(300);
  drawLine("reverse", "Double");
}

function CreateNode(Ntype) {
  if (InputData.value == "") {
    return;
  }

  if (Ntype == "Single") {
    if (document.querySelectorAll(".node").length > 20) {
      alert("to Large");
      InputData.value = "";
      return;
    }
    L.insertAtTail(InputData.value);
    createCellL(InputData.value);
  } else if (Ntype == "Double") {
    if (document.querySelectorAll(".nodeDL").length > 20) {
      alert("to Large");
      InputData.value = "";
      return;
    }
    DL.insertAtTail(InputData.value);
    createCellDL(InputData.value);
  }

  InputData.value = "";
}

function drawLine(direction, Ntype) {
  svgContainer.innerHTML = "";

  if (Ntype == "Single") {
    const nodes = document.querySelectorAll(".node");

    nodes.forEach((node, index) => {
      if (index < nodes.length - 1) {
        const rect1 = node.getBoundingClientRect();
        const rect2 = nodes[index + 1].getBoundingClientRect();

        let x1;
        let x2;
        let y1;
        let y2;

        if (direction == "reverse") {
          x1 = rect1.right;
          y1 = rect1.top + rect1.height / 2;
          x2 = rect2.left + rect2.width / 4.5;
          y2 = rect2.top + rect2.height / 2;
        } else {
          x1 = rect1.right - rect1.width / 4.5;
          y1 = rect1.top + rect1.height / 2;
          x2 = rect2.left;
          y2 = rect2.top + rect2.height / 2;
        }

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        const textX = (x1 + x2) / 2;
        const textY = (y1 + y2) / 2 - 5;
        text.setAttribute("x", textX);
        text.setAttribute("y", textY);
        text.setAttribute("fill", "black");
        text.setAttribute("font-size", "9");
        text.textContent = "Next";

        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "black");
        line.style.setProperty("transition", "all 0.3s ease");

        svgContainer.appendChild(line);
        svgContainer.appendChild(text);
      }
    });
  } else if (Ntype == "Double") {
    const nodes = document.querySelectorAll(".nodeDL");

    nodes.forEach((node, index) => {
      if (index < nodes.length - 1) {
        const rect1 = node.getBoundingClientRect();
        const rect2 = nodes[index + 1].getBoundingClientRect();

        const x1F = rect1.right - 10;
        const y1F = rect1.top + rect1.height - 19;
        const x2F = rect2.left;
        const y2F = rect2.top + rect2.height - 19;

        const x1B = rect1.right;
        const y1B = rect1.top + rect1.height / 2.5;
        const x2B = rect2.left + rect2.width / 10;
        const y2B = rect2.top + rect2.height / 2.5;

        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        const textX = (x1F + x2F) / 2;
        const textY = (y1F + y2F) / 2 - 20;
        text.setAttribute("x", textX);
        text.setAttribute("y", textY);
        text.setAttribute("fill", "black");
        text.setAttribute("font-size", "9");
        text.textContent = "Next";

        const line2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );

        const text2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );

        const text2Y = (y1F + y2F) / 2 + 15;
        text2.setAttribute("x", textX);
        text2.setAttribute("y", text2Y);
        text2.setAttribute("fill", "black");
        text2.setAttribute("font-size", "9");
        text2.textContent = "Prev";

        line.setAttribute("x1", x1F);
        line.setAttribute("y1", y1F);
        line.setAttribute("x2", x2F);
        line.setAttribute("y2", y2F);
        line.setAttribute("stroke", "black");
        line.style.setProperty("transition", "all 0.3s ease");

        line2.setAttribute("x1", x1B);
        line2.setAttribute("y1", y1B);
        line2.setAttribute("x2", x2B);
        line2.setAttribute("y2", y2B);
        line2.setAttribute("stroke", "black");
        line2.style.setProperty("transition", "all 0.3s ease");

        svgContainer.appendChild(line);
        svgContainer.appendChild(text);
        svgContainer.appendChild(line2);
        svgContainer.appendChild(text2);
      }
    });
  }
}

function Handlekey(event) {
  if (NodeType == undefined) {
    InputData.value = "";
    return;
  }

  if (NodeType == "Single") {
    if (event.key == "Enter") {
      CreateNode("Single");
    }
  }
  if (NodeType == "Double") {
    if (event.key == "Enter") {
      CreateNode("Double");
    }
  }
}

async function HandleNum(event) {
  if (NodeType == undefined) {
    SearchNumber.value = "";
    return;
  }

  let SearchKey;

  if (NodeType == "Single") {
    if (event.key == "Enter") {
      SearchKey = SearchNumber.value;
      SearchNumber.value = "";
      const Nodes = document.querySelectorAll(".node");
      let lineNumL = 0;

      for (let i = 0; i < Nodes.length; i++) {
        const node = document.querySelector(`.node[data-index='${i}']`);
        const newNum = node.children[0].innerHTML;

        if (newNum == SearchKey) {
          node.children[0].style.backgroundColor = "lightgreen";
          break;
        }
        if (i != Nodes.length - 1) {
          svgContainer.children[lineNumL].style.stroke = "orange";
          lineNumL = lineNumL + 2;
        }

        node.children[0].style.backgroundColor = "red";
        await delay(1000);
      }
    }
  }
  if (NodeType == "Double") {
    if (event.key == "Enter") {
      SearchKey = SearchNumber.value;
      SearchNumber.value = "";
      const Nodes = document.querySelectorAll(".nodeDL");
      let lineNumDL = 2;

      for (let i = 0; i < Nodes.length; i++) {
        const node = document.querySelector(`.nodeDL[data-index='${i}']`);
        const newNum = node.children[1].innerHTML;

        if (newNum == SearchKey) {
          node.children[1].style.backgroundColor = "lightgreen";
          break;
        }
        if (i != Nodes.length - 1) {
          svgContainer.children[lineNumDL].style.stroke = "orange";
          lineNumDL = lineNumDL + 4;
        }

        node.children[1].style.backgroundColor = "red";

        await delay(1000);
      }
    }
  }
}

window.addEventListener("resize", () => {
  drawLine("normal", NodeType);
});

/* -----------------------------------------------------  HELPER FUNCTIONS ----------------------------------------------------------- */

async function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function enableInteraction() {
  Run_btn.disabled = false;
}

function disableInteraction() {
  Run_btn.disabled = true;
}

function HandleEvent(algorithm) {
  resetCell();

  document.querySelectorAll("li").forEach((list) => {
    list.style.setProperty("background-color", "transparent");
    list.style.setProperty("color", "white");
  });

  const list = document.querySelector(`li[data-algo='${algorithm}']`);

  if (algorithm == "SingleLinkedList") {
    NodeType = "Single";
    list.style.setProperty("background-color", "white");
    list.style.setProperty("color", "black");
  } else if (algorithm == "DoublyLinkedList") {
    NodeType = "Double";
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

function resetCell() {
  cellContainer.innerHTML = "";
  svgContainer.innerHTML = "";
  Nodeindex = 0;
}

InputData.addEventListener("input", function (e) {
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
});

SearchNumber.addEventListener("input", function (e) {
  if (this.value.length > 4) {
    this.value = this.value.slice(0, 4);
  }
});
