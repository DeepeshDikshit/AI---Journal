import express from "express";
import Journal from "../models/journal.js";
import { generateJournalInsight } from "../ai/gemini.js";

const router = express.Router();

//create a new journal entry

router.post("/create", async (req, res) => {
  try {
    const { userId, title, content, mood } = req.body;
    
    if (!userId || !title || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    //generate ai summary
    let aiInsight;
    try {
      aiInsight = await generateJournalInsight(content);
    } catch (aiError) {
      console.error("AI Insight generation failed:", aiError);
      aiInsight = "AI could not process the entry at this time";
    }

    const newJournal = await Journal.create({
      user: userId,
      title,
      content,
      mood,
      aiInsight,
    });
    res.status(201).json(newJournal);
  } catch (error) {
    console.error("Journal creation error:", error);
    res.status(500).json({ message: "Error creating journal entry", error: error.message });
  }
});

//GET All journal by user

router.get("/:userId", async (req, res) => {
  try {
    const journal = await Journal.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(journal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error fetching journals" });
  }
});

//UPDATE THE JOURNAL

router.put("/:id", async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    const updatedJournal = await Journal.findByIdAndUpdate(
      req.params.id,
      { title, content, mood },
      { new: true }
    );
    res.status(200).json(updatedJournal);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error updating journal",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: "Journal delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error delete journal",
    });
  }
});

export default router;
