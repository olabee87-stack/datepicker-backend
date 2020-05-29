const userController = require("../controllers/user-controller");
const eventController = require("../controllers/event-controller");
const Event = require("../models/event");
const router = require("express").Router();
const redirect = require("./redirect-routes");
const passport = require("passport");
const bodyParser = require("body-parser");

//ROUTES
router.post(
  "/login/send",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// //create a new post with the model Event and submit
// router.post("/event", async (req, res) => {
//   const event = new Event({
//     title: req.body.title,
//     username: req.body.username,
//     description: req.body.description,
//     date: req.body.date,
//     eventposts: req.body.eventposts,
//   });

//   // save the post and catch if there is an error
//   try {
//     const savedEvent = await event.save();
//     res.status(201).json(savedEvent);
//   } catch (err) {
//     res.status(404).json({ message: err });
//   }
// });

//Only logged in users can reach this end point
router.get("/", redirect.nonLoginUser, userController.home);

//Only already registered users can reach this end point, if unregistered, redirect to register route
router.get("/login", redirect.loginUser, userController.login);

router.get("/logout", userController.logout);

//New users are directed here and upon registration, to the login page
router.get("/register", redirect.loginUser, userController.register);
// router.post("/event", eventController.sendEvent);
//Add logic to authenticate user
//The data info input by user on the register page is sent/posted to the backend/db
router.post("/register/send", userController.sendRegister);

module.exports = router;
