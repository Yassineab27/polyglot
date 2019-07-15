const express = require("express");
const Post = require("../models/post");

const router = express.Router();

// CREATE POST
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .send({ error: "You must provide a title and description." });
  }
  if (title.length > 100) {
    return res.status(400).send({ error: "Title too long." });
  }
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// GET POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    if (!posts.length) {
      return res.status(404).send({ error: "no posts found." });
    }
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PATCH POST
router.patch("/:id", async (req, res) => {
  res.send("UPDATE POST");
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  res.send("DELETE POST");
});

module.exports = router;
