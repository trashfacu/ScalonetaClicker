import { inventario, ObjetoClick } from "./inventory.js";
//Saving and loading functions

export function saveGame() {
  let currentState = {
    cups: ObjetoClick.cup,
    cupsPerSecond: ObjetoClick.cupPerSecond,
    progreso: inventario,
  };
  localStorage.setItem("save", JSON.stringify(currentState));
  alert("¡Progreso guardado!");
}

export function loadGame() {
  let saveGame = JSON.parse(localStorage.getItem("save"));
  if (saveGame) {
    ObjetoClick.cup = saveGame.cups;
    ObjetoClick.cupPerSecond = saveGame.cupsPerSecond;
    for (let i = 0; i < inventario.length; i++) {
      inventario[i].cantidad = saveGame.progreso[i].cantidad;
      inventario[i].costo = saveGame.progreso[i].costo;
      let aux = inventario[i];
      document.getElementById(
        "show" + inventario[i].nombre + "Cost"
      ).innerText = aux.costo;
      document.getElementById(
        "show" + inventario[i].nombre + "Cant"
      ).innerText = aux.cantidad;
    }
    document.getElementById("showCounterPerSecond").innerText = ObjetoClick.cup;
  }
}

export function deleteGame() {
  localStorage.removeItem("save");
  location.reload();
}
