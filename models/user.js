const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  company_name: String,
  city: String,
  state: String,
  zip: Number,
  email: String,
  web: String,
  age: Number
});

var User = mongoose.model("Users", userSchema);

module.exports = {User};
