const mongoose = require("mongoose");

// Sponsored Content Schema
const sponsoredContentSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  link: String,
  displayOrder: Number,
  isActive: { type: Boolean, default: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

// Middleware to deactivate content if it has expired at the time of saving
sponsoredContentSchema.pre('save', function (next) {
  const now = new Date();
  if (this.endDate < now) {
    this.isActive = false; // Deactivate if expired
  }
  next();
});

// Middleware to deactivate content when fetching if it has expired
sponsoredContentSchema.post('find', function (docs) {
  const now = new Date();
  docs.forEach(doc => {
    if (doc.endDate < now && doc.isActive) {
      doc.isActive = false;
      doc.save(); // Save the updated state
    }
  });
});

// Sponsored Content Model
const SponsoredContentModel = mongoose.model("SponsoredContent", sponsoredContentSchema);

module.exports = { SponsoredContentModel };
