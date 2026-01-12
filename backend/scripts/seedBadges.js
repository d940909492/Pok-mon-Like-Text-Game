const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const Badge = require(path.resolve(__dirname, "../models/Badge"));

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

async function seedBadges() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI missing");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  let upserted = 0;

  for (const badge of badges) {
    await Badge.updateOne(
      { badge_id: badge.badge_id },
      { $set: badge },
      { upsert: true }
    );
    upserted++;
  }

  console.log(`✓ Badges seeded (upserted): ${upserted}`);

  await mongoose.connection.close();
}

if (require.main === module) {
  seedBadges().catch(async (err) => {
    console.error("Seed badges error:", err);
    try {
      await mongoose.connection.close();
    } catch {}
    process.exitCode = 1;
  });
}

module.exports = seedBadges;
