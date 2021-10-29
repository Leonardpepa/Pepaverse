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
   type: [Mongoose.SchemaTypes.ObjectId],
   ref: "User"
  },
  description: {
    type: String,
  },
  likedPosts: {
    type: [Mongoose.SchemaTypes.ObjectId],
    ref: "Like"
  },
  comments: {
    type: Array,
  },
  posts: {
    type: [Mongoose.SchemaTypes.ObjectId],
    ref: "Post"
  },
  requests: {
    type: [Mongoose.SchemaTypes.ObjectId],
    ref: "Request"
  },
  searchName: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new Mongoose.model("User", userSchema);

module.exports = User;
