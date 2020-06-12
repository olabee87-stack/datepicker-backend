const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;
//const Eventuser = require("../models/user");
//Event schema
const eventSchema = new Schema({
  username: {
    type: ObjectId,
    ref: 'Eventuser',
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  likes: { type: Number }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
