import { inventory, objetoClick, upgrades } from "./inventory.js";
import {
  deleteGame,
  loadGame,
  prettify,
  saveGame,
  numberFormat,
} from "./utils.js";
//Creation of the building
for (let data in inventory) {
  let divContainer = document.getElementById("buildingsContainer");
  const buildingHTML = `
  <div class="buildingStyle">
  <span class="span_left">
    <img src="${inventory[data].image}" alt="${
    inventory[data].name
  }" class="sprite" />
  </span>
  <span class="span_middle">
    <span class="span_middle_up">
      <p>${inventory[data].name}</p>
    </span>
      <span class="span_middle_down">
    <img src="${
      inventory[data].costImage
    }" alt="costBuilding_img" class="imgCost" />
    <p id="show${inventory[data].name}Cost" class="buildingCost">${numberFormat(
    inventory[data].initialCost
  )}</p>
    </span>
  </span> 
  <span class="span_right">
    <p id="show${inventory[data].name}Cant" class="buildingCant">${
    inventory[data].amount
  }</p>
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
  document.getElementById("showCounter").innerText = numberFormat(
    prettify(objetoClick.cup)
  );
}

window.setInterval(function () {
  objetoClick.cup += objetoClick.cupPerSecond;
  document.getElementById("showCounter").innerText = numberFormat(
    prettify(objetoClick.cup)
  );
}, 1000);

let btnIncreaseCounting = document.getElementById("clickToIncrease");
btnIncreaseCounting.addEventListener("click", counterCupIncrease);

function nextCost(baseCost, quantity) {
  return (baseCost = Math.round(baseCost * Math.pow(1.15, quantity)));
}

function buyBuilding(index) {
  if (inventory[index].amount < inventory[index].maxAmount) {
    if (objetoClick.cup >= inventory[index].currentCost) {
      objetoClick.cup -= inventory[index].currentCost;
      document.getElementById("showCounter").innerText = objetoClick.cup;
      inventory[index].amount++;
      document.getElementById(
        "show" + inventory[index].name + "Cant"
      ).innerText = `${inventory[index].amount}`;
      objetoClick.cupPerSecond += inventory[index].increase;
      document.getElementById("showCounterPerSecond").innerText = numberFormat(
        prettify(objetoClick.cupPerSecond)
      );
      let nextCostBuilding = nextCost(
        inventory[index].initialCost,
        inventory[index].amount
      );
      inventory[index].currentCost = nextCostBuilding;
      document.getElementById(
        "show" + inventory[index].name + "Cost"
      ).innerText = `${nextCostBuilding}`;
      saveGame();
    }
  } else if (objetoClick.cup >= inventory[index].currentCost) {
    console.error("No tienes suficientes copas");
  } else {
    alert("Haz llegado al limite de edificios de este tipo que puedes comprar");
  }
}

const btnBuyBuilding = document.getElementsByClassName("buildingStyle");

for (let i = 0; i < btnBuyBuilding.length; i++) {
  btnBuyBuilding[i].addEventListener("click", function () {
    buyBuilding(i);
  });
}

// Creation of upgrades and the tooltip
const upgradeDiv = document.getElementById("upgrade_list");

for (let i = 0; i < upgrades.length; i++) {
  const li = document.createElement("li");
  li.innerHTML = `
  <div class="upgrade-item">
    <img src="${upgrades[i].image}" alt="${upgrades[i].name}" class="buyUpgrade"/>
    <span class="hiden"> 
    <div class="tooltip_container">
      <div class="tooltip_up">
        <img src="${upgrades[i].image}" alt="upgrade image">
        <p>${upgrades[i].name}</p>
        <img src="${upgrades[i].costImage}">
        <p>${upgrades[i].currentCost}</p>
      </div>
      <div class="tooltip_down">
        <p>${upgrades[i].description}</p>
      </div>
    </div>
    </span>
  </div>
  `;
  upgradeDiv.appendChild(li);
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
    ).innerText = `Costo: ${numberFormat(prettify(nextCostUpgrade))}`;
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
