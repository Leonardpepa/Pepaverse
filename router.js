const router = require("express").Router();
const passport = require("passport");
const { ensureAuth } = require("./middleware/ensureAuth");
const likeController = require("./controlers/like");
const postController = require("./controlers/post");
const pageController = require("./controlers/page");
const authController = require("./controlers/auth");
const userController = require("./controlers/user");
const commentController = require("./controlers/comment");
const notificationController = require("./controlers/notification");
const friendshipController = require("./controlers/friendship");

router.get("/", pageController.home);
router.get("/login", pageController.login);
router.get("/register", pageController.register);
router.get("/profile/:userid", ensureAuth, pageController.profile);
router.get("/all", ensureAuth, pageController.all);

router.post("/users/update/:userid", ensureAuth, userController.update);

router.get("/auth/google", authController.google);

router.get("/auth/google/home", authController.googleCallback);

router.get("/auth/logout", authController.logout);

router.post("/auth/register", authController.register);

router.post("/auth/login", authController.login);

//like post router
router.post("/users/like", ensureAuth, likeController.create);
router.delete("/users/like", ensureAuth, likeController.delete);

//comment post
router.post("/users/comment", ensureAuth, commentController.create);
router.delete("/users/comment", ensureAuth, commentController.delete);

//update comment
router.post("/users/comment/update", ensureAuth, commentController.update);

//get comments from post
router.get(
  "/post/:postId/comment",
  ensureAuth,
  commentController.getCommentsByPostId
);

//upload a post
router.post("/users/post", ensureAuth, postController.create);
router.delete("/users/post", ensureAuth, postController.delete);

//update post
router.post("/users/post/update", ensureAuth, postController.update);

//search
router.post("/users/search", ensureAuth, userController.search);

router.post("/notification", ensureAuth, notificationController.create);

router.post("/friendship/accept", ensureAuth, friendshipController.accept);

router.delete("/friendship", ensureAuth, friendshipController.delete);

router.delete("/friendship/undo", ensureAuth, friendshipController.undo);

module.exports = router;
