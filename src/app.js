const express = require("express");
const path = require("path");
const cors = require("cors");

const connectDB = require("../db");

const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const uploads = require("./routes/uploads");

const history = require("connect-history-api-fallback");

const app = express();

// connect to MongoDB
connectDB();

app.use(cors());
app.use(history());

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// different Routes
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/profiles", profileRouter);
app.use("/uploads", uploads);

// Serve Statics in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  );
}

module.exports = app;
