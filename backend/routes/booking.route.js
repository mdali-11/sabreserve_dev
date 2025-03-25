// bookingRoutes.js
const express = require("express");
const bookingRouter = express.Router();
const { BookingModel } = require("../models/booking.model");
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // limit each IP to 50 requests per windowMs
  message: 'You have exceeded the 50 requests in 1 hour limit!', 
  headers: true,
});
const dotenv = require('dotenv');
dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
//   console.log(authHeader)
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log(token)
//   if (token == null) return res.sendStatus(401);
if(authHeader === process.env.JWT_SECRET){
    next()
}else{
    return res.sendStatus(403)
}

//   jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
}

bookingRouter.post('/add',limiter, async (req, res) => {
  try {
  const booking = new BookingModel(req.body);
      await booking.save();
      res.status(201).send(req.body);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Read all bookings
bookingRouter.get('/all',authenticateToken, async (req, res) => {
  try {
      const bookings = await BookingModel.find({});
      res.status(200).send(bookings);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Read a single booking by ID
bookingRouter.get('/:id', authenticateToken, async (req, res) => {
  try {
      const booking = await BookingModel.findById(req.params.id);
      if (!booking) {
          return res.status(404).send();
      }
      res.status(200).send(booking);
  } catch (error) {
      res.status(500).send(error);
  }
});

// Route to get booking by provider contact number
bookingRouter.get('/provider/:contactNumber',authenticateToken, async (req, res) => {
    try {
        const contactNumber = req.params.contactNumber;
        const booking = await BookingModel.find({ providerContact: contactNumber });
  
        if (!booking) {
            return res.status(404).send();
        }
  
        res.status(200).send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
  });

// Update a booking by ID
bookingRouter.put('/:id',authenticateToken, async (req, res) => {
  try {
      const booking = await BookingModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!booking) {
          return res.status(404).send();
      }
      res.status(200).send(booking);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Delete a booking by ID
bookingRouter.delete('/:id',authenticateToken, async (req, res) => {
  try {
      const booking = await BookingModel.findByIdAndDelete(req.params.id);
      if (!booking) {
          return res.status(404).send();
      }
      res.status(200).send(booking);
  } catch (error) {
      res.status(500).send(error);
  }
});

  
  module.exports = {bookingRouter};