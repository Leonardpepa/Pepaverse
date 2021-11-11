
const { updateUser } = require("../db/user");
const { searchUsers } = require("../db/search");

const userController = {
    update: async (req, res, next) => {
        let {profileUrl, description } = req.body;
        if(description === ""){
            description = "No description is provided";
        }

        if(profileUrl === ""){
            profileUrl = "/default-profile.jpg";
        }

        const user = await updateUser(req.user._id, {description, profileUrl});
        if(await user){
            res.redirect("/profile/" + req.user._id);
        }
    },
    search: async (req, res, next) => {
        try {
            const result = await searchUsers(req.body.search);
            await res.json(result);
        } catch (error) {
            console.log(error);
        }
    },
}


module.exports = userController;