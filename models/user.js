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
  },
  googleId: {
    type: String,
  },
  profileUrl: {
    type: String,
  },
  friends: {
    type: Array,
  },
  description: {
    type: String,
  },
  likedPosts: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  posts: {
    type: Array,
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new Mongoose.model("User", userSchema);

module.exports = User;
