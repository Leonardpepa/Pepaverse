const { createNotification } = require("../db/notification");

const notificationController = {
  create: async (req, res) => {
    const author = req.user._id;
    const receiver = req.body.receiver;
    const type = req.body.type;
    const postId = req.body.postId;

    const notification = await createNotification(author, receiver, postId, type);

    if(!notification){
        return res.json({
            ok: false,
            notification: null,
        })
    }
    return res.json({
        ok: true,
        notification
    });
    
  },
};

module.exports = notificationController;
