const express = require("express");
const AWS = require("aws-sdk");
// const config = require("config");
const uuid = require("uuid/v1");
require("dotenv").config();

const auth = require("../middleware/auth");

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "eu-west-3"
});

router.get("/", auth, (req, res) => {
  const key = `${req.user._id}/${uuid()}.jpeg`;

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "social-network-polyglot",
      ContentType: "image/jpeg",
      Key: key
    },
    (err, url) => res.send({ key, url })
  );
});

module.exports = router;
