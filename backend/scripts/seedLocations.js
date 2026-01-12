const Location = require("../models/Location");

const isObjectIdish = (schemaPath) => {
  const inst = schemaPath?.instance || schemaPath?.caster?.instance;
  return inst === "ObjectId" || inst === "ObjectID";
};

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

  // ✅ Added because seedBadges uses gym_location: "fire_town"
  {
    location_id: "fire_town",
    name: "Fire Town",
    coordinates: { x: 2, y: 1 },
    type: "town",
    encounter_rate: 0,
    has_pokemon_center: true,
    has_shop: true,
    shop_inventory: ["potion", "pokeball", "antidote"],
    has_gym: true,
    can_explore: true,
    explore_events: {
      trainer_encounter: { chance: 0.35, possible_trainers: [] },
      find_money: { chance: 0.15, min_amount: 30, max_amount: 140 },
      find_item: {
        chance: 0.15,
        possible_items: [
          { item: "super_potion", weight: 30 },
          { item: "potion", weight: 70 },
        ],
      },
      find_nothing: { chance: 0.35 },
    },
    travel_cost: 10,
    description: "A hot, bustling town with a fire-type gym.",
  },
];

const seedLocations = async ({ itemById } = {}) => {
  const shopPath = Location.schema.path("shop_inventory");
  const shopIsObjectIdArray =
    shopPath?.instance === "Array" && isObjectIdish(shopPath);

  const possibleItemPath = Location.schema.path(
    "explore_events.find_item.possible_items.item"
  );
  const possibleItemIsObjectId = isObjectIdish(possibleItemPath);

  const payload = locations.map((loc) => {
    const mapped = { ...loc };

    if (shopIsObjectIdArray && itemById) {
      mapped.shop_inventory = (mapped.shop_inventory || []).map(
        (id) => itemById[id] || id
      );
    }

    if (possibleItemIsObjectId && itemById) {
      const pi = mapped.explore_events?.find_item?.possible_items || [];
      mapped.explore_events = {
        ...mapped.explore_events,
        find_item: {
          ...mapped.explore_events.find_item,
          possible_items: pi.map((x) => ({
            ...x,
            item: itemById[x.item] || x.item,
          })),
        },
      };
    }

    return mapped;
  });

  const inserted = await Location.insertMany(payload);
  console.log(`✓ Locations seeded (${inserted.length})`);
  return inserted;
};

module.exports = seedLocations;
