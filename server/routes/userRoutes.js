const express = require("express");
const User = require("../models/userModel.js");

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
    const { username, password } = req.body;

    const newUser = {
      username,
      password,
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

    res.status(204).send(); // 204 No Content
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

router.get("/;userId/favorites", async (req, res) => {
  const { userID } = req.params;
  try {
    const userWithFavorites = await User.findById(userID).populate("Favorites");
    res.status(200).json(userWithFavorites.favorites);
  } catch (error) {
    res.status(500).send("server error");
  }
});

router.post("/;userId/favorites", async (req, res) => {
  const { userID } = req.params;
  const { icebreakerID } = req.body;
  try {
    await User.findByIdandUpdate(userID, {
      $addToSet: { favorites: icebreakerID },
    });
    res.status(200).send("Added Icebreaker to favorites");
  } catch (error) {
    res.status(500).send("server error");
  }
});

module.exports = router;
