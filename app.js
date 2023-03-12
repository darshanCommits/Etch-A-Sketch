import "./style.css";
import html2canvas from "html2canvas";

let item, row, col, density;
const container = document.querySelector(".container");
const phone = window.matchMedia("only screen and (max-width : 600px)");

//functions to manage setting up grid

//    delets old grid
function deleteOldGrid() {
  container.innerHTML = "";
}

//    makes new grid
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

//functions to manage change in color

//  creates random number to be used in rgb/hsl values
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//  main function to change color
function changeColor(color) {
  addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("grid-item")) {
      e.target.style.background = color;
    }
  });
}

//variables for checking which color to use
let isBW = true;
let isLGBT = false;
let isEraser = false;

//event selector to set color
function selectFunctionality(event) {
  isBW = false;
  isLGBT = false;
  isEraser = false;

  if (event.target.classList.contains("bw")) {
    isBW = true;
  } else if (event.target.classList.contains("lgbt")) {
    isLGBT = true;
  } else if (event.target.classList.contains("eraser")) {
    isEraser = true;
  }
}

document.querySelectorAll(".right button").forEach((button) => {
  button.addEventListener("click", selectFunctionality);
});

//function to manage drawing state

let intervalID;

function hoverAction(e) {
  clearInterval(intervalID);

  if (isLGBT) {
    intervalID = setInterval(() => {
      console.log(1);
      let color = `hsl(${random(0, 360)}, ${random(80, 100)}%, ${random(60, 80)}%)`;
      changeColor(color);
    }, 250);
  } else if (isBW) {
    intervalID = setInterval(() => {
      let color = `hsl(0, 0%, ${random(20, 60)}%)`;
      console.log(color);
      changeColor(color);
    }, 250);
  } else if (isEraser) {
    changeColor("white");
  }
}

//eventListeners to manage drawing state

container.addEventListener("mouseenter", hoverAction);

container.addEventListener("mouseleave", () => {
  clearInterval(intervalID);
});

//Options

//  reset the grid
document.querySelector(".reset").addEventListener("mousedown", () => {
  density = 0;
  makeGrid();
});

//  change density
document.querySelector(".density").addEventListener("mousedown", () => {
  makeGrid();
});

//  download the drawing in jpg format
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
