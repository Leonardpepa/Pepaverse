const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register", { error: "" });
});

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home", { username: req.user.username });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
