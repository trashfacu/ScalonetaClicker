import { inventario, ObjetoClick, upgrades } from "./inventory.js";
//Saving and loading functions

export function saveGame() {
  //Saved the current state of the progress
  let currentState = {
    cups: ObjetoClick.cup,
    cupsPerSecond: ObjetoClick.cupPerSecond,
    progreso: inventario,
    upgrades: upgrades,
  };
  localStorage.setItem("save", JSON.stringify(currentState));
  console.log("Saved");
}

export function loadGame() {
  let saveGame = JSON.parse(localStorage.getItem("save")); //Again we parsed the Json for making it a usable jsObject
  if (saveGame) {
    ObjetoClick.cup = saveGame.cups;
    ObjetoClick.cupPerSecond = saveGame.cupsPerSecond;
    for (let i = 0; i < inventario.length; i++) {
      // Iterates though the array for loading in the object the saved values
      inventario[i].cantidad = saveGame.progreso[i].cantidad;
      inventario[i].costo = saveGame.progreso[i].costo;
      inventario[i].multiplicador = saveGame.progreso[i].multiplicador;
      inventario[i].aumento = saveGame.progreso[i].aumento;
      let aux = inventario[i];
      // And then it updates in the DOM
      document.getElementById(
        "show" + inventario[i].nombre + "Cost"
      ).innerText = prettify(aux.costo);
      document.getElementById(
        "show" + inventario[i].nombre + "Cant"
      ).innerText = prettify(aux.cantidad);
    }
    document.getElementById("showCounterPerSecond").innerText = prettify(
      ObjetoClick.cupPerSecond
    );
  }
}

export function deleteGame() {
  localStorage.removeItem("save");
  location.reload();
}

export function prettify(number) {
  let numberFormat = Math.round(number * 1000000) / 1000000;
  return numberFormat;
}

// Google analytics
