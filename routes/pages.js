const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register", { error: {} });
});

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    Post.find({ authorId: req.user._id })
      .sort({ createdAt: "descending" })
      .exec((err, docs) => {
        if (err) {
          console.log(err);
          return;
        }
        res.render("home", { user: req.user, posts: docs });
      });
  } else {
    res.redirect("/login");
  }
});

router.get("/profile/:userid", (req, res) => {
  if (req.isAuthenticated()) {
    User.findOne({ _id: req.params.userid }, (err, found) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!found) {
        res.redirect("/");
      }
      res.render("profile", { profileUser: found, user: req.user });
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
