const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ["healing", "pokeball", "status_heal", "pp_restore", "key"],
    required: true,
  },
  effect: {
    type: String,
    value: mongoose.Schema.Types.Mixed,
    conditions: [String],
  },
  buy_price: {
    type: Number,
    default: 0,
  },
  sell_price: {
    type: Number,
    default: 0,
  },
  can_sell: {
    type: Boolean,
    default: true,
  },
  usable_in_battle: {
    type: Boolean,
    default: true,
  },
  usable_outside_battle: {
    type: Boolean,
    default: true,
  },
  max_stack: {
    type: Number,
    default: 99,
  },
});

module.exports = mongoose.model("Item", itemSchema);
