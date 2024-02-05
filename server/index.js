const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const cors = require("cors");
const colors = require("colors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.status(234).json({ message: "Hello World" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected".underline.green);
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`.underline.cyan),
    );
  })
  .catch((error) => console.log(error));
