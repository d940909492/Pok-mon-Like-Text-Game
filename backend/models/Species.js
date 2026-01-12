const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema({
  species_name: {
    type: String,
    required: true,
    unique: true,
  },
  types: [
    {
      type: String,
      required: true,
    },
  ],
  base_stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    speed: Number,
    sp_attack: Number,
    sp_defense: Number,
  },
  stat_growth: {
    hp: Number,
    attack: Number,
    defense: Number,
    speed: Number,
    sp_attack: Number,
    sp_defense: Number,
  },
  base_xp_yield: {
    type: Number,
    default: 50,
  },
  catch_rate: {
    type: Number,
    default: 45,
    min: 0,
    max: 255,
  },
  move_learning: [
    {
      level: Number,
      move: String,
    },
  ],
  evolution_data: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  description: String,
});

module.exports = mongoose.model("Species", speciesSchema);
