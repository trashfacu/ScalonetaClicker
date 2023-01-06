import { inventario, ObjetoClick, upgrades } from "./inventory.js";
import { deleteGame, loadGame, prettify, saveGame } from "./utils.js";
//Formating and styling

//Creation of the buildings
for (let data in inventario) {
  let divContainer = document.getElementById("buildingsContainer");
  const buildingHTML = `
  <div id="${inventario[data].nombreDeClase}" class="buildingStyle">
    <img src="${inventario[data].imagen}" alt="${inventario[data].nombreDeClase}" id="sprite" />
    <p id="${inventario[data].nombreDeClase}">${inventario[data].nombre}</p>
    <p id="show${inventario[data].nombre}Cost">${inventario[data].costo}</p>
    <p id="show${inventario[data].nombre}Cant">0</p>
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
  // Verificar si hay copas suficientes
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
    ).innerText = inventario[index].cantidad;
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
  }
}

const btnBuyBuilding = document.getElementsByClassName("buildingStyle");

for (let i = 0; i < btnBuyBuilding.length; i++) {
  btnBuyBuilding[i].addEventListener("click", function () {
    buyBuilding(i);
  });
}

// Creation of upgrades
const upgradeListElement = document.getElementById("upgradeList");
for (let i = 0; i < upgrades.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = `${upgrades[i].name}: ${upgrades[i].description} <button class="buyUpgrade">Buy</button>`;

  upgradeListElement.appendChild(li);
}

function buyUpgrade(index) {
  if (ObjetoClick.cup >= upgrades[index].cost) {
    ObjetoClick.cup -= upgrades[index].cost;
    document.getElementById("showCounter").innerText = ObjetoClick.cup;
    //Remove the cost of the upgrade and show the cups left

    const buildingIndex = inventario.findIndex(
      (building) => building.buildingId === upgrades[index].upgradeId
    );
    inventario[buildingIndex].aumento *= upgrades[index].mejora;
    document.getElementById("showCounterPerSecond").innerText = prettify(
      inventario[buildingIndex].aumento
    );
  }
}

const btnBuyUpgrade = document.getElementsByClassName("buyUpgrade");
for (let i = 0; i < btnBuyUpgrade.length; i++) {
  btnBuyUpgrade[i].addEventListener("click", function () {
    buyUpgrade(i);
  });
}

// Saving / deleting / loading
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", saveGame);

const delButton = document.getElementById("delButton");
delButton.addEventListener("click", deleteGame);

window.onload = function () {
  loadGame();
};
