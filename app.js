const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("Helloooo");
});
app.listen(3000, () => {
  console.log("server up and running");
});
