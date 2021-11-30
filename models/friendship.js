const Mongoose = require("mongoose");

const friendshipSchema = new Mongoose.Schema({
  author: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
  },
  notification: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Notification",
  },
});

const Friendship = Mongoose.model("Friendship", friendshipSchema);

module.exports = Friendship;
