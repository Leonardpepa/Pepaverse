# Pepaverse 

# /* still in development */
# Live Preview
[Pepaverse](https://pepaverse.onrender.com/)

# Pepaverse is an open source social network build with nodejs, mongoDB, passportjs and web sockets

# it started as my first attempt to create a chat application but now has been evolved to my fist attempt creating my own social network to share with my friends

# Use Cases ( that works for now )

* Login-Register ( via email-password or google-auth20 )
* Edit Profile ( profile picture url and description )
* Send Friend Request
* Accept Friend Request
* Delete Friend Request
* Create Post ( only text for now )
* Delete Post
* Delete Comment
* Update Post
* Update Comment
* Like Post ( any users post )
* Notifications (like, comment, friend request) in real time using web sockets
* Search Users ( via name )
* Logout

# Soon to be implemented
* Live Notifications (DONE!)
* Private Chat

# Local Installation

you need to add and configure an .env file as follows
* PORT=< port number >
* MONGO_DB_URL=< any mongodb url you prefer>
* GOOGLE_CLIENT_ID=< your google id privided by google for the application >
* GOOGLE_CLIENT_SECRET=< your google secret privided by google for the application >
* SECRET=< secret string for the cookie and jwt >
* FRONTEND_URL=< http://localhost:< port > for local or a hosted url with your fronted>

```terminal
  git clone https://github.com/Leonardpepa/Pepaverse.git
  cd Pepaverse/
  npm install
  node index.js
```
* source for ui components: [Bootsrap](https://getbootstrap.com/)
* source for icons: [Font Awesome](https://fontawesome.com/)
