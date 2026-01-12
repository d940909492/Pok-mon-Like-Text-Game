const Location = require("../models/Location");

const locations = [
  {
    location_id: "starter_town",
    name: "Starter Town",
    coordinates: { x: 1, y: 1 },
    type: "town",
    encounter_rate: 0,
    has_pokemon_center: true,
    has_shop: true,
    shop_inventory: ["potion", "pokeball", "antidote", "town_map"],
    has_gym: false,
    can_explore: true,
    explore_events: {
      trainer_encounter: { chance: 0.3, possible_trainers: [] },
      find_money: { chance: 0.15, min_amount: 20, max_amount: 100 },
      find_item: {
        chance: 0.15,
        possible_items: [{ item: "potion", weight: 50 }],
      },
      find_nothing: { chance: 0.4 },
    },
    travel_cost: 0,
    description: "A peaceful town where trainers begin.",
  },
];

const seedLocations = async () => {
  await Location.insertMany(locations);
  console.log("✓ Locations seeded");
};

module.exports = seedLocations;
