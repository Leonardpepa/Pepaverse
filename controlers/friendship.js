const { acceptFriendship, deleteFriendship, undoFriendship } = require("../db/friendship");

const friendshipController = {
  accept: async (req, res) => {
    const friendshipId = req.body.friendshipId;
    
    const friendship = await acceptFriendship(friendshipId);

    if (!friendship) {
      return res.json({
        ok: false,
      });
    }
    return res.json({
      ok: true,
    });
  },
  delete: async (req, res) => {
    const friendshipId = req.body.friendshipId;

    const friendship = await deleteFriendship(friendshipId);
    if (!friendship) {
      return res.json({
        ok: false,
      });
    }
    return res.json({
      ok: true,
    });
  },
  undo: async (req, res) => {
    const friendshipId = req.body.friendshipId;

    const friendship = await undoFriendship(friendshipId);
    if (!friendship) {
      return res.json({
        ok: false,
      });
    }
    return res.json({
      ok: true,
    });
  }
};

module.exports = friendshipController;
