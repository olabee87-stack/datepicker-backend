const userController = require("../controllers/user-controller");
const LocalStrategy = require("passport-local").Strategy;
const router = require("express").Router();
const redirect = require("./redirect-routes");
const passport = require("passport");

router.post(
  "/login/send",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

//ROUTES

//Only logged in users can reach this end point
//router.get("/", redirect.nonLoginUser, userController.home);
router.get("/", (req, res) => {
  res.send("Hi there");
});

//Only already registered users can reach this end point, if unregistered, redirect to register route
//router.get("/login", redirect.loginUser, userController.login);
router.get("/login", (req, res) => {
  res.send("Logged in");
});

//router.get("/logout", userController.logout);
router.get("/logout", (req, res) => {
  res.send("Logged out");
});

//New users are directed here and upon registration, to the login page
//router.get("/register", redirect.loginUser, userController.register);
router.get("/register", userController.register);

//Add logic to authenticate user
//The data info input by user on the register page is sent/posted to the backend/db
//router.post("/register/send", userController.sendRegister);
router.post("/register/send", userController.sendRegister);

//router.post("/score/send", scoreController.sendScore);

//router.get("/score/clear", scoreController.clearScore);
module.exports = router;
