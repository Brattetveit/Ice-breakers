const port = 3500;

const express = require("express");
const colors = require("colors");

const app = express();

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`.underline.cyan)
);

app.get("", (req, res) => {
  res.send({ message: "Hello from server!" });
});
