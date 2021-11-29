const { findUserById, getAllUsers } = require("../db/user");

const pageController = {
  home: async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await findUserById(req.user._id);
      return await res.render("home", { user: user, posts: user.posts });
    } else {
      return res.redirect("/login");
    }
  },
  login: (req, res) => {
    return res.render("login", { error: { generic: req.query.e } });
  },
  register: (req, res) => {
    return res.render("register", { error: { generic: req.query.e } });
  },
  profile: async (req, res) => {
    const id = req.params.userid;
    const profileUser = await findUserById(id);
    return await res.render("profile", { profileUser, user: req.user });
  },
  all: async (req, res) => {
    const users = await getAllUsers(req.user._id);
    res.render("all", {user: req.user, allUsers: users});
  }
};

module.exports = pageController;
