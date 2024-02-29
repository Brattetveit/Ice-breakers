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
    const { username, password, isAdmin } = req.body;

    const newUser = {
      username,
      password,
      isAdmin
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

router.post("/admin", async (req, res) => {
  try {
    let query = {};
    if (req.query.isAdmin) {
      query.isAdmin = { $regex: req.query.isAdmin, $options: "i" };
    }
    const admins = await User.find(query);
    
    const { username, password, isAdmin } = req.body;
    const admin = await admins.findOne({ username, password, isAdmin });

    if (!admin) {
      res.status(401).json({
        message: "No admin authorization",
        error: "Admin not found",
      });
    } else {
      res.status(200).json({
        message: "Admin access successful",
        admin,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error has occured",
      error: error.message,
    });
  }
})

module.exports = router;
