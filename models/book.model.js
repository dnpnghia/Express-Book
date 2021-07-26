var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    shopId: String
});

module.exports = mongoose.model("Books", bookSchema);





// var book = new mongoose.Schema({
//     _id: String,
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     author: { type: String, required: true },

// })
// // Biên dịch mô hình từ schema
// module.exports = mongoose.model('books', book);