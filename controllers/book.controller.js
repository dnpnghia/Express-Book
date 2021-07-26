var shortid = require('shortid');

var Books = require("../models/book.model");
var Shops = require("../models/shop.model");

module.exports.index = async function(req, res, next ) {
  var page = req.query.page || 1;
  var perPage = 6;
  var start = (page-1) * perPage;
  var end = start + perPage;
  var books = await Books.find();
  var shops = [];
  for ( var book of books) {
    var shop = await Shops.findOne({_id : book.shopId});
    shops.push(shop)
  }
  console.log(shops);
  
  res.render('books/index', {
    books : books.slice(start, end),
    page,
    shops,
    x : page*perPage-perPage
  })
}

module.exports.createBook = function(req, res) {
  res.render('books/create', {
  })
}

module.exports.createBookPost = async function(req, res) {
  req.body.image = res.locals.cover;
  req.body.shopId = res.locals.shopId;
  var result = await Books.create(req.body);
  res.redirect('/shops');
}

module.exports.updateBook = async function(req, res) {
  var bookId = req.params.bookId;
  var book = await Books.findOne({ _id : bookId });
  
  res.render('books/update', {
    book,
  })
}

module.exports.updateBookPost = async function(req, res) {
  var bookId = req.params.bookId;
  var newTitle = req.body.title;
  
  var result = await Books.updateOne({ _id : bookId }, req.body);
  
  res.redirect('back');
}

module.exports.deleteBook = async function(req, res) {
  var bookId = req.params.bookId;
  var result = await Books.deleteOne({ _id : bookId});
  res.redirect('back');
}

module.exports.updateBookCover = async function(req, res) {
  var bookId = req.params.bookId;
  
  var book = await Books.findOne({ _id : bookId });
  
  res.render('books/changeCover', {
    book,
  })
}

module.exports.updateBookCoverPost = async function(req, res) {
  var bookId = req.params.bookId;
  
  var result = await Books.updateOne({ _id : bookId }, { image : res.locals.cover });
  
  res.redirect("/books/update/" + req.params.bookId);
}
