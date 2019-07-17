const express = require("express");

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

module.exports = router;
