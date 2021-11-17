const { createUser, loginUser } = require("../db/user");
const passport = require("passport");
const { validateEmail, validatePassword } = require("../utils/validation");
const User = require("../models/user");

const authController = {
  google: (req, res) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
  },
  googleCallback: (req, res) => {
    passport.authenticate(
      "google",
      { failureRedirect: "/login?e=Unauthorized" },
      (err, user) => {
        req.login(user, (err) => {
          if (!err) {
            res.redirect("/");
          }
        });
      }
    )(req, res);
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    await loginUser(req, res, username, password);
  },
  register: async (req, res, next) => {
    const { username, password, confirm } = req.body;
    const name = username.split("@")[0];
    const profileUrl = "/default-profile.jpg";
    const searchName = name.toLowerCase();

    if (!validateEmail(username)) {
      res.render("register", { error: { emailError: "Invalid email format" } });
      return;
    }
    if (!validatePassword(password, confirm)) {
      res.render("register", {
        error: {
          passwordError:
            "Password should contain atleast one digit, one lower and upper case letter and the length should be atleast 8 characters",
        },
      });
      return;
    }
    await createUser(
      req,
      res,
      username,
      password,
      name,
      profileUrl,
      searchName
    );
  },
  logout: async (req, res, next) => {
    await req.logout();
    await req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
  });
  },
};

module.exports = authController;
