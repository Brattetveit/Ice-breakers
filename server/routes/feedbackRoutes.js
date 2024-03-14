const express = require("express");
const Feedback = require("../models/feedbackModel.js")
const Icebreaker = require("../models/icebreakerModel.js");
const User = require("../models/userModel.js");

const router = express.Router();


router.get("/:name", async (req, res) => {
  try {
    const feedback = await Feedback.find({});

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
    const { comment, author, timesReported } = req.body;

    const authorUser = await User.findOne({ username: author });

    if (!authorUser) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newFeedback = {
      comment,
      author: authorUser,
      timesReported,
    };

    const feedback = await Feedback.create(newFeedback);

    return res.status(201).send(feedback);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:name", async (req, res) => {
  try {
    const { author } = req.params;
    const result = await Feedback.deleteOne({ author: author });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;