// Arr of clicker's elements

export let objetoClick = {
  cup: 0,
  cupPerSecond: 0,
  cupsPerClick: 1,
  totalCups: 0,
};

// INVENTARIO}

class Building {
  constructor(
    id,
    name,
    initialCost,
    currentCost,
    increase,
    image,
    costImage = "./assets/click.me.png"
  ) {
    this.id = id;
    this.name = name;
    this.initialCost = initialCost;
    this.currentCost = currentCost;
    this.amount = 0;
    this.maxAmount = 5000;
    this.increase = increase;
    this.image = image;
    this.costImage = costImage;
  }
}

export const inventory = [
  new Building(
    1,
    "Emiliano Martinez",
    15,
    15,
    0.1,
    "./assets/sprites_inv/EmilianoMartinez.png"
  ),
  new Building(
    2,
    "Nahuel Molina",
    100,
    100,
    1,
    "./assets/sprites_inv/Molina02.png"
  ),
  new Building(
    3,
    "Nicolás Otamendi",
    1100,
    1100,
    8,
    "./assets/sprites_inv/Otamendi02.png"
  ),
  new Building(
    4,
    "Nicolas Tagliafico",
    12000,
    12000,
    47,
    "./assets/sprites_inv/Tagliafico02.png"
  ),
  new Building(
    5,
    "Ángel Di María",
    130000,
    130000,
    260,
    "./assets/sprites_inv/Di_Maria.png"
  ),
  new Building(
    6,
    "Alejandro Gomez",
    1400000,
    1400000,
    1400,
    "./assets/sprites_inv/Gomez02.png"
  ),
  new Building(
    7,
    "Rodrigo De Paul",
    20000000,
    20000000,
    7800,
    "./assets/sprites_inv/DePaul01.png"
  ),
  new Building(
    8,
    "Enzo Fernández",
    330000000,
    330000000,
    44000,
    "./assets/sprites_inv/Fernandez01.png"
  ),
  new Building(
    9,
    "Alexis Mac Allister",
    5100000000,
    5100000000,
    260000,
    "./assets/sprites_inv/MacAllister02.png"
  ),
  new Building(
    10,
    "Julián Álvarez",
    75000000000,
    75000000000,
    1600000,
    "./assets/sprites_inv/Alvarez01.png"
  ),
  new Building(
    11,
    "Lionel Messi",
    1000000000000,
    1000000000000,
    10000000,
    "./assets/sprites_inv/Messi02.png"
  ),
  new Building(
    12,
    "Lionel Scaloni",
    14000000000000,
    14000000000000,
    65000000,
    "./assets/sprites_inv/DTScaloni01.png"
  ),
];

// UPGRADES

class Upgrade {
  constructor(upgradeId, name, initialCost, currentCost, image, description) {
    this.upgradeId = upgradeId;
    this.name = name;
    this.initialCost = initialCost;
    this.currentCost = currentCost;
    this.costImage = "./assets/click.me.png";
    this.boost = 2;
    this.quantity = 0;
    this.image = image;
    this.description = description;
  }
}

export const upgrades = [
  new Upgrade(
    1,
    "Guantes de oro",
    100,
    100,
    "../assets/sprites_upgrades/EmilianoMartinez_upgrade.png",
    "Aumenta la producción de Emiliano Martinez en un 100%"
  ),
];
