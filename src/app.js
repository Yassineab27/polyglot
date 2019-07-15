const express = require("express");

const app = express();
const postRouter = require("./routes/posts");
const connectDB = require("../db");

// connect to MongoDB
connectDB();

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRouter);

module.exports = app;
