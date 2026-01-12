const Item = require("../models/Item");

const items = [
  {
    item_id: "potion",
    name: "Potion",
    type: "healing",
    effect: { type: "heal_hp", value: 50 },
    buy_price: 20,
    sell_price: 10,
    description: "Restores 50 HP",
  },
  {
    item_id: "super_potion",
    name: "Super Potion",
    type: "healing",
    effect: { type: "heal_hp", value: 100 },
    buy_price: 50,
    sell_price: 25,
    description: "Restores 100 HP",
  },

  {
    item_id: "pokeball",
    name: "Poké Ball",
    type: "pokeball",
    effect: { type: "catch", value: 1.0 },
    buy_price: 10,
    sell_price: 5,
    description: "A device for catching creatures",
  },
  {
    item_id: "greatball",
    name: "Great Ball",
    type: "pokeball",
    effect: { type: "catch", value: 1.5 },
    buy_price: 30,
    sell_price: 15,
    description: "Better catch rate",
  },

  {
    item_id: "antidote",
    name: "Antidote",
    type: "status_heal",
    effect: { type: "cure_status", conditions: ["poison"] },
    buy_price: 15,
    sell_price: 7,
    description: "Cures poison",
  },

  {
    item_id: "town_map",
    name: "Town Map",
    type: "key",
    effect: { type: "open_map" },
    buy_price: 50,
    sell_price: 25,
    max_stack: 1,
    description: "Shows the world map",
  },
];

const seedItems = async () => {
  const inserted = await Item.insertMany(items);
  console.log(`✓ Items seeded (${inserted.length})`);
  return inserted;
};

module.exports = seedItems;
