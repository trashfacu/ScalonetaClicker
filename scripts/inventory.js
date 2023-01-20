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
    costImage: "./assets/click.me.png",
  };
}

export const inventory = [
  createArrayBuildings(
    1,
    "Emiliano Martinez",
    15,
    15,
    0.1,
    "./assets/sprites_inv/EmilianoMartinez.png",
    "Esta mejora aumenta las copas que genera Emi Martinez y duplica lo que genera cada clic."
  ),
  createArrayBuildings(
    2,
    "Nahuel Molina",
    100,
    100,
    1,
    "./assets/sprites_inv/Molina02.png"
  ),
  createArrayBuildings(
    3,
    "Nicolás Otamendi",
    1100,
    1100,
    8,
    "./assets/sprites_inv/Otamendi02.png"
  ),
  createArrayBuildings(
    4,
    "Nicolas Tagliafico",
    12000,
    12000,
    47,
    "./assets/sprites_inv/Tagliafico02.png"
  ),
  createArrayBuildings(
    5,
    "Ángel Di María",
    130000,
    130000,
    260,
    "./assets/sprites_inv/Di_Maria.png"
  ),
  createArrayBuildings(
    6,
    "Alejandro Gomez",
    1400000,
    1400000,
    1400,
    "./assets/sprites_inv/Gomez02.png"
  ),
  createArrayBuildings(
    7,
    "Rodrigo De Paul",
    20000000,
    20000000,
    7800,
    "./assets/sprites_inv/DePaul01.png"
  ),
  createArrayBuildings(
    8,
    "Enzo Fernández",
    330000000,
    330000000,
    44000,
    "./assets/sprites_inv/Fernandez01.png"
  ),
  createArrayBuildings(
    9,
    "Alexis Mac Allister",
    5100000000,
    5100000000,
    260000,
    "./assets/sprites_inv/MacAllister02.png"
  ),
  createArrayBuildings(
    10,
    "Julián Álvarez",
    75000000000,
    75000000000,
    1600000,
    "./assets/sprites_inv/Alvarez01.png"
  ),
  createArrayBuildings(
    11,
    "Lionel Messi",
    1000000000000,
    1000000000000,
    10000000,
    "./assets/sprites_inv/Messi02.png"
  ),
  createArrayBuildings(
    12,
    "Lionel Scaloni",
    14000000000000,
    14000000000000,
    65000000,
    "./assets/sprites_inv/DTScaloni01.png"
  ),
];

// UPGRADES

export const upgrades = inventory.map((building, index) => {
  return {
    upgradeId: building.buildingId,
    name: `Upgrade for ${building.name}`,
    baseCost: Math.round(building.initialCost * (index + 1) * 10),
    cost: Math.round(building.initialCost * (index + 1) * 10),
    costImage: "./assets/click.me.png",
    boost: 2,
    quantity: 0,
    image: `./assets/sprites_upgrades/${building.name}_upgrade.png`,
    description: `Mejora para ${building.name} que duplica la cantidad de copas que genera.`,
  };
});
