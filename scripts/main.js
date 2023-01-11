import { inventario, ObjetoClick, upgrades } from "./inventory.js";
import { deleteGame, loadGame, prettify, saveGame } from "./utils.js";
//Formating and styling

//Creation of the buildings
for (let data in inventario) {
  let divContainer = document.getElementById("buildingsContainer");
  const buildingHTML = `
  <div class="buildingStyle">
    <img src="${inventario[data].imagen}" alt="${inventario[data].nombreDeClase}" id="sprite" />
    <p>${inventario[data].nombre}</p>
    <p id="show${inventario[data].nombre}Cost">Valor: ${inventario[data].costo}</p>
    <p id="show${inventario[data].nombre}Cant">Tienes: ${inventario[data].cantidad}</p>
    <p id="show${inventario[data].nombre}Boost">Genera: ${inventario[data].aumento}</p>
  </div>
`;
  divContainer.innerHTML += buildingHTML;
}

//Increment counter and display it.

function counterCupIncrease() {
  ObjetoClick.cup += ObjetoClick.cupsPerClick; //add the quantity of counter per click to the total
  document.getElementById("showCounter").innerText = prettify(ObjetoClick.cup);
}

window.setInterval(function () {
  ObjetoClick.cup += ObjetoClick.cupPerSecond;
  document.getElementById("showCounter").innerText = prettify(ObjetoClick.cup);
}, 1000);

let btnIncreaseCounting = document.getElementById("clickToIncrease");
btnIncreaseCounting.addEventListener("click", counterCupIncrease);

function nextCost(baseCost, quantity) {
  return (baseCost = Math.round(baseCost * Math.pow(1.15, quantity)));
}

function buyBuilding(index) {
  if (ObjetoClick.cup >= inventario[index].costo) {
    // Restar copas
    ObjetoClick.cup -= inventario[index].costo;
    // Mostrar copas restantes
    document.getElementById("showCounter").innerText = ObjetoClick.cup;
    // Aumentar cantidad de edificios
    inventario[index].cantidad++;
    // Mostrar cantidad de edificios
    document.getElementById(
      "show" + inventario[index].nombre + "Cant"
    ).innerText = `Tienes: ${inventario[index].cantidad}`;
    // Aumentar copas por segundo
    ObjetoClick.cupPerSecond += inventario[index].aumento;
    // Mostrar copas por segundo
    document.getElementById("showCounterPerSecond").innerText = prettify(
      ObjetoClick.cupPerSecond
    );
    // Calcular costo siguiente
    let nextCostBuilding = nextCost(
      inventario[index].costoBase,
      inventario[index].cantidad
    );
    // Asignar costo siguiente al inventario
    inventario[index].costo = nextCostBuilding;
    // Mostrar costo siguiente
    document.getElementById(
      "show" + inventario[index].nombre + "Cost"
    ).innerText = nextCostBuilding;
    saveGame();
  }
}

const btnBuyBuilding = document.getElementsByClassName("buildingStyle");

for (let i = 0; i < btnBuyBuilding.length; i++) {
  btnBuyBuilding[i].addEventListener("click", function () {
    buyBuilding(i);
  });
}

// Creation of upgrades
const upgradeDiv = document.getElementById("upgradeList");
for (let i = 0; i < upgrades.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = `
  <p>${upgrades[i].name}</p>
  
  <p id="upgradeBoost${i}" class="upgradeStyle"> Costo: ${upgrades[i].cost}</p>
  <p id="upgradeQty${i}" class="upgradeStyle">Upgrade n°: ${upgrades[i].quantity}</p>
  <button class="buyUpgrade">Buy</button>`;
  upgradeDiv.appendChild(li);
}

function buyUpgrade(index) {
  if (
    ObjetoClick.cup >= upgrades[index].cost &&
    inventario[index].cantidad > 0
  ) {
    //Remove the cost of the upgrade and show the cups left
    ObjetoClick.cup -= upgrades[index].cost;
    document.getElementById("showCounter").innerText = ObjetoClick.cup;
    // Add 1 to the quantity of the upgrades cant and shows what upgrade it is.
    upgrades[index].quantity++;
    document.getElementById(
      `upgradeQty${index}`
    ).innerText = `Upgrade n°: ${upgrades[index].quantity}`;
    // Matching the upgrade to their building
    const buildingIndex = inventario.findIndex(
      (building) => building.buildingId === upgrades[index].upgradeId
    );
    inventario[buildingIndex].aumento *= upgrades[index].boost;
    ObjetoClick.cupPerSecond += inventario[buildingIndex].aumento;
    document.getElementById("showCounterPerSecond").innerText = prettify(
      ObjetoClick.cupPerSecond
    );
    // calculate the next cost for the building
    let nextCostUpgrade = nextCost(
      upgrades[index].baseCost,
      upgrades[index].quantity
    );
    upgrades[index].costo = nextCostUpgrade;
    // showing it in the card
    document.getElementById(
      `upgradeBoost${index}`
    ).innerText = `Costo: ${prettify(nextCostUpgrade)}`;
  } else {
    console.error("No tienes ese edificio");
  }
}

const btnBuyUpgrade = document.getElementsByClassName("buyUpgrade");
for (let i = 0; i < btnBuyUpgrade.length; i++) {
  btnBuyUpgrade[i].addEventListener("click", function () {
    buyUpgrade(i);
  });
}

// Saving / deleting / loading
const delButton = document.getElementById("restartBtn");
delButton.addEventListener("click", deleteGame);

setInterval(function () {
  saveGame();
}, 600000);

window.onload = function () {
  loadGame();
};
