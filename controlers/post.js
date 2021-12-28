const {
  getPostById,
  createPost,
  deletePost,
  updatePost,
} = require("../db/post");

const postcontroller = {
  create: async (req, res) => {
    try {
      const content = req.body.postTextContent;
      const author = req.user._id;

      const post = await createPost(content, author);

      return await res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => {
    console.log("yes");
    try {
      const postId = req.body.postId;

      const author = (await getPostById(postId)).author._id;

      if (author.toString() !== req.user._id.toString()) {
        return res.json({ ok: false });
      }

      const deletedPost = await deletePost(postId);
      
      if (deletePost) {
        return res.json({ ok: true });
      }

      return res.json({ ok: false });
    } catch (error) {
      console.log(error);
    }
  },

  update: async (req, res) => {
    const content = req.body.content;
    const postId = req.body.postId;

    const author = (await getPostById(postId)).author._id;

    if (author.toString() !== req.user._id.toString()) {
      return res.json({ ok: false });
    }

    const post = await updatePost(postId, {
      content: content,
      updatedAt: Date.now(),
    });


    if (!post) {
      return res.json({ ok: false, post });
    }
    return res.json({ ok: true, post });
  },
};

module.exports = postcontroller;
