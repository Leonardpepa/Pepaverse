const Mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new Mongoose.Schema({
  //email
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
  },
  profileUrl: {
    type: String,
  },
  friends: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
  },
  likedPosts: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  likes: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  comments: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  posts: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  searchName: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new Mongoose.model("User", userSchema);

module.exports = User;
