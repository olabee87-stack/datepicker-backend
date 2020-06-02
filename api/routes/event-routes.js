const eventController = require("../controllers/event-controller");
const userController = require("../controllers/user-controller");
const Event = require("../models/event");
const Eventuser = require("../models/user");
const router = require("express").Router();
const redirect = require("./redirect-routes");
const passport = require("passport");
const bodyParser = require("body-parser");

//create a new post with the model Event and submit
router.post("/event", async (req, res) => {
  const event = new Event({
    eventUserId: Eventuser._id,
    title: req.body.title,
    username: req.body.username,
    description: req.body.description,
    date: req.body.date,
    eventposts: req.body.eventposts,
  });

  // save the post and catch if there is an error
  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});
router.post("/event", eventController.sendEvent);

module.exports = router;
