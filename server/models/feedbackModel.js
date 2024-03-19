const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = Schema({
  comment: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  timesReported: { type: Number, default: 0},
  icebreaker: { type: Schema.Types.ObjectId, ref: "Icebreaker" }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
