// Arr of clicker's elements

export let objetoClick = {
  cup: 0,
  cupPerSecond: 0,
  cupsPerClick: 1,
  totalCups: 0,
};

// INVENTARIO}

function createArrayBuildings(
  id,
  name,
  initialCost,
  currentCost,
  increase,
  image
) {
  return {
    id: id,
    name: name,
    initialCost: initialCost,
    currentCost: currentCost,
    amount: 0,
    increase: increase,
    image: image,
  };
}

export const inventory = [
  createArrayBuildings(
    1,
    "Emiliano Martinez",
    15,
    15,
    0.1,
    "./assets/sprites_inv/23 Emiliano Martinez 04.jpg"
  ),
  createArrayBuildings(
    2,
    "Nahuel Molina",
    100,
    100,
    1,
    "./assets/sprites_inv/26 Molina 02.jpg"
  ),
  createArrayBuildings(
    3,
    "Nicolás Otamendi",
    1100,
    1100,
    8,
    "./assets/sprites_inv/19 Otamendi 02.jpg"
  ),
  createArrayBuildings(
    4,
    "Nicolas Tagliafico",
    12000,
    12000,
    47,
    "./assets/sprites_inv/3 Tagliafico 02.jpg"
  ),
  createArrayBuildings(
    5,
    "Ángel Di María",
    130000,
    130000,
    260,
    "./assets/sprites_inv/11 Di Maria 03.jpg"
  ),
  createArrayBuildings(
    6,
    "Alejandro Gomez",
    1400000,
    1400000,
    1400,
    "./assets/sprites_inv/17 Gomez 02.jpg"
  ),
  createArrayBuildings(
    7,
    "Rodrigo De Paul",
    20000000,
    20000000,
    7800,
    "./assets/sprites_inv/7 De Paul 01.jpg"
  ),
  createArrayBuildings(
    8,
    "Enzo Fernández",
    330000000,
    330000000,
    44000,
    "./assets/sprites_inv/24 Fernandez 01.jpg"
  ),
  createArrayBuildings(
    9,
    "Alexis Mac Allister",
    5100000000,
    5100000000,
    260000,
    "./assets/sprites_inv/20 Mac Allister 02.jpg"
  ),
  createArrayBuildings(
    10,
    "Julián Álvarez",
    75000000000,
    75000000000,
    1600000,
    "./assets/sprites_inv/9 Alvarez 01.jpg"
  ),
  createArrayBuildings(
    11,
    "Lionel Messi",
    1000000000000,
    1000000000000,
    10000000,
    "./assets/sprites_inv/10 Messi 02.jpg"
  ),
  createArrayBuildings(
    12,
    "Lionel Scaloni",
    14000000000000,
    14000000000000,
    65000000,
    "./assets/sprites_inv/DT Scaloni 01.jpg"
  ),
];

// UPGRADES

export const upgrades = inventory.map((building, index) => {
  return {
    upgradeId: building.buildingId,
    name: `Upgrade for ${building.name}`,
    baseCost: Math.round(building.initialCost * (index + 1) * 10),
    cost: Math.round(building.initialCost * (index + 1) * 10),
    boost: 2,
    quantity: 0,
  };
});
