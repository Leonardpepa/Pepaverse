const { findUserById, getAllUsers } = require("../db/user");
const { getFriendshipByUsersId } = require("../db/friendship");
const { getPostByUserId, getPostById } = require("../db/post");
const { getUnSeenNotificationbyUserId } = require("../db/notification");
const pageController = {
  home: async (req, res) => {
    if (req.isAuthenticated()) {
      const user = await findUserById(req.user._id);

      let posts = [];

      const notifications = await getUnSeenNotificationbyUserId(user._id);

      posts = [...user.posts];

      for (let i = 0; i < user.friends.length; i++) {
        posts = [...posts, ...(await getPostByUserId(user.friends[i]))];
      }

      posts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      return res.render("home", { user: user, posts, notifications });
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

    const notifications = await getUnSeenNotificationbyUserId(user._id);

    let requestFriendship = await getFriendshipByUsersId(user._id, id);
    let requestedFriendship = await getFriendshipByUsersId(id, user._id);

    return await res.render("profile", {
      profileUser,
      user,
      requestFriendship,
      requestedFriendship,
      notifications,
    });
  },
  all: async (req, res) => {
    const users = await getAllUsers(req.user._id);
    const notifications = await getUnSeenNotificationbyUserId(req.user._id);
    res.render("all", { user: req.user, allUsers: users, notifications });
  },
  post: async (req, res) => {
    const post = await getPostById(req.params.id);

    const notifications = await getUnSeenNotificationbyUserId(req.user._id);

    res.render("post-display", { user: req.user, notifications, post });
  },
};

module.exports = pageController;
