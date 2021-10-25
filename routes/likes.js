const router = require("express").Router();
const Post = require("../models/post");
const Like = require("../models/like");

router.post("/:postid", (req, res, next) => {
  //accessing all likes in the post
  //checks if the usersId exists
  //if true it means we already like the post so we have to remove the like
  //if false we have to like the post
  //we store the like if it exists in the variable likeToDelete

  const user = req.user;
  let likeToDelete;
  let likesCount;

  Post.findOne({ _id: req.params.postid }, (err, postFound) => {
    if (err) {
      throw err;
    }

    likesCount = postFound.likes.length;

    postFound.likes.forEach((like) => {
      if (like.userId.toString() === user._id.toString()) {
        likeToDelete = like;
        return;
      }
    });

    if (likeToDelete) {
      postFound.likes.pull(likeToDelete);
      Like.findByIdAndDelete(likeToDelete._id, (err, result) => {
        if (!err) {
          postFound.save((err) => {
            if (!err) {
              res.json({
                n: postFound.likes.length,
                liked: false,
              });
            }
          });
        }
      });
    } else {
      Like.create(
        {
          postId: req.params.postid,
          userId: user._id,
          username: user.name,
        },
        (err, newLike) => {
          if (!err) {
            postFound.likes.push(newLike);
            postFound.save((err) => {
              if (!err) {
                res.json({
                  n: postFound.likes.length,
                  liked: true,
                });
              }
            });
          }
        }
      );
    }
  });
});

module.exports = router;
