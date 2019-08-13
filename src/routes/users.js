const express = require("express");

const auth = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(`User ${req.user.firstName} was successfully deleted.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch("/me", auth, async (req, res) => {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "email",
    "password",
    "avatar"
  ];
  const updates = Object.keys(req.body);
  const isMatch = updates.every(update => allowedUpdates.includes(update));
  if (!isMatch) {
    return res.status(400).send({ error: "Update Invalid." });
  }
  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
