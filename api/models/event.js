const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;
const Eventuser = require("../models/user");
//Event schema
const eventSchema = new Schema({
 // _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, ref: "Eventuser" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  //eventUserId: { type: String, ref: "Eventuser" },
  eventposts: [{ type: Schema.Types.ObjectId, ref: "Eventuser" }],
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
