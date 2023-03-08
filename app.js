const container = document.querySelector("#board");
const phone = window.matchMedia("only screen and (max-width : 600px)");

let div, row, col;

let density = 0;

function changeDensity() {
  function deleteOldGrid() {
    document
      .querySelectorAll(".grid-item")
      .forEach((e) => e.parentNode.removeChild(e));
  }
  deleteOldGrid();
  return density <= 4 ? ++density : (density = 1);
}

function makeGrid() {
  density = changeDensity();

  col = phone.matches ? 9 * density : 16 * density; //18 for phone else 32
  row = phone.matches ? 16 * density : 9 * density; //32 for phone else 18

  container.style.gridTemplateColumns = `repeat(${col}, 1fr`;
  // container.style.gridTemplateColumns = `repeat(${row}, 1fr`;

  for (let i = 1; i <= row * col; i++) {
    div = document.createElement("div");
    div.style.width = "1em";
    div.style.height = "1em";

    div.style.backgroundColor = "#F5E9CF";
    div.classList.add("grid-item");

    container.appendChild(div);
  }
}

makeGrid();
