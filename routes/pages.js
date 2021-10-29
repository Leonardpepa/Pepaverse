const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const Request = require("../models/request");

router.get("/login", (req, res) => {

  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login", {error: {genericError: req.query?.e}});
  }
});

router.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("register", { error: {} });
  }
});

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
      Post.find({author: req.user._id}).populate({path: "author", select: ["name", "profileUrl"]}).exec((err, results) => {
        res.render("home", { user: req.user, posts: results });
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
