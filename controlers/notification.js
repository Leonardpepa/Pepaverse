const {
  createFriendRequestNotifification,
  createLikeNotification,
  deleteNotification,
  deleteNotificationByLikeId,
  createCommentNotification,
  deleteNotificationByCommentId,
  updateSeen,
} = require("../db/notification");

const notificationController = {
  createFriendRequest: async (req, res) => {
    const author = req.user._id;
    const receiver = req.body.receiver;
    const type = req.body.type;
    const postId = req.body.postId;

    const notification = await createFriendRequestNotifification(
      author,
      receiver,
      postId,
      type
    );

    if (!notification) {
      return res.json({
        ok: false,
        notification: null,
      });
    }
    return res.json({
      ok: true,
      notification,
    });
  },
  createLikeNotification: async (req, res) => {
    const author = req.user._id;
    const receiver = req.body.receiver;
    const type = req.body.type;
    const post = req.body.post;
    const like = req.body.like;

    if(receiver.toString() === req.user._id.toString()){
      return res.json({
        ok: false,
        notification: null,
      });
    }

    const notification = await createLikeNotification(
      author,
      receiver,
      post,
      type,
      like,
    );

    if (!notification) {
      return res.json({
        ok: false,
        notification: null,
      });
    }
    return res.json({
      ok: true,
      notification,
    });
  },
  createCommentNotification: async (req, res) => {
    const author = req.user._id;
    const receiver = req.body.receiver;
    const type = req.body.type;
    const post = req.body.post;
    const like = req.body.like;
    const comment = req.body.comment;
    
    if(receiver.toString() === req.user._id.toString()){
      return res.json({
        ok: false,
        notification: null,
      });
    }
    
    const notification = await createCommentNotification(
      author,
      receiver,
      post,
      type,
      like,
      comment,
    );

    if (!notification) {
      return res.json({
        ok: false,
        notification: null,
      });
    }
    return res.json({
      ok: true,
      notification,
    });
  },
  deleteByLike: async (req, res) => {
    const notification = await deleteNotificationByLikeId(req.body.like);
    if(!notification){
      return res.json({
        ok: false
      });
    }
    return res.json({
      ok: true,
      notification
    });
  },
  deleteByComment: async (req, res) => {
    const notification = await deleteNotificationByCommentId(req.body.comment);
    if(!notification){
      return res.json({
        ok: false
      });
    }
    return res.json({
      ok: true,
      notification
    });
  },
  updateSeen: async (req, res) => {
    const notification = await updateSeen(req.params.id);

    if(!notification){
      return res.json({ok: false});
    }

    return res.json({ok: true});
  },
};

module.exports = notificationController;
