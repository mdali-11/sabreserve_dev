// const mongoose = require("mongoose");

// // Define the Service Schema
// const serviceSchema = mongoose.Schema({
//   serviceName: { type: String, required: true },
//   description: { type: mongoose.Schema.Types.Mixed, required: true },
//   category: { type: String, required: true },
//   imageUrl: { type: String },
//   // Add other relevant fields for each service type
//   serviceDetails: {
//     type: mongoose.Schema.Types.Mixed},
//   // Common fields for all services
//   providerName: { type: String, required: true },
//   providerContact: { type: String, required: true },
//   location: { type: String, required: true },
//   price: { type: Number, required: true },
//   availability: { type: Boolean, default: true },
//   providerId : {type:String, requireD:true}
// });

// // Create the Service Model
// const ServiceModel = mongoose.model("Service", serviceSchema);

// module.exports = { ServiceModel };


// serviceDetails: {
//   type: [{ type: mongoose.Schema.Types.Mixed }],
//   validate: {
//     // Add validation logic here if needed (e.g., check for specific key-value pairs or data types)
//   },
// },