var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
    cart: Array
});

module.exports = mongoose.model("Sessions", sessionSchema);

