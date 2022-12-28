const WebSocket = require('ws');
const jwt = require("jsonwebtoken");
const { server } = require("./server.config");
const wss = new WebSocket.Server({server: server});
const clients = new Map();

const closureFunc  = () => {
  wss.on('connection', (ws, req) => {
      const cookie = req.headers.cookie;
      
      if (cookie) {
            const token = cookie.split("token=")[1].split(";")[0];
            
            jwt.verify(token, process.env.SECRET, function (err, decoded) {
              
              if(err){
                console.log(err);
              }
              
              ws.authUser = decoded.user;
              
              clients.set(String(ws.authUser._id), ws);
              
              console.log("Loggedin " + ws.authUser.username);
            });
          
          }

          ws.on("message", (message) => {
            let jsonMessage = {"type": ""}
            
            try {
              jsonMessage = JSON.parse(message.toString());
            } catch (error) {
              console.log(error);
            }

            const type = jsonMessage.type;

            if (type == "CREATE_FRIEND_REQUEST"){
              console.log(jsonMessage);
              
              const notification = {
                type: "FRIEND_REQUEST_NOTIFICATION",
                data: jsonMessage.data
              }

              cl = clients.get(String(jsonMessage.data.notification.receiver));
              
              if(cl){
                cl.send(JSON.stringify(notification))
              }

            }


            if (type == "CREATE_LIKE_NOTIFICATION"){
              console.log(jsonMessage);
              
              const notification = {
                type: "LIKE_NOTIFICATION",
                data: jsonMessage.data
              }

              cl = clients.get(String(jsonMessage.data.notification.receiver));
              
              if(cl){
                cl.send(JSON.stringify(notification))
              }

            }


            if (type == "CREATE_COMMENT_NOTIFICATION"){
              console.log(jsonMessage);
              
              const notification = {
                type: "COMMENT_NOTIFICATION",
                data: jsonMessage.data
              }

              cl = clients.get(String(jsonMessage.data.notification.receiver));
              
              if(cl){
                cl.send(JSON.stringify(notification))
              }

            }

          })

          // When the client closes the connection, remove them from the list of connected clients
          ws.on('close', () => {
            console.log("logged out" + ws.authUser.username);
            clients.delete(String(ws.authUser._id));
          });
  });

}    


module.exports = closureFunc;


