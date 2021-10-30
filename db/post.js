const Like = require("../models/like");
const Post = require("../models/post");
const User = require("../models/user");


const createPost = async (content, userId) => {
    const post = await new Post({
        content,
        author: userId,
    }).save();

    await post
    .populate("author")
    .populate("likes")
    .populate("comments")
    .execPopulate();

    return await post;
}

// const deletePost = async (id) => {
//     const post = await Post.findByIdAndRemove(id);
    
//     await User.findOneAndUpdate( { _id: post.author }, { $pull: {posts: post._id} } );
//     return await post;
// }

const updatePost = async (id, fieldsToUpdate) => {
    const post = await Post.findOneAndUpdate( { _id: id }, { ...fieldsToUpdate } )
                    .populate("author")
                    .populate("likes")
                    .populate("comments")
                    .execPopulate();
                    
    return await post;
}

const findPostById = async (id) => {
    const post = await Post.findById(id);
    return await post;
}


module.exports = { createPost, updatePost, findPostById };

