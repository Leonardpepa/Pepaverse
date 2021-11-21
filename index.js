require("dotenv").config();

const { server, app, io  } = require("./server.config");
const router = require("./router.js");
const { initdb } = require("./db.config");
const jwt = require('jsonwebtoken');

initdb();

app.use("/", router);

const users = {};

io.use((socket, next) => {
  const cookie = socket.handshake.headers.cookie; 
  if (cookie) {
    const token = cookie.split("token=")[1];
    jwt.verify(token, "process.env.SECRET", function (err, decoded) {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.authUser = decoded.user;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});

io.on("connection", (socket) => {

  console.log('Socket connection. socket.connected: ', socket.connected);
  const userId = socket.authUser._id;
  
  if (!users[userId]) {
    users[userId] = {
      socketId: socket.id,
      userId: userId,
    };
  }

  socket.on("disconnect", () => {
    console.log('Socket disconnected');
    delete users[socket.authUser._id];
  });

  console.log(users);

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, (req, res) => {
  console.log(`App is listening on port ${PORT}`);
});
