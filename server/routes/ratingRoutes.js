const express = require("express");
const Rating = require("../models/ratingModel.js")
const Icebreaker = require("../models/icebreakerModel.js");
const User = require("../models/userModel.js");

const router = express.Router();


router.get("/:name", async (req, res) => {
  try {
    const rating = await Rating.find({});

    return res.status(200).json({
      count: rating.length,
      data: rating,
    });
  } catch (error) {
    console.log("Dette ble feil");
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


router.post("/create", async (req, res) => {
  try {
    const { ratingValue, author } = req.body;

    const authorUser = await User.findOne({ username: author });

    if (!authorUser) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newRating = {
      ratingValue,
      author: authorUser,
    };

    const rating = await Rating.create(newRating);

    return res.status(201).send(rating);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:name", async (req, res) => {
  try {
    const { author } = req.params;
    const result = await Rating.deleteOne({ author: author });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
