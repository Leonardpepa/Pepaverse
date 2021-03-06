const {
  createLike,
  deleteLike,
  findLikeByUserIdandPostId,
} = require("../db/like");
const { getPostById } = require("../db/post");

const likeController = {
  create: async (req, res, next) => {
    const user = req.user;
    const postId = req.body.postId;

    const likeExists = await findLikeByUserIdandPostId(user._id, postId);

    if (likeExists) {
      return await res.json({
        n: -1,
        message: "error",
        ok: false,
        liked: false,
      });
    }

    const like = await createLike(user._id, postId);
    if (like) {
      return await res.json({
        n: like.postId.likes.length,
        message: "Like Added",
        ok: true,
        liked: true,
        like: like._id,
      });
    }
  },
  delete: async (req, res, next) => {
    const postId = req.body.postId;
    const userId = req.user._id;

    const like = await findLikeByUserIdandPostId(userId, postId);
    if (like) {
      const deletedLike = await deleteLike(like._id);
      const post = await getPostById(postId);
      return await res.json({
        n: post.likes.length,
        ok: true,
        liked: false,
        like: like._id,
      });
    } else {
      return await res.json({
        n: -1,
        ok: false,
        liked: false,
      });
    }
  },
};

module.exports = likeController;
