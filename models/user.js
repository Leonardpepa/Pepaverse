const Mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = new Mongoose.model("User", userSchema);

module.exports = User;
