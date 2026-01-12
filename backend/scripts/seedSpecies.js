const Species = require("../models/Species");

const isObjectIdish = (schemaPath) => {
  const inst = schemaPath?.instance || schemaPath?.caster?.instance;
  return inst === "ObjectId" || inst === "ObjectID";
};

const species = [
  {
    species_name: "Firewolf",
    types: ["Fire"],
    base_stats: {
      hp: 50,
      attack: 60,
      defense: 45,
      speed: 55,
      sp_attack: 55,
      sp_defense: 45,
    },
    stat_growth: {
      hp: 3,
      attack: 4,
      defense: 2,
      speed: 3,
      sp_attack: 3,
      sp_defense: 2,
    },
    base_xp_yield: 65,
    catch_rate: 45,
    move_learning: [
      { level: 1, move: "scratch" },
      { level: 1, move: "growl" },
      { level: 5, move: "ember" },
      { level: 10, move: "fire_fang" },
    ],
    description: "A wolf-like creature with flames on its tail.",
  },
  {
    species_name: "Aquabird",
    types: ["Water"],
    base_stats: {
      hp: 55,
      attack: 50,
      defense: 50,
      speed: 60,
      sp_attack: 55,
      sp_defense: 50,
    },
    stat_growth: {
      hp: 3,
      attack: 3,
      defense: 3,
      speed: 4,
      sp_attack: 3,
      sp_defense: 3,
    },
    base_xp_yield: 60,
    catch_rate: 45,
    move_learning: [
      { level: 1, move: "tackle" },
      { level: 1, move: "water_gun" },
      { level: 7, move: "bubble_beam" },
    ],
    description: "A bird creature that controls water.",
  },
  {
    species_name: "Leafbug",
    types: ["Grass"],
    base_stats: {
      hp: 60,
      attack: 55,
      defense: 55,
      speed: 45,
      sp_attack: 50,
      sp_defense: 55,
    },
    stat_growth: {
      hp: 4,
      attack: 3,
      defense: 3,
      speed: 2,
      sp_attack: 3,
      sp_defense: 3,
    },
    base_xp_yield: 55,
    catch_rate: 45,
    move_learning: [
      { level: 1, move: "tackle" },
      { level: 1, move: "vine_whip" },
      { level: 9, move: "razor_leaf" },
    ],
    description: "A bug covered in leaves.",
  },
];

const seedSpecies = async ({ moveById } = {}) => {
  const movePath = Species.schema.path("move_learning.move");
  const moveIsObjectId = isObjectIdish(movePath);

  const payload = species.map((s) => {
    if (!moveIsObjectId || !moveById) return s;
    return {
      ...s,
      move_learning: (s.move_learning || []).map((ml) => ({
        ...ml,
        move: moveById[ml.move] || ml.move,
      })),
    };
  });

  const inserted = await Species.insertMany(payload);
  console.log(`✓ Species seeded (${inserted.length})`);
  return inserted;
};

module.exports = seedSpecies;
