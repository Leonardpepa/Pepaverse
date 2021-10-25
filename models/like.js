const Mongoose = require("mongoose");
const User = require("../models/user");

const likeSchema = new Mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Like = Mongoose.model("Like", likeSchema);

module.exports = Like;
