const Like = require("../models/like");
const Post = require("../models/post");
const User = require("../models/user");
const { deleteComment } = require("./comment");
const { deleteLike } = require("./like");

const createPost = async (content, userId) => {
  try {
    const post = await new Post({
      content,
      author: userId,
    }).save();

    await User.findOneAndUpdate(
      { _id: post.author },
      { $push: { posts: post._id } }
    );

    const p = await Post.findById(post._id)
      .populate("author")
      .populate("likes")
      .exec();

    return await p;
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (postId) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(postId);

    await User.findByIdAndUpdate(deletedPost.author, {
      $pull: { posts: postId },
    });

    const comments = deletedPost.comments;

    comments.forEach(async (comment) => {
      await deleteComment(comment);
    });

    const likes = deletedPost.likes;

    likes.forEach(async (like) => {
      await deleteLike(like);
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (id, fieldsToUpdate) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { ...fieldsToUpdate }
    );
    if (!post) {
      return null;
    }

    return await post;
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    console.log(error);
  }
};

const getPostByUserId = async (userId) => {
  const posts = await Post.find({ author: userId }).populate([
    {
      path: "author",
      select: ["name", "profileUrl"],
    },
    {
      path: "comments",
      options: {
        sort: {
          createdAt: "desc",
        },
      },
      populate: [
        {
          path: "author",
          select: ["name", "profileUrl"],
        },
      ],
    },
  ]);
  if (!posts) {
    return [];
  }
  return posts;
};

module.exports = {
  getPostByUserId,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
