const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
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
