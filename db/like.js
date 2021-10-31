const Like = require("../models/like");
const Post = require("../models/post");
const User = require("../models/user");

const createLike = async (userId, postId) => {
    try {
        const like = await new Like({
            userId,
            postId,
        }).save();
    
        //update ikes in the post model
        await Post.findOneAndUpdate( { _id: postId }, { $push : { likes: like._id } } );
    
        //update likes and liked posts in user model
        await User.findOneAndUpdate( { _id: userId }, { $push : { likes: like._id, likedPosts: postId} } );
        
        const l = await Like.findById(like._id).populate("userId").populate("postId").exec();
        
        return await l;

    } catch (error) {
        console.log(error);
    }
}

const deleteLike = async (likeId) => {

    try {
        const like = await Like.findByIdAndRemove(likeId);
    
        //delete like from post
        await Post.findOneAndUpdate( {_id: like.postId }, { $pull: { likes: like._id } } );
        
        //delete likes and likedPost from user
        await User.findOneAndUpdate({ _id: like.userId }, { $pull: { likes: like._id, likedPosts: like.postId } });
    
        return await like;
    } catch (error) {
        console.log(error);
    }

}

const findLikeById = async (id) => {

    try {
        const like = await Like.findById(id);
        return await like;
    } catch (error) {
        console.log(error);
    }

}

const findLikeByUserIdandPostId = async (userId, postId) => {
    try {
        const like = await Like.findOne( { $and: [ { userId: userId }, { postId: postId } ] } );
        return await like;    
    } catch (error) {
        console.log(error);
    }
}



module.exports = { createLike, deleteLike, findLikeById, findLikeByUserIdandPostId };



