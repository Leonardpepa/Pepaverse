
const { createLike, deleteLike, findLikeByUserIdandPostId } = require("../db/like");
const { findPostById } = require("../db/post");

const likeController = {
    create: async (req, res, next) => {
        const user = req.user;
        const postId = req.body.postId;
        const like = await createLike(user._id, postId);
        await res.json({
            n: like.postId.likes.length,
            message: "Like Added",
            ok: true,
            liked: true,
          });
    },
    delete: async (req, res, next) => {
        const postId = req.body.postId;
        const userId = req.user._id;

        const like = await findLikeByUserIdandPostId(userId, postId);
        
        const deletedLike = await deleteLike(like._id);
        const post = await findPostById(postId);
        await res.json({
            n: post.likes.length,
            message: "Like Removed",
            ok: true,
            liked: false,
        });
    }
}

module.exports = likeController;


