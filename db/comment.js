const Like = require("../models/like");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

const createComment = async (postId, userId, content) => {
  try {
    const comment = await new Comment({
      author: userId,
      post: postId,
      content,
    }).save();

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { comments: comment._id } }
    );

    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: comment._id } }
    );

    if (comment) {
      return comment;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    await User.findOneAndUpdate(
      { _id: comment.user },
      { $pull: { comments: comment._id } }
    );

    await Post.findOneAndUpdate(
      { _id: comment.post },
      { $pull: { comments: comment._id } }
    );

    if (comment) {
      return comment;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};

const getCommentsByPostId = async (postId) => {
  try {
    const comments = await Comment.find({ post: postId}).populate({path: "author", select: ["name", "profileUrl"]}); 
    if(comments.length === 0){
      return [];
    }
    return comments;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createComment, deleteComment, getCommentsByPostId };
