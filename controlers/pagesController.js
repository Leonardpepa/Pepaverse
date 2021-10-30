const { findUserById } = require("../db/user");


const pagesController = {
    home: (req, res, next) => {
        const user = await findUserById(req.user._id);
        res.render("home", { user: user, posts: user.posts });
    }
}


export default pagesController;