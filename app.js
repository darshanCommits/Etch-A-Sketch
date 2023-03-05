const container = document.querySelector("#board");
let div, row, col;
col = 16*2; //32
row = 9*2;  //18

for (let i = 1; i <= row * col; i++) {
  div = document.createElement("div");
  
  div.style.width = "1rem";
  div.style.height = "1rem";

  div.style.backgroundColor = "#F5E9CF";


  container.appendChild(div);
}
container.style.gridTemplateColumns = `repeat(${col}, 1fr`;
