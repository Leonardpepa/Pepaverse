const Mongoose = require("mongoose");

const postSchema = new Mongoose.Schema({
  content: {
    type: String,
    required: [true, "Post cannot be empty"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
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
});

const Post = Mongoose.model("Post", postSchema);

module.exports = Post;
