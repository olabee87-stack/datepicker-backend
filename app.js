const express = require("express");
const app = express();
const path = require("path");
const PORT = 8010;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./api/routes/user-routes");

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
app.set("view engine", "ejs");
app.set("views", __dirname + "/api/views");

// Body parser middlewaare
app.use(bodyParser.urlencoded({ extended: "false" }));

//Route
app.use("/", userRoutes);

//FRONTEND
const FRONTEND_ORIGIN = "http://localhost:3000";

//Localhost port
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
