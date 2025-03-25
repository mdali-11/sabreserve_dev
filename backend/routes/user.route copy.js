const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { userModel } = require("../models/user.model");

require("dotenv").config();

const userRouter = express.Router();

// const transporter = nodemailer.createTransport({
//   service: "smtp-relay.brevo.com", // Replace with your email service
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
async function sendVerificationEmail(email, token) {
  const mailOptions = {
    from: "Sab reservve <sabreserve@gmail.com>",
    to: email,
    subject: "Verify Your Email",
    text: `Click here to verify your email: /user/verify/${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");
  } catch (err) {
    console.error("Error sending verification email:", err);
  }
}

userRouter.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    gender,
    countryCode,
    country,
  } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        status: "400",
        msg: "Email already exists",
      });
    }

    bcrypt.hash(password, 10, async (err, secure_pass) => {
      if (err) {
        console.log(err);
        return res.status(200).send({
          status: "400",
          msg: "Error occured during password hashing",
        });
      }

      const newUser = new userModel({
        name,
        email,
        password: secure_pass,
        phone,
        gender,
        countryCode,
        country,
        address,
        isVerified: true, // Add isVerified flag
      });

      await newUser.save();

      // const verificationToken = jwt.sign({ email }, process.env.secret, { expiresIn: "48h" });
      // await sendVerificationEmail(email, verificationToken);
  
      res.send({
        status: "200",
        messsage: "User Registered Successfully. Please Login",
      });
    });

    // const secure_pass = await bcrypt.hash(password, 10);
 


    // const verificationToken = jwt.sign({ email }, process.env.secret, { expiresIn: "48h" });
    // await sendVerificationEmail(email, verificationToken);

  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).send("Error occurred during registration");
  }
});

userRouter.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.secret);
    const email = decoded.email;

    const user = await userModel.findOne({ email });

    if (user && !user.isVerified) {
      user.isVerified = true;
      await user.save();
      res.send("Email verified successfully!");
    } else {
      res.status(400).send("Invalid or expired verification token");
    }
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(500).send("Error occurred during verification");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(200).send({status:"400", msg: "Please Sign Up !" });
      return;
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      // const token = jwt.sign({ userId: user._id }, process.env.secret, {
      //   expiresIn: "24hr",
      // });
       const token = jwt.sign({ userId: user._id }, process.env.secret);
      const loggedInUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      };
      res.send({ status:"200", msg: "Login Successful", token, user: loggedInUser });
    } else {
      res.status(401).send("Incorrect credentials");
    }
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Error occurred during login");
  }
});

// module.exports = { userRouter };
