const mongoose = require("mongoose");

const icebreakerSchema = mongoose.Schema({
  name : { type: String, required: true, unique: true},
  description: {type: String, required: true},
  author: String,
  category: String,
  feedback: [String],
  rating: Number
});

const Icebreaker = mongoose.model("Icebreaker", icebreakerSchema);

module.exports = Icebreaker;