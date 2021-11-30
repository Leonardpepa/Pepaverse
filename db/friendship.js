const Friendship = require("../models/friendship");
const Notification = require("../models/notification");
const User = require("../models/user");
const { deleteNotification } = require("./notification");

const createFriendship = async (author, receiver, status, notification) => {
  try {
    const friendship = await new Friendship({
      author,
      receiver,
      status,
      notification,
    }).save();

    if (!friendship) {
      return null;
    }

    return friendship;
  } catch (error) {
    console.log(error);
  }
};

const deleteFriendship = async (id) => {
  const friendship = await Friendship.findByIdAndRemove(id);

  if (!friendship) {
    return null;
  }

  await User.findByIdAndUpdate(friendship.author, {
    $pull: { friends: friendship.receiver },
  });
  await User.findByIdAndUpdate(friendship.receiver, {
    $pull: { friends: friendship.author },
  });

  await deleteNotification(friendship.notification);

  return friendship;
};

const acceptFriendship = async (id) => {
  const friendship = await Friendship.findByIdAndUpdate(id, {
    status: "friends",
  });

  if (!friendship) {
    return null;
  }

  await User.findByIdAndUpdate(friendship.author, {
    $addToSet: { friends: friendship.receiver },
  });
  await User.findByIdAndUpdate(friendship.receiver, {
    $addToSet: { friends: friendship.author },
  });
  await Notification.findByIdAndUpdate(friendship.notification, {
    status: "friends",
    seen: true,
  });

  return friendship;
};

const undoFriendship = async (id) => {
  const friendship = await Friendship.findByIdAndRemove(id);

  if (!friendship) {
    return null;
  }

  await User.findByIdAndUpdate(friendship.author, {
    $pull: { friends: friendship.receiver },
  });
  await User.findByIdAndUpdate(friendship.receiver, {
    $pull: { friends: friendship.author },
  });


  await deleteNotification(friendship.notification);

  return friendship;
};

const getFriendshipByUsersId = async (author, receiver) => {
  const friendship = await Friendship.findOne({ author, receiver });
  if (!friendship) {
    return null;
  }
  return friendship;
};

module.exports = {
  createFriendship,
  acceptFriendship,
  getFriendshipByUsersId,
  deleteFriendship,
  undoFriendship,
};
