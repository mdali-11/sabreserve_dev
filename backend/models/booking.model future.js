// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   // serviceId: {
//   //   type: mongoose.Schema.Types.ObjectId,
//   //   ref: "service", // Assuming your service model is named "ServiceModel"
//   //   required: true,
//   // },
//   serviceProviderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "admin", // Assuming your user model for service providers is named "UserModel"
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user", // Assuming your user model for customers is named "UserModel"
//     required: true,
//   },
//   serviceCategory: {
//     type: String,
//   },
//   serviceDetails: {
//     type: mongoose.Schema.Types.Mixed,
//   },
//   userDetails: {
//     // Include all desired user-related properties here:
//     name: { type: String },
//     email: { type: String, required: true },
//     phone: { type: String },
//     message : {type :String},
//     address: { type: String },
//     // ... other user details
//   },
//   location:{type:String},
//   bookingStatus: {
//     type: String,
//     enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
//     default: "pending",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const BookingModel = mongoose.model("booking", bookingSchema);

// module.exports = { BookingModel };
