require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const seedMoves = require("./seedMoves");
const seedSpecies = require("./seedSpecies");
const seedItems = require("./seedItems");
const seedLocations = require("./seedLocations");
const seedBadges = require("./seedBadges");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  await connectDB();

  try {
    // Clear existing data
    await Species.deleteMany({});
    await Move.deleteMany({});
    await Item.deleteMany({});
    await Location.deleteMany({});
    await Badge.deleteMany({});
    console.log("Cleared existing data");

    // Seed data
    await seedMoves();
    await seedSpecies();
    await seedItems();
    await seedLocations();
    await seedBadges();

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
