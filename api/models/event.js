const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;
const Eventuser = require("../models/user");
//Event schema
const eventSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: { type: Schema.Types.ObjectId, ref: "Eventuser" },
  //username: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Number, required: true },
  eventposts: [{ type: Schema.Types.ObjectId, ref: "Eventuser" }],
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
