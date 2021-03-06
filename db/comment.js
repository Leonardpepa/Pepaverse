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
      return await Comment.findById(comment._id).populate({
        path: "author",
        select: ["name", "profileUrl"],
      });
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findByIdAndRemove(commentId);
    if (!comment) {
      return null;
    }

    await User.findOneAndUpdate(
      { _id: comment.author },
      { $pull: { comments: commentId } }
    );

    await Post.findOneAndUpdate(
      { _id: comment.post },
      { $pull: { comments: commentId } }
    );

    return comment;
  } catch (error) {
    console.log(error);
  }
};

const updateComment = async (id, fieldsToUpdate) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: id },
      { ...fieldsToUpdate }
    );
    if (!comment) {
      return null;
    }

    return await comment;
  } catch (error) {
    console.log(error);
  }
};

const getCommentsByPostId = async (postId) => {
  try {
    const comments = await Comment.find({ post: postId }).populate({
      path: "author",
      select: ["name", "profileUrl"],
    });
    if (comments.length === 0) {
      return [];
    }
    return comments;
  } catch (error) {
    console.log(error);
  }
};

const getCommentById = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return null;
    }

    return await Comment.findById(comment._id).populate({
      path: "author",
      select: ["name", "profileUrl"],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCommentById,
  createComment,
  deleteComment,
  getCommentsByPostId,
  updateComment,
};
