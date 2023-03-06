const container = document.querySelector("#board");
const phone = window.matchMedia("only screen and (max-width : 600px)");

let div, row, col;
let density = 5;

let pixels = {
  "1": 1,
  "2": 0.8,
  "3": 0.5
 }
 console.log(Object.keys(pixels).find(k => pixels[k] == 0.8)); 
 console.log(pixels["2"]);

col = phone.matches ? 9 * density : 16 * density; //18 for phone else 32
row = phone.matches ? 16 * density : 9 * density; //32 for phone else 18

for (let i = 1; i <= row * col; i++) {
  div = document.createElement("div");

  div.style.width = ".4rem";
  div.style.height = ".4rem";

  div.style.backgroundColor = "#F5E9CF";

  container.appendChild(div);
}
container.style.gridTemplateColumns = `repeat(${col}, 1fr`;
