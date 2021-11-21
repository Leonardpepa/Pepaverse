const passport = require("passport");
const  jwt = require('jsonwebtoken');

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
  })(req, res, () => {
    const token = jwt.sign({ user: {username: req.user.username, id: req.user._id } }, "process.env.SECRET");
    res.cookie('token', token);
    res.redirect("/");
  });
};

module.exports = { ensureAuth, passportAuthenticateLocal };
