import "./style.css";
import html2canvas from "html2canvas";

let numRow, numCol, density;
const container = document.querySelector(".container");
const phone = window.matchMedia("(max-width : 600px) and (hover : none)");


function makeGrid() {
  container.innerHTML = "";

  density = density <= 4 ? ++density : (density = 1);

  numCol = phone.matches ? 9 * density : 16 * density;
  numRow = phone.matches ? 16 * density : 9 * density;

  container.style.gridTemplateColumns = `repeat(${numCol}, 1fr)`;

  for (let i = 1; i <= numRow * numCol; i++) {
    const item = document.createElement("cell");

    item.classList.add("grid-item");
    container.appendChild(item);
  }
}

makeGrid();

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeColor(color) {
  container.addEventListener("mousemove", (e) => {
    if (e.target.classList.contains("grid-item")) {
      e.target.style.background = color;
    }
  });
}

let isBW = true;
let isLGBT = false;
let isEraser = false;

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

document.querySelectorAll(".right button").forEach((button) => {
  button.addEventListener("click", selectFunctionality);
});

document.querySelectorAll(".left button").forEach((button) => {
  button.addEventListener("click", () => {
    let short = e.target.classList;

    if (short.contains("reset")) {
      density = 0;
      makeGrid();
    } else if (short.contains("density")) {
      makeGrid();
    } else if (short.contains("save")) {
      html2canvas(container).then(function (canvas) {
        const link = document.createElement("a");
        link.download = "my-image.png";
        link.href = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        link.click();
      });
    }
  });
});

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

container.addEventListener("touchmove", (e) => {
  console.log(1);
  e.preventDefault();

  [...e.changedTouches].forEach((touch) => {
    const top = `${touch.pageX}px`;
    const left = `${touch.pageY}px`;
    const cell = document.elementFromPoint(parseFloat(top), parseFloat(left));

    if (cell.classList.contains("grid-item")) {
      selectColorForPhone(cell);
    }
  });
});
