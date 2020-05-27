const express = require("express");
const router = express.Router();
const path = require("path");
const Eventuser = require("../models/user");

//const Score = require("../models/score-model");

// module.exports.home = (req, res) => {
//   Score.find({}, (err, records) => {
//     if (err) {
//       console.log("Error encountered while fetching score from DB");
//     }
//     if (records.length === 0) {
//       console.log("There is no record of score found from DB. ");
//     }
//     res.render("pages/home", {
//       firstname: req.user.firstname,
//       scores: records,
//     });
//   });
// };

module.exports.login = (req, res) => {
  res.render("pages/login");
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

module.exports.register = (req, res) => {
  res.render("pages/register");
};

module.exports.sendRegister = (req, res) => {
  Eventuser.findOrCreate(
    { username: req.body.username },
    (err, record, created) => {
      if (err) {
        console.log(`An error has occured ${err}`);
      }
      if (created) {
        record.firstname = req.body.firstname;
        record.lastname = req.body.lastname;
        record.username = req.body.username;
        record.email = req.body.email;
        record.password = req.body.password;

        record
          .save()
          .then((data) => {
            console.log(`Saved new user to DB: ${data}`);
            res.redirect("/login");
          })
          .catch((err) => {
            console.log(`Error occured while registering new user: ${err}`);
            res.redirect("/register");
          });
      } else {
        console.log(`Record with username found ${req.body.username} found.`);
        //Send this to client if username has already been taken
        res.send(
          "Username has been registerd to another account. Please choose another."
        );
      }
    }
  );
};
