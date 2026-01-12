const express = require("express");
const router = express.Router();
const Trainer = require("../models/Trainer");
const Species = require("../models/Species");

// Get trainer data
router.get("/:trainer_id", async (req, res) => {
  try {
    const trainer = await Trainer.findOne({
      trainer_id: req.params.trainer_id,
    });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Pick starter
router.post("/:trainer_id/starter", async (req, res) => {
  try {
    const { species_name } = req.body;
    const trainer = await Trainer.findOne({
      trainer_id: req.params.trainer_id,
    });

    if (trainer.has_picked_starter) {
      return res.status(400).json({ message: "Starter already picked" });
    }

    const species = await Species.findOne({ species_name });
    if (!species) {
      return res.status(404).json({ message: "Species not found" });
    }

    // Create starter creature
    const starter = {
      id: 1,
      name: species_name,
      species: species_name,
      level: 5,
      current_xp: 0,
      xp_to_next_level: 500,
      current_hp: species.base_stats.hp + species.stat_growth.hp * 5,
      max_hp: species.base_stats.hp + species.stat_growth.hp * 5,
      stats: {
        attack: species.base_stats.attack + species.stat_growth.attack * 5,
        defense: species.base_stats.defense + species.stat_growth.defense * 5,
        speed: species.base_stats.speed + species.stat_growth.speed * 5,
        sp_attack:
          species.base_stats.sp_attack + species.stat_growth.sp_attack * 5,
        sp_defense:
          species.base_stats.sp_defense + species.stat_growth.sp_defense * 5,
      },
      moveset: species.move_learning
        .filter((m) => m.level <= 5)
        .slice(0, 4)
        .map((m) => ({ move: m.move, current_pp: 35, max_pp: 35 })),
      forgotten_moves: [],
      status_condition: { type: null, turns_active: 0 },
    };

    trainer.owned_creatures.push(starter);
    trainer.active_party.push(1);
    trainer.has_picked_starter = true;
    await trainer.save();

    res.json({ message: "Starter selected", starter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update trainer
router.put("/:trainer_id", async (req, res) => {
  try {
    const trainer = await Trainer.findOneAndUpdate(
      { trainer_id: req.params.trainer_id },
      req.body,
      { new: true }
    );
    res.json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
