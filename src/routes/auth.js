const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  const emailDup = await User.findOne({ email: req.body.email });
  if (emailDup) {
    return res.status(400).send({ error: "This email is already registered." });
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ error: "Email or Password Incorrect." });
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).send({ error: "Email or Password Incorrect." });
  }
  try {
    const token = jwt.sign({ _id: user._id }, config.get("jwtSecret"), {
      expiresIn: "7 days"
    });

    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
