const mongoose = require("mongoose");
const voting = require("mongoose-voting");
//const Event = require("../models/event");
//const findOrCreate = require("mongoose-findorcreate");
//const findOne = require("mongoose-findone");
const Schema = mongoose.Schema;

//Instance of the mongoose schema
const userSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  //eventposts: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

// //Event schema
// const eventSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   username: { type: Schema.Types.ObjectId, ref: "Eventuser" },
//   //username: { type: String, required: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   date: { type: Number, required: true },
//   eventposts: [{ type: Schema.Types.ObjectId, ref: "Eventuser" }],
// });

//updated the schema to use this method
//userSchema.plugin(findOrCreate);
//userSchema.plugin(findOne);
//Creating an instance of userSchema declared above
const Eventuser = mongoose.model("Eventuser", userSchema);
// const Event = mongoose.model("Event", eventSchema);

module.exports = Eventuser;
// module.exports = Event;
