const { createPost } = require("../db/post");

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
};

module.exports = postcontroller;
