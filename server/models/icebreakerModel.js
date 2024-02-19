const mongoose = require("mongoose");
const { Schema } = mongoose;

const icebreakerSchema = Schema({
  name: { type: String, required: true, unique: true },
  fullDescription: { type: String, required: true },
  shortDescription: { type: String, required: true},
  author: { type: Schema.Types.ObjectId, ref: "User" },
  category: String,
  feedback: [String],
  rating: Number,
  visableToOthers: Boolean,
  
});

const Icebreaker = mongoose.model("Icebreaker", icebreakerSchema);

module.exports = Icebreaker;
