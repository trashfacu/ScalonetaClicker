
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
    <div class="InventoryContainer">
      <div class="BuildingStyle" id="id-building">
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
            <p id="show${
              inventory[data].name
            }Cost" class="BuildingCost">${numberFormat(
      inventory[data].initialCost
    )}</p>
          </span>
        </span> 
        <span class="SpanRight">
          <p id="show${inventory[data].name}Cant" class="BuildingCant">${
      inventory[data].amount
    }</p>
    </div>
    </span>
    <button class="UpgradeBtn"><p>Upgrade</p><span><img src="${
      inventory[data].costImage
    }" class="ImgCost"><p id="UpgradeCurrentCost">${numberFormat(
      prettify(upgrades[data].currentCost)
    )}</p></span></button>
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

  function buyUpgrade(index) {
    if (
      objetoClick.cup >= upgrades[index].currentCost &&
      inventory[index].amount > 0
    ) {
      //Remove the cost of the upgrade and show the cups left
      objetoClick.cup -= upgrades[index].currentCost;

      document.getElementById("id-showCounter").innerText = objetoClick.cup;
      // Add 1 to the quantity of the upgrades cant and shows what upgrade it is.
      upgrades[index].quantity++;
      // Matching the upgrade to their building
      const buildingIndex = inventory.findIndex(
        (building) => building.id === upgrades[index].upgradeId
      );
      //Incrase the boost

      if(buildingIndex === 0){
        objetoClick.cupsPerClick += 1;
        console.log(objetoClick.cupsPerClick)
      }

      inventory[buildingIndex].increase *= upgrades[index].boost;
      objetoClick.cupPerSecond += inventory[buildingIndex].increase;
      document.getElementById("id-showCounterPerSecond").innerText = prettify(
        objetoClick.cupPerSecond
      );
      // calculate the next cost for the building
      let nextCostUpgrade = upgrades[index].currentCost * 2;
      upgrades[index].currentCost = nextCostUpgrade;
      document.getElementById("UpgradeCurrentCost").innerText = prettify(
        upgrades[index].currentCost
      );
      saveGame();
    } else {
      console.error("U cant buy this!");
    }
  }

  //! AGREGAR QUE CUANDO SE COMPRE EL UPGRADE DEL CKICK AUMENTE LA CANTIDAD DE COPAS CLICKEADAS.

  // FOR TEST
  // console.error(
  //   "U cant buy this!" +
  //     `These are the params...${upgrades[index].initialCost} ,
  //       ${upgrades[index].currentCost},
  //       ${upgrades[index].quantity},
  //       ${upgrades[index].upgradeId}
  //     }`

  const btnBuyUpgrade = document.getElementsByClassName("UpgradeBtn");
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
