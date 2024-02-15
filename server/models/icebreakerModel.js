const mongoose = require("mongoose");
const { Schema } = mongoose;

const icebreakerSchema = Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  category: String,
  feedback: [String],
  rating: Number,
});

const Icebreaker = mongoose.model("Icebreaker", icebreakerSchema);

module.exports = Icebreaker;
