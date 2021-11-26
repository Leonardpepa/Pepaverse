const { createComment, deleteComment, getCommentsByPostId, updateComment } = require("../db/comment");

const commentController = {
  create: async (req, res, next) => {
    const comment = await createComment(
      req.body.postId,
      req.user._id,
      req.body.content
    );
    if (comment) {
      res.json({
        ok: true,
        comment,
      });
      return;
    }
    res.json({
      ok: false,
    });
  },
  delete: async (req, res, next) => {
    const comment = await deleteComment(req.body.commentId);
    if (comment) {
      res.json({
        ok: true,
      });
      return;
    }
    res.json({
      ok: false,
    });
  },
  update: async (req, res) => {
    const content = req.body.content;
    const commentId = req.body.commentId;

    const comment = await updateComment(commentId, {content: content, updatedAt: Date.now()});

    if(!comment){
      return res.json({ok: false, comment});
    }
    return res.json({ok: true, comment});
  },
  getCommentsByPostId: async (req, res, next) => {
    const comments = await getCommentsByPostId(req.params.postId);
    res.json({
      results: comments
    });
  }
};

module.exports = commentController;
