const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  location_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    x: Number,
    y: Number,
  },
  type: {
    type: String,
    enum: ["town", "route", "cave", "wild"],
    required: true,
  },
  encounter_rate: {
    type: Number,
    default: 0,
    min: 0,
    max: 1,
  },
  wild_creatures: [
    {
      species: String,
      weight: Number,
      min_level: Number,
      max_level: Number,
    },
  ],
  has_pokemon_center: {
    type: Boolean,
    default: false,
  },
  has_shop: {
    type: Boolean,
    default: false,
  },
  shop_inventory: [String],
  has_gym: {
    type: Boolean,
    default: false,
  },
  gym_leader: String,
  can_explore: {
    type: Boolean,
    default: false,
  },
  explore_events: {
    trainer_encounter: {
      chance: Number,
      possible_trainers: [String],
    },
    find_money: {
      chance: Number,
      min_amount: Number,
      max_amount: Number,
    },
    find_item: {
      chance: Number,
      possible_items: [
        {
          item: String,
          weight: Number,
        },
      ],
    },
    find_nothing: {
      chance: Number,
    },
  },
  travel_cost: {
    type: Number,
    default: 0,
  },
  description: String,
});

module.exports = mongoose.model("Location", locationSchema);
