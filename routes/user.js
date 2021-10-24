const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");

router.post("/update/:userid", (req, res) => {
  if (req.isUnauthenticated()) {
    res.redirect("/");
  }

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

router.post("/post/:userid", (req, res) => {
  if (req.isUnauthenticated()) {
    res.redirect("/");
    return;
  }

  const content = req.body.postTextContent;
  const authorId = req.params.userid;

  const post = new Post({
    content,
    authorId,
    author: req.user.name,
    authorProfileUrl: req.user.profileUrl,
    createdAt: new Date(),
  });

  post.save((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
