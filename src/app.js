const express = require("express");

const app = express();
const connectDB = require("../db");

const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

// connect to MongoDB
connectDB();

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// different Routes
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/profiles", profileRouter);

module.exports = app;
