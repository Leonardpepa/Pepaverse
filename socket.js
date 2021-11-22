const { Server }  = require('socket.io');
const { server } = require("./server.config");
const jwt = require('jsonwebtoken');

const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const configureIO = () => {
      const users = {};
      io.use((socket, next) => {
        const cookie = socket.handshake.headers.cookie; 
        if (cookie) {
          const token = cookie.split("token=")[1];
          jwt.verify(token, process.env.SECRET, function (err, decoded) {
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

      });
  }


  module.exports = configureIO;