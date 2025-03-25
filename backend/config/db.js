const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.mongooseUrl);

// let sa="mongodb+srv://sabreserve:<password>@cluster0.51gt6.mongodb.net/"

module.exports = {connection};
