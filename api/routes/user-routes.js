const userController = require("../controllers/user-controller");
const eventController = require("../controllers/event-controller");
const Event = require("../models/event");
const Eventuser = require("../models/user");
const router = require("express").Router();
const redirect = require("./redirect-routes");
const passport = require("passport");
const bodyParser = require("body-parser");
const chalk = require("chalk");

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

//ROUTES

//Only logged in users can reach this end point
router.get("/", redirect.nonLoginUser);

//Only already registered users can reach this end point, if unregistered, redirect to register route
router.get("/login", redirect.loginUser, userController.home);

router.get("/logout");

//New users are directed here and upon registration, to the login page
router.get("/register", redirect.loginUser);
// router.post("/event", eventController.sendEvent);
//Add logic to authenticate user
//The data info input by user on the register page is sent/posted to the backend/db
router.post("/register/send", userController.sendRegister);

// router.post(
//   "/login/send",
//   passport.authenticate("local", {
//     successRedirect: "http://localhost:3000",
//     failureRedirect: "/login",
//   })
// );

router.post("/login/send", function (req, res) {
  Eventuser.findOne(
    { username: req.body.username, password: req.body.password },
    function (err, user, pass) {
      if (err) {
        console.log("There is an error posting this request: ", err);
      } else if (!user && !pass) {
        console.log("The username and password is incorrect");
        return res.status(404).send({ message: "User Not found." });
      } else {
        //console.log(user);
        console.log(
          `The username: "${user.username}" with Password: "${user.password}" has logged in`
        );
        console.log("User found in database");
        return res.json(user);
      }
    }
  );
});

module.exports = router;

// passport.authenticate("local", {
//   successRedirect: "http://localhost:3000",
//   failureRedirect: "/login",
// });
