const passport = require("passport");
const  jwt = require('jsonwebtoken');
const User = require("../models/user");

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

const passportAuthenticateLocal = (req, res) => {
  passport.authenticate("local", {
    failureRedirect: "/login?e=Email or Password are incorrect",
  })(req, res, async () => {
    const token = jwt.sign({ user: {username: req.user.username, _id: req.user._id } }, "process.env.SECRET");
    res.cookie('token', token);
    res.redirect("/");
  });
};

module.exports = { ensureAuth, passportAuthenticateLocal };
