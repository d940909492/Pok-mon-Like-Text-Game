const Move = require("../models/Move");

const moves = [
  // Normal moves
  {
    move_id: "scratch",
    name: "Scratch",
    type: "Normal",
    power: 40,
    accuracy: 100,
    max_pp: 35,
    description: "Scratches with sharp claws.",
  },
  {
    move_id: "tackle",
    name: "Tackle",
    type: "Normal",
    power: 40,
    accuracy: 100,
    max_pp: 35,
    description: "Charges into the target.",
  },

  // Fire moves
  {
    move_id: "ember",
    name: "Ember",
    type: "Fire",
    power: 40,
    accuracy: 100,
    max_pp: 25,
    effect: { type: "status", condition: "burn", chance: 10 },
    description: "Small flames that may burn.",
  },
  {
    move_id: "fire_fang",
    name: "Fire Fang",
    type: "Fire",
    power: 65,
    accuracy: 95,
    max_pp: 15,
    effect: { type: "status", condition: "burn", chance: 10 },
    description: "Fiery bite attack.",
  },

  // Water moves
  {
    move_id: "water_gun",
    name: "Water Gun",
    type: "Water",
    power: 40,
    accuracy: 100,
    max_pp: 25,
    description: "Shoots water at the target.",
  },
  {
    move_id: "bubble_beam",
    name: "Bubble Beam",
    type: "Water",
    power: 65,
    accuracy: 100,
    max_pp: 20,
    description: "Fires bubbles at the target.",
  },

  // Grass moves
  {
    move_id: "vine_whip",
    name: "Vine Whip",
    type: "Grass",
    power: 45,
    accuracy: 100,
    max_pp: 25,
    description: "Strikes with vines.",
  },
  {
    move_id: "razor_leaf",
    name: "Razor Leaf",
    type: "Grass",
    power: 55,
    accuracy: 95,
    max_pp: 25,
    description: "Sharp leaves attack.",
  },

  // Status moves
  {
    move_id: "growl",
    name: "Growl",
    type: "Normal",
    power: 0,
    accuracy: 100,
    max_pp: 40,
    effect: { type: "lower_attack" },
    description: "Growls to lower attack.",
  },
];

const seedMoves = async () => {
  await Move.insertMany(moves);
  console.log("✓ Moves seeded");
};

module.exports = seedMoves;
