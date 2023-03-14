import "./style.css";
import html2canvas from "html2canvas";
console.log(1);

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
  container.addEventListener("mousemove", (e) => {
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

function selectFunctionality(e) {
  isBW = false;
  isLGBT = false;
  isEraser = false;
  const short = e.target.classList;

  switch (true) {
    case short.contains("bw"):
      isBW = true;
      break;
    case short.contains("lgbt"):
      isLGBT = true;
    case short.contains("eraser"):
      isEraser = true;
    default:
      break;
  }
}

document.querySelectorAll(".right button").forEach((button) => {
  button.addEventListener("click", selectFunctionality);
});

//eventListeners to manage drawing state

let intervalID;

function selectColor() {
  clearInterval(intervalID);

  if (isLGBT) {
    intervalID = setInterval(() => {
      let color = `hsl(${random(0, 360)}, ${random(80, 100)}%, ${random(
        60,
        80
      )}%)`;
      changeColor(color);
    }, 250);
  } else if (isBW) {
    intervalID = setInterval(() => {
      let color = `hsl(0, 0%, ${random(20, 60)}%)`;
      changeColor(color);
    }, 250);
  } else if (isEraser) {
    changeColor("white");
  }
}

container.addEventListener("mouseenter", selectColor);

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

// phone stuff

// document.addEventListener("touchstart", (e) => {
//   [...e.changedTouches].forEach((touch) => {
//     console.log(4);
//     const dot = document.createElement("div");
//     dot.classList.add("dot");
//     //i can now find the location where i touched
//     dot.style.top = `${touch.pageY}px`;
//     dot.style.left = `${touch.pageX}px`;
//     dot.id = touch.identifier;
//     document.body.append(dot);

//     console.log(dot.style.left);
//   });
// });

container.addEventListener("touchmove", (e) => {
  [...e.changedTouches].forEach((touch) => {
    e.preventDefault();
    const top = `${touch.pageX}px`;
    const left = `${touch.pageY}px`;
    const duh = document.elementFromPoint(parseFloat(top), parseFloat(left));

    if (duh.classList.contains("grid-item")) 
      duh.style.background = "red";
  });
});

