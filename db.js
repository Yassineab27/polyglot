const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("connected to MongoDB..");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
