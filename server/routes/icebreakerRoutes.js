const express = require("express");
const Icebreaker = require("../models/icebreakerModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const icebreakers = await Icebreaker.find({});

    return res.status(200).json({
      count: icebreakers.length,
      data: icebreakers
    })
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

router.post("/", async (req, res) => {
  try {
    const newIcebreaker = {
      name: req.body.name,
      description: req.body.description,
      author: req.body.author ?? "",
      category: req.body.category ?? "",
      feedback: req.body[feedback] ?? [],
      rating: req.body.rating ?? ""
    };

    const icebreaker = await Icebreaker.create(newIcebreaker);

    return res.status(201).send(icebreaker);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

module.exports = router;