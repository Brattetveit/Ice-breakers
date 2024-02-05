const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

router.post("/", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ error: err.message }));
});

module.exports = router;
