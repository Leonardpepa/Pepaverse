const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/like");

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


router.post("/like", async (req, res) => {
  const postId = req.body.postId;

  Post.findById(postId, async (err, post) => {
    if(!err){
       Like.findOne({$and: [{userId: req.user._id},{postId: postId}]}, async (err, likeFound) => {
        if(likeFound){
          post.likes.pull(likeFound._id);
          req.user.likedPosts.pull(post._id);
          await post.save();
          await req.user.save();
          Like.findByIdAndDelete(likeFound._id, (err, result) => {
            if(!err){
              res.json({
                n: post.likes.length,
                message: "Like Removed",
                ok: true,
                liked: false,
              });
            }
          });
        }else{
          const newLike = new Like({
            userId: req.user._id,
            postId: post._id,
          });
          await newLike.save();
          req.user.likedPosts.push(post._id);
          await req.user.save();
          post.likes.push(await newLike._id);
          await post.save();
          res.json({
            n: post.likes.length,
            message: "Like Added",
            ok: true,
            liked: true,
          });
        }
      });
    }
  });
});


module.exports = router;
