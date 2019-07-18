const express = require("express");

const auth = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // await user
    //   .populate({
    //     path: "posts",
    //     options: { sort: { createdAt: -1 } }
    //   })
    //   .execPopulate();
    res.send(user);
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
  const allowedUpdates = ["firstName", "lastName", "email", "password"];
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
