const container = document.querySelector(".container");
const phone = window.matchMedia("only screen and (max-width : 600px)");

let item, row, col, density;

function deleteOldGrid() {
  document
    .querySelectorAll(".grid-item")
    .forEach((e) => e.parentNode.removeChild(e));
}

function makeGrid() {
  deleteOldGrid();

  density = density <= 4 ? ++density : (density = 1);

  col = phone.matches ? 9 * density : 16 * density; //18 for phone else 32
  row = phone.matches ? 16 * density : 9 * density; //32 for phone else 18

  container.style.gridTemplateColumns = `repeat(${col}, 1fr`;
  // container.style.gridTemplateRows = `repeat(${row}, 1fr`;

  for (let i = 1; i <= row * col; i++) {
    item = document.createElement("cell");

    item.classList.add("grid-item", `grid-item-${i}`);

    container.appendChild(item);
  }
}

makeGrid();

function changeColor(color) {
	addEventListener("mouseover", (event) => {
		if (event.target.classList.contains("grid-item")) {
			event.target.style.backgroundColor = color;
		}
	});
}