import "./style.css";
import html2canvas from "html2canvas";

let numRow, numCol, density;
const container = document.querySelector(".container");
const phone = window.matchMedia("(max-width : 600px) and (hover : none)");

//functions to manage setting up grid

//    delets old grid
function deleteOldGrid() {
  container.innerHTML = "";
}

//    makes new grid
function makeGrid() {
  deleteOldGrid();

  density = density <= 4 ? ++density : (density = 1);

  numCol = phone.matches ? 9 * density : 16 * density; //18 for phone else 32
  numRow = phone.matches ? 16 * density : 9 * density; //32 for phone else 18

  container.style.gridTemplateColumns = `repeat(${numCol}, 1fr)`;

  for (let i = 1; i <= numRow * numCol; i++) {
    const item = document.createElement("cell");

    item.classList.add("grid-item");

    container.appendChild(item);
  }
}

makeGrid();

//  creates random number to be used in rgb/hsl values

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//main function to change color

function changeColor(color) {
  console.log(1);

  addEventListener("mousemove", (e) => {
    if (e.target.classList.contains("grid-item")) {
      e.target.style.background = color;
    }
  });
}

//variables for checking which color to use

let isBW = true;
let isLGBT = false;
let isEraser = false;

//event listener to check what button is selected

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

//eventListeners to manage drawing state
let intervalID;

container.addEventListener("mouseenter", () => {
  clearInterval(intervalID);

  if (isLGBT) {
    intervalID = setInterval(() => {
      // console.log(1);
      let color = `hsl(${random(0, 360)}, ${random(80, 100)}%, ${random(
        60,
        80
      )}%)`;
      changeColor(color);
    }, 250);
  } else if (isBW) {
    intervalID = setInterval(() => {
      let color = `hsl(0, 0%, ${random(20, 60)}%)`;
      // console.log(2);
      changeColor(color);
    }, 250);
  } else if (isEraser) {
    changeColor("white");
  }
});

container.addEventListener("mouseleave", () => {
  clearInterval(intervalID);
});

//  reset the grid

document.querySelector(".reset").addEventListener("mousedown", () => {
  density = 0;
  makeGrid();
});

//  change density

document.querySelector(".density").addEventListener("mousedown", makeGrid);

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
