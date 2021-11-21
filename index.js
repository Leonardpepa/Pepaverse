require("dotenv").config();

const { server, app, io  } = require("./server.config");
const router = require("./router.js");
const { initdb } = require("./db.config");
const jwt = require('jsonwebtoken');

initdb();

app.use("/", router);

io.on("connection", (socket) => {

  console.log("user connected");
  const token = socket.handshake.headers.cookie.split("token=")[1];
  jwt.verify(token, "process.env.SECRET", function (err, decoded) {
    console.log(decoded);
  })
  socket.on("disconnect", () => {
    console.log("user disconected");
  });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, (req, res) => {
  console.log(`App is listening on port ${PORT}`);
});
