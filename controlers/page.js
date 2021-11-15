const { findUserById } = require("../db/user");

const pageController = {
  home: async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await findUserById(req.user._id);
      await res.render("home", { user: user, posts: user.posts });
    } else {
      res.redirect("/login");
    }
  },
  login: (req, res) => {
    res.render("login", { error: { genericError: req.params?.e } });
  },
  register: (req, res) => {
    res.render("register", { error: {} });
  },
  profile: async (req, res) => {
    const id = req.params.userid;
    const profileUser = await findUserById(id);
    await res.render("profile", { profileUser, user: req.user });
  },
};

module.exports = pageController;
