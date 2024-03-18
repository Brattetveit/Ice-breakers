const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const icebreakerRoutes = require("./routes/icebreakerRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const cors = require("cors");
const colors = require("colors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(234).json({ message: "Welcome to the Ice Breakers API!" });
});

app.use("/api/users", userRoutes);
app.use("/api/icebreakers", icebreakerRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/feedback", feedbackRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected".underline.green);
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`.underline.cyan)
    );
  })
  .catch((error) => console.log(error));
