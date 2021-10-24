const Mongoose = require("mongoose");
const User = require("./user");

const likeSchema = new Mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  user: {
    type: User,
    required: true,
  },
});

const Like = Mongoose.model("Like", likeSchema);

module.exports = Like;
