const express = require("express");
const Icebreaker = require("../models/icebreakerModel.js");
const User = require("../models/userModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }
    const icebreakers = await Icebreaker.find(query);

    return res.status(200).json({
      count: icebreakers.length,
      data: icebreakers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  console.log("GET /userId");
  try {
    const icebreakers = await Icebreaker.find({ author: req.params.userId });

    return res.status(200).json({
      count: icebreakers.length,
      data: icebreakers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const result = await Icebreaker.deleteOne({ name: name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Icebreaker not found" });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      name,
      fullDescription,
      shortDescription,
      author,
      category,
      feedback,
      rating,
      visable,
      imageName,
    } = req.body;

    const authorUser = await User.findOne({ username: author });

    if (!authorUser) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newIcebreaker = {
      name,
      fullDescription,
      shortDescription,
      author: authorUser,
      category,
      feedback,
      rating,
      visable,
      imageName,
    };

    const icebreaker = await Icebreaker.create(newIcebreaker);

    return res.status(201).send(icebreaker);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
