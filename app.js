const container = document.querySelector("#board");
let div;
for (let i = 1; i <= 16 * 16; i++) {
  div = document.createElement("div");
  div.style.width = "3.5dvw";
  div.style.height = "3.5dvh";
  div.style.backgroundColor = "#F5E9CF";
  container.appendChild(div);
}
