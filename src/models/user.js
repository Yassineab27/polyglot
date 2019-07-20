const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Post = require("./post");
const Profile = require("./profile");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please provide a valid Email.");
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "owner"
});

userSchema.pre("remove", async function(next) {
  await Post.deleteMany({ owner: this._id });
  await Profile.deleteMany({ owner: this._id });
  next();
});

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();

  delete userObject.password;

  return userObject;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
