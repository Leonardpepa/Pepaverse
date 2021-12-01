const User = require("../models/user");
const Notification = require("../models/notification");

const createFriendRequestNotifification = async (
  author,
  receiver,
  post,
  type
) => {
  let exists =
    (await Notification.findOne({
      author,
      receiver,
      type: "friend-request",
    })) ||
    (await Notification.findOne({
      author: receiver,
      receiver: author,
      type: "friend-request",
    }));

  if (exists) {
    return null;
  }

  let notification = await new Notification({
    author,
    receiver,
    type,
    post: null,
    like: null,
  }).save();

  if (!notification) {
    return null;
  }

  const { createFriendship } = require("./friendship");
  const friendship = await createFriendship(
    author,
    receiver,
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
    { _id: receiver },
    { $push: { notifications: notification } }
  );

  return notification;
};

const createLikeNotification = async (author, receiver, post, type, like) => {
  let exists = await Notification.findOne({
    author,
    receiver: receiver,
    type: "like",
    post: post,
  });

  if (exists) {
    return null;
  }

  let notification = await new Notification({
    author,
    receiver,
    type,
    post,
    like,
  }).save();

  if (!notification) {
    return null;
  }

  await User.findOneAndUpdate(
    { _id: receiver },
    { $push: { notifications: notification } }
  );

  return notification;
};

const createCommentNotification = async (
  author,
  receiver,
  post,
  type,
  like,
  comment
) => {
  let notification = await new Notification({
    author,
    receiver,
    type,
    post,
    like,
    comment,
  }).save();

  if (!notification) {
    return null;
  }

  await User.findOneAndUpdate(
    { _id: receiver },
    { $push: { notifications: notification } }
  );

  return notification;
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

const deleteNotificationByCommentId = async (id) => {
  const notification = await Notification.findOneAndRemove({ comment: id });
  if (!notification) {
    return null;
  }
  await User.findOneAndUpdate(
    { _id: notification.receiver },
    { $pull: { notifications: notification._id } }
  );
  return notification;
};

const deleteNotificationByLikeId = async (id) => {
  const notification = await Notification.findOneAndRemove({ like: id });
  if (!notification) {
    return null;
  }
  await User.findOneAndUpdate(
    { _id: notification.receiver },
    { $pull: { notifications: notification._id } }
  );
  return notification;
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

const updateSeen = async (id) => {
  const notification = await Notification.findByIdAndUpdate(id, { seen: true });

  if (!notification) {
    return null;
  }

  return notification;
};

module.exports = {
  createLikeNotification,
  deleteNotification,
  getUnSeenNotificationbyUserId,
  createFriendRequestNotifification,
  deleteNotificationByLikeId,
  createCommentNotification,
  deleteNotificationByCommentId,
  updateSeen,
};
