
const { createPost } = require("../db/post");

const postcontroller = {
    create: async (req, res, next) => {
        const content = req.body.postTextContent;
        const author = req.user._id;
        
        const post = await createPost(content, author);
        await res.redirect("/");
    }
}


export default postcontroller;