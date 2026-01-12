const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  badge_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: String,
  gym_location: String,
  gym_leader: String,
  order: {
    type: Number,
    min: 1,
    max: 8,
  },
  obedience_level: {
    type: Number,
    default: 10,
  },
  description: String,
});

module.exports = mongoose.model("Badge", badgeSchema);
