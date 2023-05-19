import "./style.css";
import html2canvas from "html2canvas";


let numRow, numCol, density;
let isBW = true;
let isLGBT = false;
let isEraser = false;
let intervalID;

const container = document.querySelector(".container");
const fragment = document.createDocumentFragment();
const phone = window.matchMedia("(max-width : 600px) and (hover : none)");

function makeGrid() {
  container.innerHTML = "";

  const btnDensity = document.querySelector(".density");

  density = density <= 4 ? ++density : (density = 1);
  btnDensity.innerHTML = `<h1>${density}</h1>`;

  numCol = phone.matches ? 9 * density : 16 * density;
  numRow = phone.matches ? 16 * density : 9 * density;

  const colWidth = `repeat(${numCol}, 1fr)`;
  requestAnimationFrame(() => {
    container.style.gridTemplateColumns = colWidth;
  });

  for (let i = 1; i <= numRow * numCol; i++) {
    let item = document.createElement("div");
    item.classList.add("grid-item");
    fragment.appendChild(item);
  }
  container.appendChild(fragment);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeColor(color) {
  container.addEventListener("mousemove", (e) => {
    if (e.target.matches(".grid-item")) {
      requestAnimationFrame(() => {
        e.target.style.background = color;
      });
    }
  });
}

function selectColor() {
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

function selectColorForPhone(cell) {
  if (isLGBT) {
    let color = `hsl(${random(0, 360)}, ${random(80, 100)}%, ${random(
      60,
      80
    )}%)`;
    cell.style.background = color;
  } else if (isBW) {
    let color = `hsl(0, 0%, ${random(20, 60)}%)`;
    cell.style.background = color;
  } else if (isEraser) {
    cell.style.background = "white";
  }
}

function selectFunctionality(e) {
  isBW = false;
  isLGBT = false;
  isEraser = false;
  const short = e.target.classList;
  if (short.contains("bw")) {
    isBW = true;
  } else if (short.contains("lgbt")) {
    isLGBT = true;
  } else if (short.contains("eraser")) {
    isEraser = true;
  }
}

// Events

document.addEventListener("DOMContentLoaded", makeGrid);

[...document.querySelectorAll(".right")].forEach((button) => {
  button.addEventListener("click", selectFunctionality);
});

document.querySelector(".density").addEventListener("click", makeGrid);

document.querySelector(".reset").addEventListener("click", () => {
  density = 0;
  makeGrid();
});

document.querySelector(".save").addEventListener("click", () => {
  html2canvas(container).then(function (canvas) {
    const link = document.createElement("a");
    link.download = "my-image.png";
    link.href = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    link.click();
  });
});

container.addEventListener("mouseenter", selectColor);

container.addEventListener("mouseleave", () => {
  clearInterval(intervalID);
});

container.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.changedTouches[0];
  //client instead of page since it finds relative location(to its parent),
  //instead of the whole document
  const cell = document.elementFromPoint(touch.clientX, touch.clientY);

  //checks if cell exist and if it does, what is the closest element with grid item class
  if (cell && cell.closest(".grid-item")) {
    requestAnimationFrame(() => {
      selectColorForPhone(cell.closest(".grid-item"));
    });
  }
});
