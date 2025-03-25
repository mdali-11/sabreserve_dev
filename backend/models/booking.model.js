const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
     name:String,
     email:String,
     phone:String,
     address:String,
     message:String,
     category:String,
     serviceProvider:String,
     providerContact:String,
     providerWhatsapp:String,
     bookingTime:String,
     contacted:Boolean
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = { BookingModel };
