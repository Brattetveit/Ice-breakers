const express = require("express");
const Feedback = require("../models/feedbackModel.js")
const Icebreaker = require("../models/icebreakerModel.js");
const User = require("../models/userModel.js");

const router = express.Router();

router.get("/getByName/:name", async (req, res) => {
  try {

    const { name } = req.params;

    const icebreaker = await Icebreaker.findOne({ name });

    const feedback = await Feedback.find({ icebreaker: icebreaker });

    return res.status(200).json({
      count: feedback.length,
      data: feedback,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


router.post("/create", async (req, res) => {
  try {
    const { feedback, author, name } = req.body;

    const authorUser = await User.findOne({ username: author });

    const icebreaker = await Icebreaker.findOne({ name });

    if (!authorUser) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newFeedback = {
      comment: feedback,
      author: authorUser,
      icebreaker: icebreaker
    };

    const addedFeedback = await Feedback.create(newFeedback);

    return res.status(201).send(addedFeedback);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id/report", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).send("Feedback not found");
    }
    feedback.timesReported += 1;
    await feedback.save();
    res.send("Feedback reported");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

function isAdmin(req, res, next) {
  const userRole = req.headers["x-user-role"];
  if (userRole === "admin") {
    next();
  } else {
    console.log(
      "Access denied. User role:",
      req.user ? req.user.role : "No user"
    );
    res.status(403).send("Access denied");
  }
}

router.get("/reported", isAdmin, async (req, res) => {
  try {
    const reportedFeedback = await Feedback.find({
      timesReported: { $gt: 0 },
    });
    res.json(reportedFeedback);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.put("/:id/clear-reports", isAdmin, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).send("Feedback not found");
    }
    feedback.timesReported = 0;
    await feedback.save();
    res.send("Reports cleared from feedback");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.send("Feedback deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;