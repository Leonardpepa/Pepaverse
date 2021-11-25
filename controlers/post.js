const { createPost, deletePost, updatePost } = require("../db/post");

const postcontroller = {
  create: async (req, res) => {
    try {
      const content = req.body.postTextContent;
      const author = req.user._id;

      const post = await createPost(content, author);

      await res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    const postId = req.body.postId;
    const deletedPost = await deletePost(postId);
    if(deletePost){
      res.json({ok: true});
      return;
    }
    res.json({ok: false});
  },

  update: async (req, res) => {
    const content = req.body.content;
    const postId = req.body.postId;

    const post = await updatePost(postId, {content: content});

    if(!post){
      return res.json({ok: false, post});
    }
    return res.json({ok: true, post});
  }
};

module.exports = postcontroller;
