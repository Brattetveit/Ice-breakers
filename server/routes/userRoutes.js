const express = require("express");
const User = require("../models/userModel.js");
const Icebreaker = require("../models/icebreakerModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const newUser = {
      username,
      password,
      role,
    };

    const user = await User.create(newUser);

    return res.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "login successful",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error has occured",
      error: error.message,
    });
  }
});

router.get("/:userId/favorites", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user || !user.favorites.length) {
      return res.status(404).send("User not found or no favorites");
    }

    const favorites = await Icebreaker.aggregate([
      { $match: { _id: { $in: user.favorites } } },
    ]);

    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/:userId/favorites", async (req, res) => {
  const { userId } = req.params;
  const { icebreakerId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: icebreakerId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Added Icebreaker to favorites");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
