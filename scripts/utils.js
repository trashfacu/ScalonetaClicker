import { inventory, objetoClick, upgrades } from "./inventory.js";
//Saving and loading functions

export function saveGame() {
  //Saved the current state of the progress
  let currentState = {
    cups: objetoClick.cup,
    cupsPerSecond: objetoClick.cupPerSecond,
    progreso: inventory,
    upgrades: upgrades,
  };
  localStorage.setItem("save", JSON.stringify(currentState));
  console.log("Saved");
}

export function loadGame() {
  let saveGame = JSON.parse(localStorage.getItem("save")); //Again we parsed the Json for making it a usable jsObject
  if (saveGame) {
    objetoClick.cup = saveGame.cups;
    objetoClick.cupPerSecond = saveGame.cupsPerSecond;
    for (let i = 0; i < inventory.length; i++) {
      // Iterates though the array for loading in the object the saved values
      inventory[i].amount = saveGame.progreso[i].amount;
      inventory[i].currentCost = saveGame.progreso[i].currentCost;
      inventory[i].increase = saveGame.progreso[i].increase;
      let aux = inventory[i];
      // And then it updates in the DOM
      document.getElementById(
        "show" + inventory[i].name + "Cost"
      ).innerText = `${numberFormat(prettify(aux.currentCost))}`;
      document.getElementById(
        "show" + inventory[i].name + "Cant"
      ).innerText = `${numberFormat(prettify(aux.amount))}`;
    }
    document.getElementById("showCounterPerSecond").innerText = numberFormat(
      prettify(objetoClick.cupPerSecond)
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

export function numberFormat(n) {
  if (n < 1000000) return n; // No formatting needed for numbers less than 1 million
  let suffixes = ["M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "De"];
  let suffixNum = Math.floor(Math.log10(n) / 6); // Divide log10 by 6 to get the order of magnitude in millions
  let shortNum = n / Math.pow(10, suffixNum * 6); // Divide the number by 10^(suffixNum * 6) to get the number in millions
  let formattedNum = shortNum.toFixed(1) + suffixes[suffixNum - 1]; // Add the appropriate suffix and format to 1 decimal place
  return formattedNum;
}
