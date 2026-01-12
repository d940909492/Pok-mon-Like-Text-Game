const Badge = require("../models/Badge");

const badges = [
  {
    badge_id: "flame_badge",
    name: "Flame Badge",
    type: "Fire",
    gym_location: "fire_town",
    gym_leader: "Blaze",
    order: 1,
    obedience_level: 20,
    description: "Proof of defeating Blaze",
  },
];

const seedBadges = async () => {
  await Badge.insertMany(badges);
  console.log("✓ Badges seeded");
};

module.exports = seedBadges;
