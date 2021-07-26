var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  priority: String,
  sessionId : String,
  shopId : String
});

module.exports = mongoose.model("User", userSchema,"User");
