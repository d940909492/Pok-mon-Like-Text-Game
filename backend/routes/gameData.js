const express = require("express");
const router = express.Router();
const Species = require("../models/Species");
const Move = require("../models/Move");
const Item = require("../models/Item");
const Location = require("../models/Location");
const Badge = require("../models/Badge");

// Get all species
router.get("/species", async (req, res) => {
  try {
    const species = await Species.find();
    res.json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all moves
router.get("/moves", async (req, res) => {
  try {
    const moves = await Move.find();
    res.json(moves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all locations
router.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all badges
router.get("/badges", async (req, res) => {
  try {
    const badges = await Badge.find();
    res.json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
