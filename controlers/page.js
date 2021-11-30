const { findUserById, getAllUsers } = require("../db/user");
const { getFriendshipByUsersId } = require("../db/friendship");
const { getPostByUserId } = require("../db/post");
const pageController = {
  home: async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await findUserById(req.user._id);
      let posts = [];

      posts = [...user.posts];
      
      for(let i=0; i<user.friends.length; i++){
        posts = [...posts ,...await getPostByUserId(user.friends[i])]
      }

      console.log(posts);

      return  res.render("home", { user: user, posts });
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
    const user = await findUserById(req.user._id);
    const profileUser = await findUserById(id);

    let requestFriendship = await getFriendshipByUsersId(user._id, id);
    let requestedFriendship = await getFriendshipByUsersId(id, user._id);

    return await res.render("profile", {
      profileUser,
      user,
      requestFriendship,
      requestedFriendship,
    });
  },
  all: async (req, res) => {
    const users = await getAllUsers(req.user._id);
    res.render("all", { user: req.user, allUsers: users });
  },
};

module.exports = pageController;
