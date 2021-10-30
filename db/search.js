const User = require("../models/user");


const searchUsers = async (searchQuery) => { 
    if(!searchQuery){
        return [];
    }
    const users = await User.find({ searchName : { $regex :'.*' + search.toLowerCase() + ".*"} }).limit(5);
    
    return await users;
}

module.exports = { searchUsers };