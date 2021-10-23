const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const name = username.split("@")[0];

  User.register({ username, name }, password, (err, user) => {
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
  const { username, password } = req.body;
  const user = new User({
    username,
    password,
  });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google/home",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
