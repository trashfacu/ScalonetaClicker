import { inventory, objetoClick, upgrades } from "./inventory.js";
import { deleteGame, loadGame, prettify, saveGame } from "./utils.js";
//Creation of the buildings
for (let data in inventory) {
  let divContainer = document.getElementById("buildingsContainer");
  const buildingHTML = `
  <div class="buildingStyle">
  <span class="span_left">
    <img src="${inventory[data].image}" alt="${inventory[data].name}" class="sprite" />
  </span>
  <span class="span_middle">
    <span class="span_middle_up">
      <p>${inventory[data].name}</p>
    </span>
      <span class="span_middle_down">
    <img src="${inventory[data].costImage}" alt="costBuilding_img" class="imgCost" />
    <p id="show${inventory[data].name}Cost" class="buildingCost">${inventory[data].initialCost}</p>
    </span>
  </span> 
  <span class="span_right">
    <p id="show${inventory[data].name}Cant" class="buildingCant">${inventory[data].amount}</p>
    </span>
    </div>
`;
  divContainer.innerHTML += buildingHTML;
}

//Remove draggin images
document.getElementsByClassName("sprite").draggable = false;
document.getElementById("clickToIncrease").draggable = false;

//Increment counter and display it.

function counterCupIncrease() {
  objetoClick.cup += objetoClick.cupsPerClick; //add the quantity of counter per click to the total
  document.getElementById("showCounter").innerText = prettify(objetoClick.cup);
}

window.setInterval(function () {
  objetoClick.cup += objetoClick.cupPerSecond;
  document.getElementById("showCounter").innerText = prettify(objetoClick.cup);
}, 1000);

let btnIncreaseCounting = document.getElementById("clickToIncrease");
btnIncreaseCounting.addEventListener("click", counterCupIncrease);

function nextCost(baseCost, quantity) {
  return (baseCost = Math.round(baseCost * Math.pow(1.15, quantity)));
}

function buyBuilding(index) {
  if (objetoClick.cup >= inventory[index].currentCost) {
    // Restar copas
    objetoClick.cup -= inventory[index].currentCost;
    // Mostrar copas restantes
    document.getElementById("showCounter").innerText = objetoClick.cup;
    // Aumentar amount de edificios
    inventory[index].amount++;
    // Mostrar amount de edificios
    document.getElementById(
      "show" + inventory[index].name + "Cant"
    ).innerText = `Tienes: ${inventory[index].amount}`;
    // Aumentar copas por segundo
    objetoClick.cupPerSecond += inventory[index].increase;
    // Mostrar copas por segundo
    document.getElementById("showCounterPerSecond").innerText = prettify(
      objetoClick.cupPerSecond
    );
    // Calcular initialCost siguiente
    let nextCostBuilding = nextCost(
      inventory[index].initialCost,
      inventory[index].amount
    );
    // Asignar initialCost siguiente al inventario
    inventory[index].currentCost = nextCostBuilding;
    // Mostrar initialCost siguiente
    document.getElementById(
      "show" + inventory[index].name + "Cost"
    ).innerText = `Valor: ${nextCostBuilding}`;
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
const upgradeDiv = document.getElementById("upgrade_list");
//TODO add images to upgrades

for (let i = 0; i < upgrades.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = `
  <img src="${upgrades[i].image}" alt="${upgrades[i].name}"/>
  `;
  upgradeDiv.appendChild(li);
}

//Creation of the tooltip to show the description when hovered

const upgradeImgs = document.querySelectorAll("#upgrade_list img");

for (let i = 0; i < upgradeImgs.length; i++) {
  upgradeImgs[i].addEventListener("mouseover", function () {
    // create a tooltip element
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.innerHTML = upgrades[i].description;
    upgradeImgs[i].parentNode.appendChild(tooltip);
  });

  upgradeImgs[i].addEventListener("mouseout", function () {
    const tooltip = document.querySelector(".tooltip");
    tooltip.remove();
  });
}

function buyUpgrade(index) {
  if (objetoClick.cup >= upgrades[index].cost && inventory[index].amount > 0) {
    //Remove the cost of the upgrade and show the cups left
    objetoClick.cup -= upgrades[index].cost;
    document.getElementById("showCounter").innerText = objetoClick.cup;
    // Add 1 to the quantity of the upgrades cant and shows what upgrade it is.
    upgrades[index].quantity++;
    document.getElementById(
      `upgradeQty${index}`
    ).innerText = `Upgrade n°: ${upgrades[index].quantity}`;
    // Matching the upgrade to their building
    const buildingIndex = inventory.findIndex(
      (building) => building.buildingId === upgrades[index].upgradeId
    );
    inventory[buildingIndex].increase *= upgrades[index].boost;
    objetoClick.cupPerSecond += inventory[buildingIndex].increase;
    document.getElementById("showCounterPerSecond").innerText = prettify(
      objetoClick.cupPerSecond
    );
    // calculate the next cost for the building
    let nextCostUpgrade = nextCost(
      upgrades[index].baseCost,
      upgrades[index].quantity
    );
    upgrades[index].initialCost = nextCostUpgrade;
    // shows it in the card
    document.getElementById(
      `upgradeBoost${index}`
    ).innerText = `Costo: ${prettify(nextCostUpgrade)}`;
    //Shows it in the player card
    document.getElementById(
      `show${inventory[index].name}Boost`
    ).innerText = `Genera: ${inventory[index].increase}`;
    saveGame();
  } else {
    console.error("U cant buy this!");
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
