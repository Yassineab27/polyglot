const express = require("express");
const Post = require("../models/post");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE POST
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .send({ error: "You must provide a Title and Description." });
  }
  if (title.length > 100) {
    return res.status(400).send({ error: "Title too long." });
  }
  try {
    const newPost = new Post({
      ...req.body,
      owner: req.user._id
    });
    await newPost.save();
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// GET POSTS
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.user._id }).sort({
      createdAt: -1
    });
    if (!posts.length) {
      return res.status(404).send({ error: "no posts found." });
    }
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PATCH POST
router.patch("/:id", auth, async (req, res) => {
  const allowedUpdates = ["title", "description"];
  const updates = Object.keys(req.body);
  const isAllowed = updates.every(update => allowedUpdates.includes(update));
  if (!isAllowed) {
    return res.status(400).send({ error: "Update Invalid." });
  }
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!post) {
      return res.status(404).send({ error: "Post not found." });
    }
    updates.forEach(update => (post[update] = req.body[update]));

    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE POST
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!post) {
      return res.status(404).send({ error: "Post not found." });
    }
    await post.remove();
    res.send({ message: "Post was successfully deleted." });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
