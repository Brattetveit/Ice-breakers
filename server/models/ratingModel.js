const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingSchema = Schema({
  rating: Number,
  author: { type: Schema.Types.ObjectId, ref: "User" }
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
