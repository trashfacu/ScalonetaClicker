import { inventario, ObjetoClick, upgrades } from "./inventory.js";
//Formating and styling

function formatCupValue(number) {
  return Math.round(number * 10) / 10;
}

function formatCostValue(value) {
  if (value >= 1000000) {
    let formattedValue = (value / 1000000).toFixed(1);
    formattedValue = formattedValue.replace(".0", "");
    formattedValue += "M";
    return formattedValue;
  }
  return value;
}

//Creation of the buildings
for (let data in inventario) {
  let divContainer = document.getElementById("buildingsContainer");
  const buildingHTML = `
  <div id="${inventario[data].nombreDeClase}" class="buildingStyle">
    <img src="${inventario[data].imagen}" alt="${
    inventario[data].nombreDeClase
  }" id="sprite" />
    <p id="${inventario[data].nombreDeClase}">${inventario[data].nombre}</p>
    <p id="show${inventario[data].nombre}Cost">${formatCostValue(
    inventario[data].costo
  )}</p>
    <p id="show${inventario[data].nombre}Cant">0</p>
  </div>
`;
  divContainer.innerHTML += buildingHTML;
}

//Increment counter and display it.

function counterCupIncrease() {
  ObjetoClick.cup += ObjetoClick.cupsPerClick; //add the quantity of counter per click to the total
  document.getElementById("showCounter").innerText = ObjetoClick.cup;
}

window.setInterval(function () {
  ObjetoClick.cup += ObjetoClick.cupPerSecond;
  document.getElementById("showCounter").innerText = formatCupValue(
    ObjetoClick.cup
  );
}, 1000);

let btnIncreaseCounting = document.getElementById("clickToIncrease");
btnIncreaseCounting.addEventListener("click", counterCupIncrease);

function nextCost(baseCost, quantity, currentCups) {
  return (baseCost = Math.round(
    baseCost * Math.pow(1.15, quantity) + currentCups * 0.1
  ));
}

function buyBuilding(index) {
  if (ObjetoClick.cup >= inventario[index].costo) {
    ObjetoClick.cup -= inventario[index].costo; // subtract the amount of cups corresponding to the cost of the building
    document.getElementById("showCounter").innerText = formatCupValue(
      ObjetoClick.cup
    ); // shows them in the counter
    inventario[index].cantidad++; //add +1 to the building quantity
    document.getElementById(
      "show" + inventario[index].nombre + "Cant"
    ).innerText = inventario[index].cantidad; //show it in the building counter
    ObjetoClick.cupPerSecond += inventario[index].aumento; //increase the number of cups generated per second
    document.getElementById("showCounterPerSecond").innerText = formatCupValue(
      ObjetoClick.cupPerSecond
    ); //shows it in the counter
    let nextCostBuilding = nextCost(
      inventario[index].costo,
      inventario[index].cantidad,
      ObjetoClick.cup
    ); // increase the next cost
    document.getElementById(
      "show" + inventario[index].nombre + "Cost"
    ).innerText = nextCostBuilding; // updates it in the DOM
  } else {
    console.log("Te faltan copas");
  }
}

let btnBuyBuilding = document.getElementsByClassName("buildingStyle");

for (let i = 0; i < btnBuyBuilding.length; i++) {
  btnBuyBuilding[i].addEventListener("click", function () {
    buyBuilding(i);
  });
}

// Upgrades

const upgradeListElement = document.getElementById("upgradeList");
for (let i = 0; i < upgrades.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = `${upgrades[i].name}: ${upgrades[i].description} <button onclick="buyUpgrade(${i})">Buy</button>`;

  upgradeListElement.appendChild(li);
}
