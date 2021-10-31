const User = require("../models/user");
const { passportAuthenticate } = require("../middleware/ensureAuth");
 
const findUserById = async (id) => {
  try {
    const user = await User.findById(id, { hash: 0, salt: 0})
        .select('-hash')
        .select("-salt")
        .populate("likes")
        .populate("friends")
        .populate({ path: "posts", populate: [{path: "author"}] });
  
    return await user;
  } catch (error) {
    console.log(error);
  }
}
const getUserByEmail = async (username) => {

  try {
    const user = await User.findOne({ username })
        .select('-hash')
        .select("-salt")
        .populate("likes")
        .populate("friends")
        .populate("posts");
  
    return await user;
  } catch (error) {
    console.log(error);
  }

}

const getUserByUsername = async (name)  => {
  
    try {
      const user = await User.findOne({ name })
        .select('-hash')
        .select("-salt")
        .populate("likes")
        .populate("friends")
        .populate("posts");
  
  
      return await user;
    } catch (error) {
      console.log(error);
    }
  }


  
const createUser = async (req, res, username, password, name, profileUrl, searchName ) => {
    try {
      await User.register({ username, name, profileUrl, searchName }, password, (err, user) => {
        if(err){
          res.json({
            error: {
              genericError: "An unexpected error ocured please try again"
            }
          }); 
          return;         
        }
        passportAuthenticate(req, res);
      });
    
    } catch (error) {
      console.log(error);
    }
}

const loginUser = async (req, res ,username, password) => {
  try {
    const user = new User({
      username,
      password,
  });
  
  await req.login(user, (err) => {
      if(err){
          res.render("login", {error: {genericEror: "An unexpected error occured please try again"}})
          return;
      }
      passportAuthenticate(req, res);
  });
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndRemove(id);
    return await user;
  } catch (error) {
    console.log(error);
  }
}

const updateUser = async (id, fieldsToUpdate) => {
  
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { ...fieldsToUpdate } )
        .populate('posts')
        .populate('likes')
        .populate("friends");
  
      return user;
  } catch (error) {
    console.log(error);
  }
  
};

module.exports = { findUserById, getUserByEmail, getUserByUsername, createUser, deleteUser, updateUser, loginUser };
