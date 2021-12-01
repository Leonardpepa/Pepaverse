const {
  getCommentById,
  createComment,
  deleteComment,
  getCommentsByPostId,
  updateComment,
} = require("../db/comment");

const commentController = {
  create: async (req, res, next) => {
    const comment = await createComment(
      req.body.postId,
      req.user._id,
      req.body.content
    );
    if (comment) {
      return res.json({
        ok: true,
        comment,
      });
    }
    return res.json({
      ok: false,
    });
  },
  delete: async (req, res, next) => {
    const author = (await getCommentById(req.body.commentId)).author;
    
    if (author.toString() !== req.user._id.toString()) {
      return res.json({
        ok: false,

      });
    }
    const comment = await deleteComment(req.body.commentId);
    if (comment) {
      return res.json({
        ok: true,
        comment: comment,
      });
    }
  },
  update: async (req, res) => {
    const content = req.body.content;
    const commentId = req.body.commentId;

    const author = (await getCommentById(req.body.commentId)).author;

    if (author.toString() !== req.user._id.toString()) {
      return res.json({ ok: false, comment });
    }

    const comment = await updateComment(commentId, {
      content: content,
      updatedAt: Date.now(),
    });

    if (!comment) {
      return res.json({ ok: false, comment });
    }
    return res.json({ ok: true, comment });
  },
  getCommentsByPostId: async (req, res, next) => {
    const comments = await getCommentsByPostId(req.params.postId);
    return res.json({
      results: comments,
    });
  },
};

module.exports = commentController;
