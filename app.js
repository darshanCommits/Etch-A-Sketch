const container = document.querySelector("#board");
const phone = window.matchMedia("only screen and (max-width : 600px)");

let div, row, col;
var density = 0;
let pixels = {
  1: 2.52,
  2: 1.19,
  3: 0.746,
  4: 0.526,
};

let pixelsForPhone = {
  1: 1.7,
  2: .787,
  3: 0.482,
  4: 0.331,
};

if(phone.matches) {
  pixels = pixelsForPhone;
}

function changeDensity(pixels) {
  function deleteOldGrid() {
    document
      .querySelectorAll(".grid-item")
      .forEach((e) => e.parentNode.removeChild(e));
  }
  deleteOldGrid();

  if (density < 4) {
    return pixels[++density];
  } else {
    density = 1;
    return pixels[density];
  }
}

function makeGrid() {
  let gridSize = changeDensity(pixels);
  col = phone.matches ? 9 * density : 16 * density; //18 for phone else 32
  row = phone.matches ? 16 * density : 9 * density; //32 for phone else 18

  for (let i = 1; i <= row * col; i++) {
    div = document.createElement("div");

    div.style.width = `${gridSize}rem`;
    div.style.height = `${gridSize}rem`;

    div.style.backgroundColor = "#F5E9CF";
    div.classList.add("grid-item");

    container.appendChild(div);
  }
  container.style.gridTemplateColumns = `repeat(${col}, 1fr`;
}

makeGrid();
