const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Icebreaker" }],
  icebreakerQueue: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Icebreaker" },
  ],
  createdIcebreakers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Icebreaker" },
  ],
  //avatar: {type: String}
  role: { type: String, default: "user", enum: ["user", "admin"] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
