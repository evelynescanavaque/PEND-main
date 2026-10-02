import { listarCosmeticos, totalDaLista } from "./lista.js";

const ul = document.getElementById("lista");

listarCosmeticos().forEach((texto) => {
  const li = document.createElement("li");
  li.textContent = texto;
  ul.appendChild(li);
});

document.getElementById("total").textContent =
  `Total: R$ ${totalDaLista().toFixed(2)}`;