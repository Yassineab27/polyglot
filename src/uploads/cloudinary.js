const cloudinary = require("cloudinary");
const config = require("config");

cloudinary.config({
  cloud_name: "dvouhngjz",
  api_key: "117689347238693",
  api_secret: config.get("CLOUDINARY_API_SECRET")
});

module.exports = cloudinary;
