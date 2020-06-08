const userController = require("../controllers/user-controller");
const eventController = require("../controllers/event-controller");
const Event = require("../models/event");
const Eventuser = require("../models/user");
const router = require("express").Router();
const redirect = require("./redirect-routes");
const passport = require("passport");
const cors=require('cors');

//ROUTES

//Only logged in users can reach this end point
router.get('/event', redirect.nonLoginUser);
//Only already registered users can reach this end point, if unregistered, redirect to register route
router.get("/login", redirect.loginUser, userController.login);

//router.get("/logout");
router.get('/logout', userController.logout);
//New users are directed here and upon registration, to the login page
router.get("/register", redirect.loginUser, userController.register);

//Add logic to authenticate user
//The data info input by user on the register page is sent/posted to the backend/db
router.post("/register/send", userController.sendRegister);

router.post('/login/send', passport.authenticate('local', {
  successRedirect: '/event',
  failureRedirect: '/login',
}));

module.exports = router;
