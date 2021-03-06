const User = require("../models/user");
const { passportAuthenticateLocal } = require("../middleware/ensureAuth");

const findUserById = async (id) => {
  try {
    const user = await User.findById(id, { hash: 0, salt: 0 })
      .select("-googleId")
      .select("-hash")
      .select("-salt")
      .populate("likes")
      .populate({
        path: "notifications",
        populate: [{ path: "author", select: ["name"] }],
      })
      .populate({
        path: "posts",
        options: {
          sort: {
            createdAt: "desc",
          },
        },
        populate: [
          {
            path: "author",
            select: ["name", "profileUrl"],
          },
          {
            path: "comments",
            options: {
              sort: {
                createdAt: "desc",
              },
            },
            populate: [
              {
                path: "author",
                select: ["name", "profileUrl"],
              },
            ],
          },
        ],
      });
    return await user;
  } catch (error) {
    console.log(error);
  }
};
const getUserByEmail = async (username) => {
  try {
    const user = await User.findOne({ username })
      .select("-googleId")
      .select("-hash")
      .select("-salt")
      .populate("likes")
      .populate({
        path: "notifications",
        populate: [{ path: "author", select: ["name"] }],
      })
      .populate({
        path: "posts",
        options: {
          sort: {
            createdAt: "desc",
          },
        },
        populate: [
          {
            path: "author",
            select: ["name", "profileUrl"],
          },
          {
            path: "comments",
            populate: [
              {
                path: "author",
                select: ["name", "profileUrl"],
              },
            ],
          },
        ],
      });

    return await user;
  } catch (error) {
    console.log(error);
  }
};

const getUserByUsername = async (name) => {
  try {
    const user = await User.findOne({ name })
      .select("-googleId")
      .select("-hash")
      .select("-salt")
      .populate("likes")
      .populate({
        path: "notifications",
        populate: [{ path: "author", select: ["name"] }],
      })
      .populate({
        path: "posts",
        options: {
          sort: {
            createdAt: "desc",
          },
        },
        populate: [
          {
            path: "author",
            select: ["name", "profileUrl"],
          },
          {
            path: "comments",
            populate: [
              {
                path: "author",
                select: ["name", "profileUrl"],
              },
            ],
          },
        ],
      });
    return await user;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (
  req,
  res,
  username,
  password,
  name,
  profileUrl,
  searchName
) => {
  try {
    await User.register(
      { username, name, profileUrl, searchName },
      password,
      (err, user) => {
        if (err) {
          res.redirect("/register?e=" + err.message);
          return;
        }
        passportAuthenticateLocal(req, res);
      }
    );
  } catch (error) {
    res.redirect("/register?e=An unexpected error ocured please try again");
  }
};

const loginUser = async (req, res, username, password) => {
  try {
    const user = new User({
      username,
      password,
    });

    await req.login(user, (err) => {
      if (err) {
        res.redirect("/login?e=An unexpected error ocured please try again");
        return;
      }
      passportAuthenticateLocal(req, res);
    });
  } catch (error) {
    res.redirect("/login?e=An unexpected error ocured please try again");
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndRemove(id);
    return await user;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (id, fieldsToUpdate) => {
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { ...fieldsToUpdate })
      .select("-googleId")
      .select("-hash")
      .select("-salt")
      .populate("likes")
      .populate({
        path: "notifications",
        populate: [{ path: "author", select: ["name"] }],
      })
      .populate({
        path: "posts",
        options: {
          sort: {
            createdAt: "desc",
          },
        },
        populate: [
          {
            path: "author",
            select: ["name", "profileUrl"],
          },
          {
            path: "comments",
            populate: [
              {
                path: "author",
                select: ["name", "profileUrl"],
              },
            ],
          },
        ],
      });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (userId) => {
  try {
    const users = await User.find({
      _id: { $nin: [userId] },
    });

    if (!users.length) {
      return [];
    }
    return users;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findUserById,
  getUserByEmail,
  getUserByUsername,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  getAllUsers,
};
