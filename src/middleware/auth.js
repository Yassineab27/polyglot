const jwt = require("jsonwebtoken");
// const config = require("config");
const User = require("../models/user");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verfiedToken = jwt.verify(token, process.env.jwtSecret);
    const user = await User.findById(verfiedToken._id);
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    res.status(400).send({ error: "Not Authorized. Please Login." });
  }
};

module.exports = auth;
// config.get("jwtSecret"))
