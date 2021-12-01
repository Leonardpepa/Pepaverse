const Mongoose = require("mongoose");

const notificationSchema = new Mongoose.Schema(
  {
    author: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    type: {
      type: String,
    },
    status: {
      type: String,
      default: "pending"
    },
    like: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
    comment: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    friendship: { 
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Friendship",
    }
  },
  { timestamps: true }
);

const Notification = Mongoose.model("Notification", notificationSchema);

module.exports = Notification;
