const Mongoose = require("mongoose");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const morgan = require("morgan");
// const flash = require("connect-flash");
const {server, app, io, express} = require("./server.config");

require("dotenv").config();

const pagesRouter = require("./routes/pages");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "this is a long string",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  })
);
// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const middleAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

app.use("/users", middleAuth);
app.use("/likes", middleAuth);

app.use("/", pagesRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

Mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
      callbackURL: "http://localhost:3000/auth/google/home",
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

io.on("connection", (socket) => {
  console.log("user connected");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, (req, res) => {
  console.log(`App is listening on port ${PORT}`);
});

module.exports = { io };