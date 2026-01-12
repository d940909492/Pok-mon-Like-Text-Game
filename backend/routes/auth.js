const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Trainer = require("../models/Trainer");

// Register new trainer
router.post("/register", async (req, res) => {
  try {
    const { trainer_id, trainer_name, pass_key } = req.body;

    // Check if trainer exists
    const existingTrainer = await Trainer.findOne({ trainer_id });
    if (existingTrainer) {
      return res.status(400).json({ message: "Trainer ID already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(pass_key, 10);

    // Create new trainer (no starter yet)
    const newTrainer = new Trainer({
      trainer_id,
      trainer_name,
      pass_key: hashedPassword,
      money: 100,
      inventory: [{ item: "pokeball", quantity: 3 }],
      discovered_towns: ["starter_town"],
    });

    await newTrainer.save();
    res.status(201).json({ message: "Trainer created", trainer_id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { trainer_id, pass_key } = req.body;

    const trainer = await Trainer.findOne({ trainer_id });
    if (!trainer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(pass_key, trainer.pass_key);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Update last played
    trainer.last_played_timestamp = Date.now();
    await trainer.save();

    res.json({
      message: "Login successful",
      trainer: {
        trainer_id: trainer.trainer_id,
        trainer_name: trainer.trainer_name,
        has_picked_starter: trainer.has_picked_starter,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
