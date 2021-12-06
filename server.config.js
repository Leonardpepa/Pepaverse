const express = require("express");
const app = express();

const ejs = require("ejs");
const session = require("express-session");
const cookieParser  = require('cookie-parser');
const morgan = require("morgan");
const http = require("http");
// const helmet = require("helmet");

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    SameSite: true,
    cookie: {
      httpOnly: true,
      sameSite: true,
    },
  })
);

const { passport } = require("./passport.config");


app.use(passport.initialize());

app.use(passport.session());

const server = http.createServer(app);

module.exports = { server, app, express };
