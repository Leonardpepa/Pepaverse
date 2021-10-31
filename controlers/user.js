
const {updateUser} = require("../db/user");

const usercontroller = {
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
    }
}


module.exports = usercontroller;