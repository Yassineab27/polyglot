const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the social network");
});

module.exports = app;
