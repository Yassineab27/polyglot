const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    age: {
      type: String
    },
    country: {
      type: String
    },
    bio: {
      type: String,
      trim: true
    },
    languageN: {
      type: String,
      required: true
    },
    languageL: {
      type: String,
      required: true
    },
    interests: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
