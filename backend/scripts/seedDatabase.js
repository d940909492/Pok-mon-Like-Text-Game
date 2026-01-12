const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(__dirname, ".env"),
  path.resolve(__dirname, "../.env"),
  path.resolve(__dirname, "../../.env"),
];
const envPath = envCandidates.find((p) => fs.existsSync(p));
require("dotenv").config(envPath ? { path: envPath } : undefined);

const Species = require("../models/Species");
const Move = require("../models/Move");
const Item = require("../models/Item");
const Location = require("../models/Location");
const Badge = require("../models/Badge");

const seedMoves = require("./seedMoves");
const seedSpecies = require("./seedSpecies");
const seedItems = require("./seedItems");
const seedLocations = require("./seedLocations");
const seedBadges = require("./seedBadges");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing. Check your .env file.");
  }
  console.log("MONGODB_URI =", uri);
  await mongoose.connect(uri);
  console.log("MongoDB Connected");
}

async function seedDatabase() {
  try {
    await connectDB();

    await Promise.all([
      Species.deleteMany({}),
      Move.deleteMany({}),
      Item.deleteMany({}),
      Location.deleteMany({}),
      Badge.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    const insertedMoves = await seedMoves();
    const moveById = Object.fromEntries(
      insertedMoves.map((m) => [m.move_id, m._id])
    );

    const insertedItems = await seedItems();
    const itemById = Object.fromEntries(
      insertedItems.map((i) => [i.item_id, i._id])
    );

    const insertedLocations = await seedLocations({ itemById });
    const locationById = Object.fromEntries(
      insertedLocations.map((l) => [l.location_id, l._id])
    );

    await seedSpecies({ moveById });
    await seedBadges({ locationById });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seed error:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close().catch(() => {});
  }
}

seedDatabase();
