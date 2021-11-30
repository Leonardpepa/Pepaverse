const User = require("../models/user");
const Notification = require("../models/notification");

const createNotification = async (author, receiverId, postId, type) => {
  switch (type) {
    case "friend-request":
      const exists =
        (await Notification.findOne({ author, receiver: receiverId })) ||
        (await Notification.findOne({ author: receiverId, receiver: author }));

      if (exists) {
        return null;
      }

      const notification = await new Notification({
        author,
        receiver: receiverId,
        type,
      }).save();

      if (!notification) {
        return null;
      }

      const { createFriendship } = require("./friendship");
      const friendship = await createFriendship(
        author,
        receiverId,
        "pending",
        notification._id
      );

      if (!friendship) {
        return null;
      }

      await Notification.findByIdAndUpdate(notification._id, {
        friendship: friendship._id,
      });

      await User.findOneAndUpdate(
        { _id: receiverId },
        { $push: { notifications: notification } }
      );

      return notification;

      break;

    default:
      break;
  }
};

const deleteNotification = async (id) => {
  const notification = await Notification.findByIdAndRemove(id);

  if (!notification) {
    return null;
  }

  await User.findOneAndUpdate(
    { _id: notification.receiver },
    { $pull: { notifications: notification._id } }
  );
};

const getUnSeenNotificationbyUserId = async (id) => {
  const notifications = await Notification.find({
    receiver: id,
    seen: false,
  }).populate({ path: "author", select: ["name", "profileUrl"] });
  if (!notifications) {
    return [];
  }
  return notifications;
};

module.exports = {
  createNotification,
  deleteNotification,
  getUnSeenNotificationbyUserId,
};
