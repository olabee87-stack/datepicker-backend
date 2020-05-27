const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

//Instance of the mongoose schema
const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//updated the schema to use this method
userSchema.plugin(findOrCreate);

//Creating an instance of userSchema declared above(line 9)and using it within your db
const Eventuser = mongoose.model("Eventuser", userSchema);

module.exports = Eventuser;
