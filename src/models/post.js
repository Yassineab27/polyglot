const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
      //   maxlength: 50
    },
    description: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
