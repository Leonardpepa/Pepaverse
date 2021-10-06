const express = require("express");
const Mongoose = require("mongoose");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user");

const pagesRouter = require("./routes/pages");
const authRouter = require("./routes/auth");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
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

app.use(passport.initialize());
app.use(passport.session());

app.use("/", pagesRouter);
app.use("/auth", authRouter);

Mongoose.connect("mongodb://localhost:27017/chatApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000, (req, res) => {
  console.log("App is listening on port 3000");
});
