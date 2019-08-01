const express = require("express");
const Post = require("../models/post");
const Profile = require("../models/profile");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE POST
router.post("/", auth, async (req, res) => {
  const profile = await Profile.findOne({ owner: req.user._id });
  if (!profile) {
    return res
      .status(400)
      .send({ error: "You need to create a profile first." });
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

// GET All POSTS
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("owner", ["firstName", "lastName", "avatar"])
      .sort({
        createdAt: -1
      });
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET SINGLE POST BY ID
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("owner", [
      "firstName",
      "lastName",
      "avatar"
    ]);
    if (!post) {
      return res.status(404).send({ error: "Post not found." });
    }
    res.send(post);
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
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ error: "Post not found." });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .send({ error: "You can only update your won posts." });
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
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ error: "Post not found." });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .send({ error: "You can only delete your own posts." });
    }
    await post.remove();
    res.send({ message: "Post was successfully deleted." });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// LIKE POST
router.patch("/like/:id", auth, async (req, res) => {
  const profile = await Profile.findOne({ owner: req.user._id });
  if (!profile) {
    return res
      .status(400)
      .send({ error: "You need to create a profile first." });
  }
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found.");
    }

    if (
      post.likes.filter(
        like => like.owner.toString() === req.user._id.toString()
      ).length > 0
    ) {
      return res.status(400).send({ error: "You can like only once." });
    }

    post.likes.push({ owner: req.user._id });
    await post.save();

    res.send({ message: "Post Liked!", post });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DISLIKE POST
router.patch("/dislike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({ error: "Post not found." });
    }

    const likes = post.likes.filter(
      like => like.owner.toString() !== req.user._id.toString()
    );
    post.likes = likes;
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE COMMENT
router.post("/comment/:id", auth, async (req, res) => {
  const profile = await Profile.findOne({ owner: req.user._id });
  if (!profile) {
    return res
      .status(400)
      .send({ error: "You need to create a profile first." });
  }
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).send({ error: "Post not found." });
    }
    const comment = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      avatar: req.user.avatar,
      text: req.body.text,
      owner: req.user._id
    };

    post.comments.unshift(comment);
    await post.save();
    res.status(201).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PATCH COMMENT
router.patch("/comment/:id/:comment_id", auth, async (req, res) => {
  const allowUpdate = ["text"];
  const update = Object.keys(req.body);
  const isMatch = update.every(u => allowUpdate.includes(u));
  if (!isMatch) {
    return res.status(400).send({ error: "Update invalid." });
  }
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ error: "Post not found." });
    }
    const comment = post.comments.find(
      comment => comment._id.toString() === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).send({ error: "Comment not found." });
    }
    if (comment.owner.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .send({ error: "You can only edit your own Comment." });
    }
    comment.text = req.body.text;
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE COMMENT
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ error: "Post not found." });
    }
    comment = post.comments.find(
      comment => comment._id.toString() === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).send({ error: "Comment not found." });
    }

    if (comment.owner.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .send({ error: "You can only delete your own commets" });
    }
    // Add else if so the owner of the post can delete too
    const comments = post.comments.filter(
      comment => comment._id.toString() !== req.params.comment_id
    );
    post.comments = comments;
    await post.save();

    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
