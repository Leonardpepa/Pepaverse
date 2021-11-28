# Pepaverse 

# /* still in development */

# it started as my first attempt to create a chat application but now has been evolved to my fist attempt creating my own social network to share with my friends

# Use Cases ( that works for now )

* Login-Register ( via email-password or google-auth20 )
* Edit Profile ( profile picture url and description )
* Create Post ( only text for now )
* Delete Post
* Delete Comment
* Update Post
* Update Comment
* Like Post ( any users post )
* Search Users ( via name )
* Logout

# Soon to be implemented

* Friend Request ( send, accept )
* Private Chat

# Local Installation

you need to add and configure an .env file as follows
* PORT=< port number >
* MONGO_DB_URL=< any mongodb url you prefer>
* GOOGLE_CLIENT_ID=< your google id privided by google for the application >
* GOOGLE_CLIENT_SECRET=< your google secret privided by google for the application >
* SECRET=< secret string for the cookie and jwt >
* FRONTED_URL=< http://localhost:< port > for local or a hosted url with your fronted>

```terminal
  git clone https://github.com/Leonardpepa/Pepaverse.git
  cd Pepaverse/
  npm install
  node index.js
```
* source for ui components: [Bootsrap](https://getbootstrap.com/)
* source for icons: [Font Awesome](https://fontawesome.com/)
# Live [Pepaverse](https://pepaverse.herokuapp.com)
