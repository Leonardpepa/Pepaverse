const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");

router.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  User.register({ email, username }, password, (err, user) => {
    if (err) {
      if (err.code === 11000) {
        res.render("register", { error: "Email already in use" });
      } else {
        res.redirect("/register");
      }
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
