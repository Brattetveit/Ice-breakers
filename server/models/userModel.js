const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Icebreakers" }],
  icebreakerQueue: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Icebreakers" },
  ],
  createdIcebreakers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Icebreakers" },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
