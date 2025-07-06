import express from "express";
import Society from "../models/Society.js";

const router = express.Router();

// Get all societies
router.get("/", async (req, res) => {
  try {
    const societies = await Society.find();
    res.json(societies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch societies" });
  }
});

// Add new society
router.post("/", async (req, res) => {
  const { name, description, type, joinLink } = req.body;

  try {
    const newSociety = new Society({
      name,
      description,
      type,
      joinLink,
      members: [], // optional
    });

    await newSociety.save();
    res.status(201).json(newSociety);
  } catch (err) {
    res.status(500).json({ error: "Failed to create society" });
  }
});


// Join society
router.put("/:id/join", async (req, res) => {
  const { user } = req.body;
  try {
    const society = await Society.findById(req.params.id);
    if (!society) return res.status(404).json({ error: "Society not found" });

    if (!society.members.includes(user)) {
      society.members.push(user);
      await society.save();
    }

    res.json({ message: "Joined successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to join society" });
  }
});


// PUT /api/societies/:id
router.put("/:id", async (req, res) => {
  try {
    console.log("➡️ Incoming PUT for:", req.params.id);

    const updatedSociety = await Society.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSociety) {
  console.log("❌ Society not found for ID:", req.params.id);
}

    res.json(updatedSociety);
  } catch (err) {
    res.status(500).json({ error: "Failed to update society" });
  }
});


// DELETE /api/societies/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Society.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Society not found" });
    res.json({ message: "Society deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete society" });
  }
});

export default router;
