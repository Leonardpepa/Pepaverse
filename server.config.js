const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server);



module.exports = { server, app, io, express }


