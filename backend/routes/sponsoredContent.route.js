const express = require("express");
const { SponsoredContentModel } = require("../models/sponsoredContent.model");
const sponsoredContentRouter = express.Router();

// 1. POST route - Add new sponsored content
sponsoredContentRouter.post('/add', async (req, res) => {
  const payload = req.body;

  try {
    const sponsoredContent = new SponsoredContentModel(payload);
    await sponsoredContent.save();
    res.status(201).send(sponsoredContent);
  } catch (error) {
    res.status(400).send({ message: "Error adding sponsored content", error });
  }
});

// 2. GET route - Get all active sponsored content
sponsoredContentRouter.get('/active', async (req, res) => {
  const now = new Date();

  try {
    // Fetch only active content that hasn't expired
    const activeContent = await SponsoredContentModel.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now }
    });

    res.status(200).send(activeContent);
  } catch (error) {
    res.status(500).send({ message: "Error fetching active sponsored content", error });
  }
});

// 3. GET route - Get all sponsored content (both active and inactive)
sponsoredContentRouter.get('/all', async (req, res) => {
  try {
    const allContent = await SponsoredContentModel.find({});
    res.status(200).send(allContent);
  } catch (error) {
    res.status(500).send({ message: "Error fetching all sponsored content", error });
  }
});

// 4. PUT route - Update a sponsored content by ID
sponsoredContentRouter.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedContent = await SponsoredContentModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedContent) {
      return res.status(404).send({ message: "Sponsored content not found" });
    }
    res.status(200).send(updatedContent);
  } catch (error) {
    res.status(400).send({ message: "Error updating sponsored content", error });
  }
});

// 5. DELETE route - Delete sponsored content by ID
sponsoredContentRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContent = await SponsoredContentModel.findByIdAndDelete(id);
    if (!deletedContent) {
      return res.status(404).send({ message: "Sponsored content not found" });
    }
    res.status(200).send({ message: "Sponsored content deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting sponsored content", error });
  }
});

// 6. GET route - Auto-delete expired sponsored content (optional - triggered manually or scheduled)
sponsoredContentRouter.delete('/delete-expired', async (req, res) => {
  const now = new Date();

  try {
    const result = await SponsoredContentModel.deleteMany({ endDate: { $lt: now } });
    res.status(200).send({ message: `${result.deletedCount} expired sponsored content deleted` });
  } catch (error) {
    res.status(500).send({ message: "Error deleting expired sponsored content", error });
  }
});

module.exports = { sponsoredContentRouter };
