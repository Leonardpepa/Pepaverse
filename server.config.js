const express = require("express");
const app = express();

const ejs = require("ejs");
const session = require("express-session");
const morgan = require("morgan");
const http = require("http");
const { Server }  = require('socket.io');

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

const { passport } = require("./passport.config");
app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

module.exports = { server, app, io, express };
