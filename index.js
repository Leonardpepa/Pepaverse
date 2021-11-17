require("dotenv").config();

const { server, app, io  } = require("./server.config");
const router = require("./router.js");
const { initdb } = require("./db.config");

initdb();

app.use("/", router);

io.on("connection", (socket) => {
  console.log(socket.handshake.headers);



  socket.on("disconnect", () => {
    console.log("user disconected");
  });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, (req, res) => {
  console.log(`App is listening on port ${PORT}`);
});
