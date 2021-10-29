const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const Request = require("../models/request");
const  { io } = require("../server.config");

router.post("/update/:userid", (req, res) => {
  let { description, profileUrl } = req.body;
  const userid = req.params.userid;

  if (description === "") {
    description = "Description is not provided";
  }

  if (profileUrl === "") {
    profileUrl = "/default-profile.jpg";
  }

  User.findOneAndUpdate(
    { _id: userid },
    {
      $set: {
        description: description,
        profileUrl: profileUrl,
      },
    },
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      }
      if (user) {
        res.redirect("/profile/" + user._id);
      }
    }
  );
});

router.post("/post", (req, res) => {
  const content = req.body.postTextContent;
  const author = req.user._id;
  
  const post = new Post({
    content,
    author,
    createdAt: new Date(),
  });

  post.save((err) => {
    if (err) {
      console.log(err);
    }
    req.user.posts.push(post._id);
    req.user.save((err) => {
      if (!err) {
        res.redirect("/");
      }
    });
  });
});

router.post("/search", (req, res, next) => {
  const { search } =  req.body;
  if(!search){
    next();
    return;
  }

  User.find({ searchName : { $regex :'.*' + search.toLowerCase() + ".*"} },{} ,(err, found) => {
    if(!err){
      res.json({
        result: found
      });
    }
  }).limit(5);

});

module.exports = router;
