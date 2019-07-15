const express = require("express");

const app = express();
const postRouter = require("./routes/posts");

app.use("/posts", postRouter);

module.exports = app;
