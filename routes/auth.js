const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");

router.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  User.register({ email, username }, password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });
});

router.post("/login", (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({
    username: username,
    email: email,
    password: password,
  });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
