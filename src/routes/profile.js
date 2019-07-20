const express = require("express");

const auth = require("../middleware/auth");
const Profile = require("../models/profile");
const User = require("../models/user");
const Post = require("../models/post");

const router = express.Router();

// GET MY PROFILE
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ owner: req.user._id }).populate(
      "owner",
      ["firstName", "avatar"]
    );
    if (!profile) {
      return res.status(404).send({ error: "This profile does not exist." });
    }
    const posts = await Post.find({ owner: req.user._id }).sort({
      createdAt: -1
    });
    res.send({ profile, posts });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//  GET PROFILE BY USER ID
router.get("/user/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("owner", [
      "firstName",
      "avatar"
    ]);
    if (!profile) {
      return res.status(404).send({ error: "Profile not found." });
    }
    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET ALL PROFILES
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate("owner", [
      "firstName",
      "lastName",
      "avatar"
    ]);
    res.send(profiles);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE NEW PROFILE
router.post("/new", auth, async (req, res) => {
  let profile = await Profile.findOne({ owner: req.user._id });
  if (profile) {
    return res
      .status(400)
      .send({ error: "Sorry, you can only have one Profile." });
  }
  try {
    const newProfile = new Profile({
      ...req.body,
      owner: req.user._id
    });
    await newProfile.save();
    res.status(201).send(newProfile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE PROFILE
router.patch("/me", auth, async (req, res) => {
  const allowedUpdates = [
    "age",
    "country",
    "bio",
    "status",
    "languageN",
    "languageL",
    "work",
    "interests"
  ];
  const updates = Object.keys(req.body);
  const isMatch = updates.every(update => allowedUpdates.includes(update));
  if (!isMatch) {
    return res.status(400).send({ error: "Update invalid." });
  }
  try {
    const profile = await Profile.findOne({ owner: req.user._id });
    if (!profile) {
      return res.status(404).send({ error: "Profile not found." });
    }
    updates.forEach(update => (profile[update] = req.body[update]));
    await profile.save();
    res.send(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
