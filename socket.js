const { Server } = require("socket.io");
const { server } = require("./server.config");
const jwt = require("jsonwebtoken");

const io = new Server(server);

const configureIO = () => {
  const users = {};
  io.use((socket, next) => {
    const cookie = socket.handshake.headers.cookie;
    if (cookie) {
      const token = cookie.split("token=")[1];
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
          return next(new Error("Authentication error"));
        }
        socket.authUser = decoded.user;
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connection. socket.connected: ", socket.connected);
    const userId = socket.authUser._id;

    if (!users[userId]) {
      users[userId] = {
        socketId: socket.id,
        userId: userId,
      };
    }

    socket.on("CREATE_FRIEND_REQUEST", (data) => {
      if (data?.notification?.receiver) {
        io.to(users[data.notification.receiver].socketId).emit(
          "FRIEND_REQUEST_NOTIFICATION",
          data
        );
      }
    });

    socket.on("CREATE_LIKE_NOTIFICATION", (data) => {
      if (data?.notification?.receiver) {
        io.to(users[data.notification.receiver].socketId).emit(
          "LIKE_NOTIFICATION",
          data
        );
      }
    });

    socket.on("CREATE_COMMENT_NOTIFICATION", (data) => {
      if (data?.notification?.receiver) {
        io.to(users[data.notification.receiver].socketId).emit(
          "COMMENT_NOTIFICATION",
          data
        );
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      delete users[socket.authUser._id];
    });
  });
};

module.exports = configureIO;
