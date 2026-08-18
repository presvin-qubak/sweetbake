import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

/* ================= CREATE CONTACT MESSAGE ================= */

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      contact,
    });
  } catch (error) {
    console.error("Contact error:", error);

    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
});

/* ================= GET ALL CONTACT MESSAGES ================= */

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get messages.",
    });
  }
});

export default router;