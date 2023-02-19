import { inventory, objetoClick, upgrades } from "./inventory.js";
import {
  deleteGame,
  loadGame,
  prettify,
  saveGame,
  numberFormat,
} from "./utils.js";

//Function of the carrousel
const images = document.querySelectorAll("#id-displayCarousel img");
let index = 0;

function displayImage() {
  images.forEach((image) => (image.style.display = "none"));
  images[index].style.display = "block";
}

setInterval(() => {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  displayImage();
}, 10000);

//Creation of the building
for (let data in inventory) {
  let divContainer = document.getElementById("id-buildingsContainer");
  const buildingHTML = `
  <div class="BuildingStyle">
  <span class="SpanLeft">
    <img src="${inventory[data].image}" alt="${
    inventory[data].name
  }" class="Sprite" />
  </span>
  <span class="SpanMiddle">
    <span class="SpanMiddleUp">
      <p>${inventory[data].name}</p>
    </span>
      <span class="SpanMiddleBottom">
    <img src="${
      inventory[data].costImage
    }" alt="costBuilding_img" class="ImgCost" />
    <p id="show${inventory[data].name}Cost" class="BuildingCost">${numberFormat(
    inventory[data].initialCost
  )}</p>
    </span>
  </span> 
  <span class="SpanRight">
    <p id="show${inventory[data].name}Cant" class="BuildingCant">${
    inventory[data].amount
  }</p>
    </span>
    </div>
`;
  divContainer.innerHTML += buildingHTML;
}

//Remove draggin images
document.getElementsByClassName("Sprite").draggable = false;
document.getElementById("id-clickToIncrease").draggable = false;

//Increment counter and display it.

function counterCupIncrease() {
  objetoClick.cup += objetoClick.cupsPerClick; //add the quantity of counter per click to the total
  document.getElementById("id-showCounter").innerText = numberFormat(
    prettify(objetoClick.cup)
  );
}

window.setInterval(function () {
  objetoClick.cup += objetoClick.cupPerSecond;
  document.getElementById("id-showCounter").innerText = numberFormat(
    prettify(objetoClick.cup)
  );
}, 1000);

let btnIncreaseCounting = document.getElementById("id-clickToIncrease");
btnIncreaseCounting.addEventListener("click", counterCupIncrease);

function nextCost(baseCost, quantity) {
  return (baseCost = Math.round(baseCost * Math.pow(1.15, quantity)));
}

function buyBuilding(index) {
  if (inventory[index].amount < inventory[index].maxAmount) {
    if (objetoClick.cup >= inventory[index].currentCost) {
      objetoClick.cup -= inventory[index].currentCost;
      document.getElementById("id-showCounter").innerText = objetoClick.cup;
      inventory[index].amount++;
      document.getElementById(
        "show" + inventory[index].name + "Cant"
      ).innerText = `${inventory[index].amount}`;
      objetoClick.cupPerSecond += inventory[index].increase;
      document.getElementById("id-showCounterPerSecond").innerText =
        numberFormat(prettify(objetoClick.cupPerSecond));
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

const btnBuyBuilding = document.getElementsByClassName("BuildingStyle");

for (let i = 0; i < btnBuyBuilding.length; i++) {
  btnBuyBuilding[i].addEventListener("click", function () {
    buyBuilding(i);
  });
}

//

function buyUpgrade(index) {
  if (objetoClick.cup >= upgrades[index].cost && inventory[index].amount > 0) {
    //Remove the cost of the upgrade and show the cups left
    objetoClick.cup -= upgrades[index].cost;
    document.getElementById("id-showCounter").innerText = objetoClick.cup;
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
    document.getElementById("id-showCounterPerSecond").innerText = prettify(
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

const btnBuyUpgrade = document.getElementsByClassName("BuyUpgrade");
for (let i = 0; i < btnBuyUpgrade.length; i++) {
  btnBuyUpgrade[i].addEventListener("click", function () {
    buyUpgrade(i);
  });
}

// Saving / deleting / loading
const delButton = document.getElementById("id-restartBtn");
delButton.addEventListener("click", deleteGame);

setInterval(function () {
  saveGame();
}, 600000);

window.onload = function () {
  loadGame();
};
