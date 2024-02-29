const express = require("express");
const Feedback = require("../models/feedbackModel.js")
const Icebreaker = require("../models/icebreakerModel.js");

const router = express.Router();

/*
router.get("/:name", async (req, res) => {
  try {
    const feedback = await Feedback.find({});

    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
*/

router.post("/create", async (req, res) => {
  try {
    const { feedback, author, timesReported } = req.body;

    const authorUser = await User.findOne({ username: author });

    if (!authorUser) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newFeedback = {
      feedback,
      author: authorUser,
      timesreported,
    };

    const icebreaker = await Icebreaker.create(newIcebreaker);

    return res.status(201).send(icebreaker);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;