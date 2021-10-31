const passport = require("passport");


const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/");
    }
 };


  const passportAuthenticate = (req, res) => {
    passport.authenticate("local", {
      failureRedirect: "/login?e=Email or Password are incorrect"})
      (req, res, () => {
          res.redirect("/");
       });
  }


  module.exports = { ensureAuth, passportAuthenticate };