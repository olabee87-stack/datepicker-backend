const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
//const PORT = 8010;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./api/routes/user-routes");
const eventRoutes = require("./api/routes/event-routes");
const initPassport = require("./init-passport"); //importing module
const cors=require('cors');
//const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//app.use(cors())
app.use(
  cors({
    origin: 'https://datepicker-frontend.herokuapp.com/event',
    credentials: true,
  })
);
//Database connection
mongoose.connect(
  "mongodb+srv://olabisi:coding@node-projects-qyzht.mongodb.net/grocerydb?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

//Error check
db.on("error", (err) => {
  console.log(`Error occured while connecting to DB:${err}`);
});

//Connection check
db.on("open", () => {
  console.log(`Successfully connected to the DB`);
});

//View engine
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/api/views");

// Body parser middlewaare
//app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

//From init-passport.js
initPassport(passport);

//Route
app.use("/", userRoutes);
app.use("/", eventRoutes);

//FRONTEND
const FRONTEND_ORIGIN = "https://datepicker-frontend.herokuapp.com/event";
//allow chrome to do ajax call
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
})
//parse json bodies
//app.use(express.json());

//Localhost port
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
