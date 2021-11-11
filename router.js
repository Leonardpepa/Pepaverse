const router = require("express").Router();
const passport = require("passport");
const { ensureAuth } = require("./middleware/ensureAuth");
const likeController = require("./controlers/like");
const postController = require("./controlers/post");
const pageController = require("./controlers/page");
const authController = require("./controlers/auth");
const userController = require("./controlers/user");





router.get("/", pageController.home);
router.get("/login", pageController.login);
router.get("/register", pageController.register);
router.get("/profile/:userid", ensureAuth, pageController.profile);
router.post("/users/update/:userid", ensureAuth,userController.update);

router.get("/auth/google", authController.google);

router.get("/auth/google/home", authController.googleCallback);

router.get("/auth/logout", authController.logout);

router.post("/auth/register", authController.register);

router.post("/auth/login", authController.login);




//like post router
router.post('/users/like', ensureAuth, likeController.create);
router.delete("/users/like", ensureAuth, likeController.delete);

//upload a post
router.post("/users/post", ensureAuth, postController.create);

//search
router.post("/users/search", ensureAuth, userController.search);











module.exports = router;