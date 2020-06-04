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
    //eventUserId: Eventuser._id,
    title: req.body.title,
    username: req.body.username,
    description: req.body.description,
    date: req.body.date,
    //eventposts: req.body.eventposts,
  });

  // save the post and catch if there is an error
  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
    console.log(savedEvent);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});
router.post("/event", eventController.sendEvent);


//code to get all events
router.get("/event", async (req, res) => {
  try {
    // return all the posts or can make a limit
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.json({ message: err });
  }
});
//code to get one event
router.get("/event/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    res.json(event);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

//delete the event
router.delete("/:eventId", async (req, res) => {
  try {
    const removeEvent = await Event.deleteOne({ _id: req.params.eventId });
    res.json(removeEvent);
  } catch (err) {
    //res.json({ message: err });
    res.status(204).json({ message: err });
  }
});
// update the event
router.patch("/:eventId", async (req, res) => {
  try {
    const updateEvent = await Event.updateOne(
      { _id: req.params.eventId },
      {
        $set: {
          title: req.body.title,
    username: req.body.username,
    description: req.body.description,
    date: req.body.date,
    //eventposts: req.body.eventposts,
        },
      }
    );
    res.json(updateEvent);
  } catch (err) {
    //res.json({ message: err });
    res.status(404).json({ message: err });
  }
});
module.exports = router;
