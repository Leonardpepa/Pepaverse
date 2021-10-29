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
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User"
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
