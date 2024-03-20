const mongoose = require("mongoose");
const { Schema } = mongoose;

const icebreakerSchema = Schema({
  name: { type: String, required: true, unique: true },
  fullDescription: { type: String, required: true },
  shortDescription: { type: String, required: true },
  shortDescription: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  category: String,
  feedback: [{ type: Schema.Types.ObjectId, ref: "Feedback"}],
  // ratings: [Number],
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating"}],
  visableToOthers: Boolean,
  imageName: String,
  timesReported: { type: Number, default: 0 },
  defaultTime: Number,
});

const Icebreaker = mongoose.model("Icebreaker", icebreakerSchema);

module.exports = Icebreaker;
