const User = require("../models/user");

const findUserById = async (id) => {
  const user = await User.findById(id, { hash: 0, salt: 0})
      .select('-hash')
      .select("-salt")
      .populate("likes")
      .populate("likedPosts")
      .populate("friends")
      .populate("posts");

  return await user;
}
const getUserByEmail = async (username) => {
  const user = await User.findOne({ username })
      .select('-hash')
      .select("-salt")
      .populate("likes")
      .populate("likedPosts")
      .populate("friends")
      .populate("posts");

  return await user;
}

const getUserByUsername = async (name)  => {
    const user = await User.findOne({ name })
      .select('-hash')
      .select("-salt")
      .populate("likes")
      .populate("likedPosts")
      .populate("friends")
      .populate("posts");


    return await user;
  }
  
const createUser = async (email, name, password, profileUrl, searchName ) => {
    const user = await User.register({ username, name, profileUrl, searchName }, password);
    return await user;
}

const deleteUser = async (id) => {
    const user = await User.findByIdAndRemove(id);
    return await user;
}

const updateUser = async (id, fieldsToUpdate) => {
    const user = await User.findOneAndUpdate({ _id: id }, { ...fieldsToUpdate } )
      .populate('posts')
      .populate('likes')
      .populate("LikedPosts")
      .populate("friends");

    return user;
};

module.exports = { findUserById, getUserByEmail, getUserByUsername, createUser, deleteUser, updateUser };
