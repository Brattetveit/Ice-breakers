const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedbackSchema = Schema({
  feedback: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  timesReported: { type: Number, default: 0}
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
