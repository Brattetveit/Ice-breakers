const express = require("express");
const Rating = require("../models/ratingModel.js")
const Icebreaker = require("../models/icebreakerModel.js");
const User = require("../models/userModel.js");

const router = express.Router();


router.get("/:name", async (req, res) => {
  try {

    const { name } = req.params;

    const icebreaker = await Icebreaker.findOne({ name });

    const rating = await Rating.find({icebreaker: icebreaker});

    return res.status(200).json({
      count: rating.length,
      data: rating,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// router.post("/:name/:username", async (req, res) => {
  router.post("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    
    const { rating, author } = req.body;

    
    const authorUser = await User.findOne({ username: author});
    
    
    if (!authorUser) {
        return res.status(404).json({ message: "Author not found" });
      }
    
    let icebreaker = await Icebreaker.findOne({ name });
    
    // const addedRating = await Rating.findOne({ rating: rating, author: authorUser })
    const newRating = {
        rating,
        author: authorUser,
        icebreaker: icebreaker
      };
    
    const addedRating = await Rating.create(newRating);
    
    icebreaker = await Icebreaker.findOneAndUpdate(
      { name },
      // { $push: { ratings: req.body.rating } }
      { $push: { ratings: addedRating } }
      );
      
      if (!icebreaker) {
        return res.status(404).json({ message: "Icebreaker not found" });
      }
      
    icebreaker = await Icebreaker.findOne({ name }).populate("ratings");

    res.status(200).send(icebreaker);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:name/:username", async (req, res) => {
  try {
    const { name, username } = req.params;
    const author = await User.findOne({ username: username });

    let icebreaker = await Icebreaker.findOne({ name });

    const rating = await Rating.findOne({ author: author, icebreaker: icebreaker });

    if (!rating){
      return res.status(404).json({ message: "Rating not found" });
    }

    icebreaker = await Icebreaker.findOneAndUpdate(
      { name },
      { $pull: { ratings: rating._id } }
      );
    
    icebreaker = await Icebreaker.findOne({ name });

    const result = await Rating.deleteOne({ author: author, icebreaker: icebreaker });
    
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
