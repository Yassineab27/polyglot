const express = require("express");
const AWS = require("aws-sdk");
const config = require("config");
const uuid = require("uuid/v1");

const auth = require("../middleware/auth");

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: config.get("ACCESS_KEY_ID"),
  secretAccessKey: config.get("SECRET_ACCESS_KEY")
});

router.get("/", auth, (req, res) => {
  const key = `${req.user._id}/${uuid()}.jpeg`;

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: "social-network-polyglot",
      ContentType: "jpeg",
      Key: key
    },
    (err, url) => res.send({ key, url })
  );
});

module.exports = router;
