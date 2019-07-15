const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("GET POSTS");
});

router.post("/", async (req, res) => {
  res.send("CREATE POST");
});

router.patch("/:id", async (req, res) => {
  res.send("UPDATE POST");
});

router.delete("/:id", async (req, res) => {
  res.send("DELETE POST");
});

module.exports = router;
