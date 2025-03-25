const mongoose = require("mongoose");

// Service Schema
const serviceSchema = new mongoose.Schema({
  image: [String],
  title: String,
  description: String,
  category: String,
  serviceCategory:String,
  serviceType:String,
  serviceOffered:String,
  discount:String,
  price:String,
  availableOn:String,
  travelLocation:String,
  startingFrom:String,
  details: [String],
  serviceProvider: String,
  address: String,
  contactNumber: String,
  whatsappNumber: String,
  location: String,
  state: String,
  city: String,
  district: String,
  pincode: String,
  servingLocality:String,
  isAvailable: { type: Boolean, default: true }, // Indicates if the service is active
  combinedAddress: {
    type: String,
    default: function () {
      return `${this.address}, ${this.city}, ${this.district}, ${this.pincode}, ${this.state}, ${this.location} , ${this.servingLocality}`;
    },
  },
  allowedListing:Number,
  subscriptionType: { type: String, required: false },
  subscriptionStartDate: { type: Date, required: false },
  subscriptionEndDate: { type: Date, required: false },
  isActive: { type: Boolean, default: true },
  instagramLink: { type: String, default: null }, // Instagram profile link
  fbPageLink: { type: String, default: null }, // AngelList profile link
  websiteLink: { type: String, default: null },   // Website link
});

// Middleware to deactivate the service once the subscriptionEndDate has passed
serviceSchema.pre("save", function (next) {
  const now = new Date();
  if (this.subscriptionEndDate < now) {
    this.isActive = false; // Deactivate if the subscription has expired
  }
  next();
});

// Create the Service Model
const ServiceModel = mongoose.model("Service", serviceSchema);

module.exports = { ServiceModel };
