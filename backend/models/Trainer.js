const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 5,
  },
  current_xp: {
    type: Number,
    default: 0,
  },
  xp_to_next_level: {
    type: Number,
    default: 100,
  },
  current_hp: {
    type: Number,
    required: true,
  },
  max_hp: {
    type: Number,
    required: true,
  },
  stats: {
    attack: Number,
    defense: Number,
    speed: Number,
    sp_attack: Number,
    sp_defense: Number,
  },
  moveset: [
    {
      move: String,
      current_pp: Number,
      max_pp: Number,
    },
  ],
  forgotten_moves: [String],
  status_condition: {
    type: {
      type: String,
      enum: ["burn", "poison", "paralyze", "sleep", "freeze", null],
      default: null,
    },
    turns_active: {
      type: Number,
      default: 0,
    },
  },
});

const trainerSchema = new mongoose.Schema({
  trainer_id: {
    type: String,
    required: true,
    unique: true,
  },
  trainer_name: {
    type: String,
    required: true,
  },
  pass_key: {
    type: String,
    required: true,
  },
  money: {
    type: Number,
    default: 100,
  },
  badges: [
    {
      type: String,
    },
  ],
  badge_count: {
    type: Number,
    default: 0,
  },
  current_location: {
    x: {
      type: Number,
      default: 1,
    },
    y: {
      type: Number,
      default: 1,
    },
  },
  owned_creatures: [creatureSchema],
  active_party: [
    {
      type: Number,
    },
  ],
  inventory: [
    {
      item: String,
      quantity: Number,
    },
  ],
  discovered_towns: [
    {
      type: String,
    },
  ],
  total_battles: {
    type: Number,
    default: 0,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  win_rate: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 0,
  },
  has_picked_starter: {
    type: Boolean,
    default: false,
  },
  created_timestamp: {
    type: Date,
    default: Date.now,
  },
  last_played_timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trainer", trainerSchema);
