const passport = require("passport");
const User = require("./models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.FRONTEND_URL}/auth/google/home`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ username: profile.emails[0].value }, (err, found) => {
        if (err) {
          console.log(err);
        }

        if (found) {
          return cb(err, found);
        }
        User.findOrCreate(
          {
            googleId: profile.id,
            username: profile.emails[0].value,
            name: profile.displayName,
            profileUrl: profile.photos[0].value,
            searchName: profile.displayName.toLowerCase(),
          },
          function (err, user) {
            return cb(err, user);
          }
        );
      });
    }
  )
);

module.exports = { passport };