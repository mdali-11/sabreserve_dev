const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const { userModel } = require("../models/user.model");

const userRouter = express.Router();

// Rate Limiter - Allow max 3 requests per device in an hour
const phoneLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Max 3 requests per IP
  message: { message: "Too many requests from this device. Try again later." },
});

// Route to store user's phone number
userRouter.post("/save-phone", phoneLimit, async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send({ message: "Phone number is required" });
  }

  try {
    // Check if the phone number is already stored
    const existingUser = await userModel.findOne({ phoneNumber });

    if (existingUser) {
      return res.status(200).send({ message: "Phone number already saved" });
    }

    // Save the phone number as a new entry
    const newUser = new userModel({ phoneNumber });
    await newUser.save();

    res.status(201).send({ message: "Phone number saved successfully" });
  } catch (error) {
    console.error("Error saving phone number:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = { userRouter };
