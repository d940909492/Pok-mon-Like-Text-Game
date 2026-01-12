const mongoose = require("mongoose");

const moveSchema = new mongoose.Schema({
  move_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  power: {
    type: Number,
    default: 0,
  },
  accuracy: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
  },
  max_pp: {
    type: Number,
    required: true,
  },
  effect: {
    type: {
      type: String,
    },
    condition: String,
    chance: Number,
    value: mongoose.Schema.Types.Mixed,
  },
  description: String,
});

module.exports = mongoose.model("Move", moveSchema);
