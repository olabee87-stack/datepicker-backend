const userController = require("../controllers/user-controller");
const eventController = require("../controllers/event-controller");
const Event = require("../models/event");
const router = require("express").Router();
const redirect = require("./redirect-routes");
const passport = require("passport");
const Eventuser = require("../models/user")
const bodyParser = require("body-parser");

//ROUTES
// router.post(
//   "/login/send",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

router.post("/login/send", function(req, res) {
  console.log("user login post request");
  console.log(req.body.username)
  Eventuser.findOne({username: req.body.username}, function(err, user){
      if (err) {
        console.log('post error: ', err)
        }
        else if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
      else if (user) {
        console.log("user found in database");
        return res.json(user);
      }
    })
  })
      // else {
      //   console.log("it's a new user, has to register first")
      //   Eventuser.register(new Eventuser({username: req.body.username }), req.body.password, function(error, user){
      //     if (error) {
      //       console.log("error -> Post request from user");
      //       console.log(error);
      //     } else {
      //       req.logIn(user, function (err) {
      //        if (err) {
      //          return next(err);
      //              }
      //         return res.json(user) // send whatever you want or redirect
      //        });

      //     }
      //   })
      // }


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
router.get("/", redirect.nonLoginUser);

//Only already registered users can reach this end point, if unregistered, redirect to register route
router.get("/login", redirect.loginUser);

router.get("/logout");

//New users are directed here and upon registration, to the login page
router.get("/register", redirect.loginUser);
router.post("/event", eventController.sendEvent);
//Add logic to authenticate user
//The data info input by user on the register page is sent/posted to the backend/db
router.post("/register/send", userController.sendRegister);

// router.post('/login/send', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));
//router.post('/login/send', passport.authenticate('local'));
module.exports = router;
