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
  new Building(1, "Click", 15, 15, 0.1, "./assets/sprites_inv/Click.png"),
  new Building(
    2,
    "Emiliano Martinez",
    15,
    15,
    0.1,
    "./assets/sprites_inv/EmilianoMartinez.png"
  ),
  new Building(
    3,
    "Nahuel Molina",
    100,
    100,
    1,
    "./assets/sprites_inv/Molina02.png"
  ),
  new Building(
    4,
    "Nicolás Otamendi",
    1100,
    1100,
    8,
    "./assets/sprites_inv/Otamendi02.png"
  ),
  new Building(
    5,
    "Nicolas Tagliafico",
    12000,
    12000,
    47,
    "./assets/sprites_inv/Tagliafico02.png"
  ),
  new Building(
    6,
    "Ángel Di María",
    130000,
    130000,
    260,
    "./assets/sprites_inv/Di_Maria.png"
  ),
  new Building(
    7,
    "Alejandro Gomez",
    1400000,
    1400000,
    1400,
    "./assets/sprites_inv/Gomez02.png"
  ),
  new Building(
    8,
    "Rodrigo De Paul",
    20000000,
    20000000,
    7800,
    "./assets/sprites_inv/DePaul01.png"
  ),
  new Building(
    9,
    "Enzo Fernández",
    330000000,
    330000000,
    44000,
    "./assets/sprites_inv/Fernandez01.png"
  ),
  new Building(
    10,
    "Alexis Mac Allister",
    5100000000,
    5100000000,
    260000,
    "./assets/sprites_inv/MacAllister02.png"
  ),
  new Building(
    11,
    "Julián Álvarez",
    75000000000,
    75000000000,
    1600000,
    "./assets/sprites_inv/Alvarez01.png"
  ),
  new Building(
    12,
    "Lionel Messi",
    1000000000000,
    1000000000000,
    10000000,
    "./assets/sprites_inv/Messi02.png"
  ),
  new Building(
    13,
    "Lionel Scaloni",
    170000000000000,
    170000000000000,
    430000000,
    "./assets/sprites_inv/DTScaloni01.png"
  ),
];

// UPGRADES

class Upgrade {
  constructor(upgradeId, initialCost, currentCost) {
    this.upgradeId = upgradeId;
    this.initialCost = initialCost;
    this.currentCost = currentCost;
    this.boost = 2;
    this.quantity = 0;
  }
}

export const upgrades = [
  new Upgrade(1, 100, 100),
  new Upgrade(2, 1000, 1000),
  new Upgrade(3, 11000, 11000),
  new Upgrade(4, 120000, 120000),
  new Upgrade(5, 1300000, 1300000),
  new Upgrade(6, 14000000, 14000000),
  new Upgrade(7, 200000000, 200000000),
  new Upgrade(8, 3300000000, 3300000000),
  new Upgrade(9, 51000000000, 51000000000),
  new Upgrade(10, 750000000000, 750000000000),
  new Upgrade(11, 10000000000000, 10000000000000),
  new Upgrade(12, 140000000000000, 140000000000000),
  new Upgrade(13, 1700000000000000, 1700000000000000),
];
