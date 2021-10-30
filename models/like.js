const Mongoose = require("mongoose");

const likeSchema = new Mongoose.Schema({
  postId: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "Post"
  },
  userId: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
});

const Like = Mongoose.model("Like", likeSchema);

module.exports = Like;
