var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
    userId: String,
    books: Array,
    isComplete: Boolean
});

module.exports = mongoose.model("Transactions", transactionSchema);

