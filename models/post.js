const Mongoose = require("mongoose");

const postSchema = new Mongoose.Schema({
  content: {
    type: String,
    required: [true, "Post cant be empty"],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  authorProfileUrl: {
    type: String,
  },
  likes: {
    type: Array,
  },
  comments: {
    type: Array,
  },
});

const Post = Mongoose.model("Post", postSchema);

module.exports = Post;
