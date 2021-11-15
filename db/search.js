const User = require("../models/user");

const searchUsers = async (searchQuery) => {
  try {
    if (!searchQuery) {
      return [];
    }
    const users = await User.find({
      searchName: { $regex: ".*" + searchQuery.toLowerCase() + ".*" },
    }).limit(5);
    return await users;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { searchUsers };
