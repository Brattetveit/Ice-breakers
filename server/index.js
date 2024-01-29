const express = require("express");
const colors = require("colors");

const app = express();
const port = process.env.PORT || 3500;

require("dotenv").config();

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.underline.cyan)
);

app.get("", (req, res) => {
  res.send({ message: "Hello from server!" });
});
