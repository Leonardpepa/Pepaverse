require("dotenv").config();

const { server, app  } = require("./server.config");
const router = require("./router.js");
const { initdb } = require("./db.config");

initdb();
require("./socket")();

app.use("/", router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, (req, res) => {
  console.log(`App is listening on port ${PORT}`);
});
