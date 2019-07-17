const express = require("express");

const app = express();
const connectDB = require("../db");

const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");

// connect to MongoDB
connectDB();

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRouter);
app.use("/users", userRouter);

module.exports = app;
