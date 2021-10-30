const Like = require("../models/like");
const Post = require("../models/post");
const User = require("../models/user");

const createLike = async (userId, postId) => {
    const like = await new Like({
        userId,
        postId,
    }).save();

    //update ikes in the post model
    await Post.findOnedAndUpdate( { _id: postId }, { $push : { likes: like._id } } );

    //update likes and liked posts in user model
    await User.findOnedAndUpdate( { _id: userId }, { $push : { likes: like._id, likedPosts: postId} } );

    await like.populate("postId").execPopulate();
    return await like;
}

const deleteLike = async (likeId) => {
    const like = await Like.findByIdAndRemove(likeId);

    //delete like from post
    await Post.findOneAndUpdate( {_id: like.postId }, { $pull: { likes: like._id } } );
    
    //delete likes and likedPost from user
    await User.findOneAndUpdate({ _id: like.userId }, { $pull: { likes: like._id, likedPosts: like.postId } });

    return await like;
}

const findLikeById = async (id) => {
    const like = await Like.findById(id);
    return await like;
}

const findLikeByUserIdandPostId = async (userId, postId) => {
    const like = await Like.findOne( { $and: [ { userId: userId }, { postId: postId } ] } );
    return await like;    
}



module.exports = { createLike, deleteLike, findLikeById, findLikeByUserIdandPostId };



