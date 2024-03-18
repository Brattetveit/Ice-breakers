const mongoose = require("mongoose");
const User = require("./userModel");
const { Schema } = mongoose;

const ratingSchema = Schema({
  // rating: Number,
  rating: { type: Number, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  icebreaker: { type: Schema.Types.ObjectId, ref: "Icebreaker" }
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
