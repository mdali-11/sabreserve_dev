
// const mongoose =require("mongoose")

// const adminSchema = mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
//     password: { type: String, required: true },
//     phone: { type: String, required: true, /* add validation */ },
//     countryCode: { type: String, required: true, /* add validation */ },
//     country: { type: String },
//     companyName: { type: String, required: true },
//     companyAddress: { type: String, required: true },
//     serviceCategory: { type: String, required: true /* add validation */ }
// });

// const AdminModel =mongoose.model('admin',adminSchema)

// module.exports ={AdminModel};

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required:true
  },
  email: {
    type: String,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    required:true
  },
  password: {
    type: String,
    required:true
    // Enforce password complexity here (using a library like bcrypt)
  },
  phone: {
    type: String,
    required:true
    // validate: {
    //   validator: (phone) => /^[+]?[0-9\s\-()]{7,25}$/.test(phone),
    //   message: "Invalid phone number format. Please use +1234567890 or (123) 456-7890 format."
    // },
    // trim: true
  },
  whatsappNo: {type:String , required:true},
  countryCode: {
    type: String,
    // match: /^\+[1-9]\d{1,14}$/, // Validate country code format
    // trim: true
  },
  country: {
    type: String,
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  companyAddress: {
    type: String,
    trim: true
  },
  serviceCategories: {
    type: [String],
    required:true
  },
  allowedListing:{type:Number, default : 1},
  roles: {
    type: [String],
    enum: ["superadmin", "admin", "editor"] ,// Or any other allowed roles
    required:true
  }
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = { AdminModel };
