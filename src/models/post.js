const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100
    },
    picture: {
      type: String
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    likes: [
      {
        owner: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    comments: [
      {
        owner: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        text: {
          type: String,
          required: true
        },
        firstName: {
          type: String
        },
        lastName: {
          type: String
        },
        avatar: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
