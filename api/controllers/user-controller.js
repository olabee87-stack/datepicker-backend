const express = require("express");
const router = express.Router();
const path = require("path");
const Event = require("../models/user");
const Eventuser = require("../models/user");

module.exports.home = (req, res) => {
  return res.json("http://localhost:3000/");
};

// module.exports.login = (req, res) => {
//   //res.render("pages/login");
//   res.render("/")
// };

// module.exports.logout = (req, res) => {
//   req.logout();
//   //res.redirect("/login");
//   res.redirect("/")
// };

// module.exports.register = (req, res) => {
//   //res.render("pages/register");
//   res.render("")
// };

// module.exports.sendRegister = (req, res) => {
//   Eventuser.findOrCreate(
//     { username: req.body.username },
//     (err, record, created) => {
//       if (err) {
//         console.log(`An error has occured ${err}`);
//       }
//       if (created) {
//         record.firstname = req.body.firstname;
//         record.lastname = req.body.lastname;
//         record.username = req.body.username;
//         record.email = req.body.email;
//         record.password = req.body.password;

//         record
//           .save()
//           .then((data) => {
//             console.log(`Saved new user to DB: ${data}`);
//             //res.redirect("/");
//           })
//           .catch((err) => {
//             console.log(`Error occured while registering new user: ${err}`);
//             // res.redirect("/");
//           });
//       } else {
//         console.log(`Record with username found ${req.body.username} found.`);
//         //Send this to client if username has already been taken
//         res.send(
//           "Username has been registerd to another account. Please choose another."
//         );
//       }
//     }
//   );
// };



// module.exports.sendRegister = (req, res) => {
//   Eventuser.findOne(
//     { username: req.body.username },
//     (err, user) => {
//       if (err) {
//         console.log(`An error has occured while registering new user ${err}`);
//       } 
//       if (!user) {
//         user = new Eventuser({
//           firstname: req.body.firstname,
//           lastname: req.body.lastname,
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//       });
//       user.save()
//       .then((data) => {
//         console.log(`Saved new user to DB: ${data}`);
//        })
//        .catch((err) => {
//       console.log(`Error occured while registering new user: ${err}`);
//        });
//       }
//       if (user) {
//         console.log(`Record with username found ${req.body.username} found.`);
//         //Send this to client if username has already been taken
//         //return res.send(err);
//         return res.status(404).send({ message: "User already exists." });
//       }
//     }
//   );
// };



module.exports.sendRegister = async (req, res) => {
   // Check if this user already exisits
   let user = await Eventuser.findOne({ username: req.body.username });
   if (user) {
       return res.status(400).send('That user already exisits!');
   } else {
       // Insert the new user if they do not exist yet
       user = new Eventuser({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
       });
       await user.save();
       res.send(user);
   }
}
// );
// }


//create a new post with the model Post and submit
// module.exports.sendRegister = (req, res) => {

//   const post = new Eventuser({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   });

//   // save the post and catch if there is an error
//   try {
//     const savedPost = post.save();
//     res.status(201).json(savedPost);
//   } catch (err) {
//     res.status(404).json({ message: err });
//   }
// };
