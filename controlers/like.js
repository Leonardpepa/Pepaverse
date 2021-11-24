const {
  createLike,
  deleteLike,
  findLikeByUserIdandPostId,
} = require("../db/like");
const { findPostById } = require("../db/post");

const likeController = {
  create: async (req, res, next) => {
    const user = req.user;
    const postId = req.body.postId;

    const likeExists = await findLikeByUserIdandPostId(user._id, postId);

    if (likeExists) {
      await res.json({
        n: -1,
        message: "error",
        ok: false,
        liked: false,
      });
      return;
    }

    const like = await createLike(user._id, postId);
    if (like) {
      await res.json({
        n: like.postId.likes.length,
        message: "Like Added",
        ok: true,
        liked: true,
      });
    }
  },
  delete: async (req, res, next) => {
    const postId = req.body.postId;
    const userId = req.user._id;

    const like = await findLikeByUserIdandPostId(userId, postId);
    if (like) {
      const deletedLike = await deleteLike(like._id);
      const post = await findPostById(postId);
      await res.json({
        n: post.likes.length,
        ok: true,
        liked: false,
      });
    } else {
      await res.json({
        n: -1,
        ok: false,
        liked: false,
      });
    }
  },
};

module.exports = likeController;
