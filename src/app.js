const express = require("express");
const cors = require("cors");

const connectDB = require("../db");

const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

const app = express();

// connect to MongoDB
connectDB();

app.use(cors());

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// different Routes
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/profiles", profileRouter);

module.exports = app;
