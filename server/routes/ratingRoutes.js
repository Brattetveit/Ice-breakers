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
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


router.post("/:name/:username", async (req, res) => {
  try {
    const { name, username } = req.params;
    
    const { ratingValue } = req.body;

    const authorUser = await User.findOne({ username: username });

    if (!authorUser) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newRating = {
      ratingValue,
      author: authorUser,
    };

    const rating = await Rating.create(newRating);
    
    let icebreaker = await Icebreaker.findOneAndUpdate(
      { name },
      { $push: { ratings: req.body.rating } }
    );
    
    if (!icebreaker) {
      return res.status(404).json({ message: "Icebreaker not found" });
    }

    icebreaker = await Icebreaker.findOne({ name });
    
    res.status(200).send(icebreaker);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:name/:username", async (req, res) => {
  try {
    const { name, username } = req.params;
    author = await User.findOne({ username: username });
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
