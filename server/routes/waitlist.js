import express from "express";
import Waitlist from "../models/Waitlist.js";
import { sendWaitlistNotification } from "../utils/sendEmail.js";

const router = express.Router();

// POST /api/waitlist — add an email to the waitlist (both signup forms call this)
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }

    // Avoid throwing a hard 500 if someone signs up twice.
    const existing = await Waitlist.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json(existing);
    }

    const entry = await Waitlist.create({ email });

    // Fire-and-forget — don't make the visitor wait on the email to send.
    sendWaitlistNotification(entry);

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/waitlist — list everyone who signed up (admin/debug use)
router.get("/", async (req, res) => {
  try {
    const entries = await Waitlist.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
