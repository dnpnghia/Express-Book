var mongoose = require("mongoose");

var shopSchema = new mongoose.Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Shops", shopSchema);
