const Eventuser = require("../models/user");
const Event = require("../models/event");

module.exports.sendEvent = (req, res) => {
  Event.findOrCreate(
    { eventUserId: Eventuser._id },
    //{ username: req.body.Eventuser.username },
    (err, record, created) => {
      if (err) {
        console.log(
          `An error has occurred when trying to save a new score to the DB: ${err}`
        );
      }
      record.eventposts = req.body.eventposts;

      record
        .save()
        .then((data) => {
          console.log(`Saved new event to the DB: ${data}`);
          res.redirect("/");
        })
        .catch((err) => {
          console.log(
            `An error has occured while saving a new event to DB: ${err}`
          );
          res.redirect("/");
        });
    }
  );
};

// module.exports.clearScore = (req, res) => {
//   Score.deleteMany({}, (err) => {
//     if (err) {
//       console.log("Error encountered while removing scores");
//     } else {
//       console.log("Scores removed. ");
//     }
//   });
//   res.redirect("/");
// };
