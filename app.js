import "./style.css";
import html2canvas from "html2canvas";

let item, row, col, density;
const container = document.querySelector(".container");
const phone = window.matchMedia("only screen and (max-width : 600px)");

function deleteOldGrid() {
  container.innerHTML = "";
}

function makeGrid() {
  deleteOldGrid();

  density = density <= 4 ? ++density : (density = 1);

  col = phone.matches ? 9 * density : 16 * density; //18 for phone else 32
  row = phone.matches ? 16 * density : 9 * density; //32 for phone else 18

  container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;

  for (let i = 1; i <= row * col; i++) {
    item = document.createElement("cell");

    item.classList.add("grid-item");

    container.appendChild(item);
  }
}

makeGrid();

function changeColor(color) {
  addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("grid-item")) {
      e.target.style.background = color;
    }
  });
}

function random(i) {
  return Math.floor(Math.random() * i);
}

let intervalID;
let isLGBT = false;
let isBW = false;
let isEraser = false;

function hoverAction(e) {
  clearInterval(intervalID);

  if (isLGBT) {
    intervalID = setInterval(() => {
      console.log(1);
      let color = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
      changeColor(color);
    }, 100);
  } else if (isBW) {
    intervalID = setInterval(() => {
      console.log(2);
      let color = `hsl(0, 0%, ${random(100)}%)`;
      changeColor(color);
    }, 100);
  } else if (isEraser) {
    changeColor("white");
  }
}

function selectFunctionality(event) {
  isLGBT = false;
  isBW = false;
  isEraser = false;

  if (event.target.classList.contains("lgbt")) {
    isLGBT = true;
  } else if (event.target.classList.contains("bw")) {
    isBW = true;
  } else if (event.target.classList.contains("eraser")) {
    isEraser = true;
  }
}

document.querySelectorAll(".right button").forEach((button) => {
  button.addEventListener("click", selectFunctionality);
});

document.querySelector(".reset").addEventListener("mousedown", () => {
  density = 0;
  makeGrid();
});

document.querySelector(".density").addEventListener("mousedown", () => {
  makeGrid();
});

document.querySelector(".save").addEventListener("mousedown", () => {
  html2canvas(container).then(function (canvas) {
    const link = document.createElement("a");
    link.download = "my-image.png";
    link.href = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    link.click();
  });
});

container.addEventListener("mouseenter", hoverAction);

container.addEventListener("mouseleave", () => {
  clearInterval(intervalID);
});

