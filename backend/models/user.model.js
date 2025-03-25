// models/user.model.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true
  },
  otp: {
    type: String,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };
