const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // For password hashing
const { userModel } = require("../models/user.model");

require("dotenv").config();

const userRouter = express.Router();

// Function to generate OTP (consider using a secure library for OTP generation)
function generateOTP(length = 6) {
  // Use a cryptographically secure random number generator
  const crypto = require('crypto');

  // Generate random characters
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  try {
    // Generate a cryptographically random array of bytes
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));  // Ensures enough bytes for the desired length

    // Convert bytes to hex strings and extract characters
    let otp = '';
    for (let i = 0; i < length; i++) {
      const index = randomBytes[Math.floor(i / 2)] % characters.length;
      otp += characters.charAt(index);
    }

    return otp;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw new Error('Failed to generate OTP'); // Re-throw as an error for proper handling
  }
}



// Route for sending OTP via WhatsApp
userRouter.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;

  

  try {
    // Validate phone number format (optional)

    const otp = generateOTP(); // Generate secure OTP
    const message = `Your OTP for login/signup is: ${otp}`;

    const whatsappLink = `https://wa.me/${phoneNumber}?text=Your%20OTP%20is:%20${message}`;

    // Send OTP via a secure messaging service (e.g., Twilio, Nexmo)

    res.status(200).send({ link: whatsappLink });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error sending OTP" });
  }
});

// Route for user registration
userRouter.post("/signup", async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Validate phone number format (optional)

  try {
    const existingUser = await userModel.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).send({ message: "Phone number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password securely

    const newUser = new userModel({
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).send({ message: "User Registered Successfully. Please Login" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating user" });
  }
});

// Route for user login
userRouter.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await userModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).send({ message: "Phone number not found. Please sign up first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ phoneNumber: user.phoneNumber }, process.env.JWT_SECRET);
    res.status(200).send({
      message: "Login Successful",
      token,
      user: {
        id: user._id, // Use Mongoose's generated ID
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error logging in" });
  }
});

// module.exports = { userRouter };