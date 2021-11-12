const Mongoose = require("mongoose");

const commentSchema = new Mongoose.Schema({
    author: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
    }
});

const Comment = Mongoose.model("Comment", commentSchema);

module.exports = Comment;
