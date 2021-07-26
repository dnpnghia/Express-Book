var shortid = require("shortid");

var Sessions = require("../models/sessions.model");
var Books = require("../models/book.model");
var Transactions = require("../models/transactions.model");

module.exports.index = async function (req, res) {
  var session = await Sessions.findOne({ _id: req.signedCookies.sessionId });
  var cart = session.cart;

  //books array
  var books = [];
  for (var book of cart) {
    var bookk = await Books.findOne({ _id: book });
    books.push(bookk);
  }

  res.render("cart/index", {
    books
  });
};

module.exports.add = async function (req, res) {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  var session = await Sessions.findOne({ _id: sessionId });
  //add book to cart
  var cart = session.cart;
  var flag = 1;
  cart.forEach(element => {
    if (element === bookId)
      flag = 0;
  });
  if (flag)
    cart.push(bookId);

  var result = await Sessions.updateOne({ _id: sessionId }, { cart: cart });

  res.redirect("/books");
};

module.exports.delete = async function (req, res) {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;

  var session = await Sessions.findOne({ _id: sessionId });

  //add book to cart
  var cart = session.cart;
  var newCart = cart.filter(function (book) {
    return book != bookId;
  });

  var result = await Sessions.updateOne({ _id: sessionId }, { cart: newCart });
  res.redirect("/cart");
};

module.exports.hire = async function (req, res) {
  var success = ["Success hired books, check your transaction !"];

  var sessionId = req.signedCookies.sessionId;
  var session = await Sessions.findOne({ _id: sessionId });
  var cart = session.cart;

  var userId = req.signedCookies.userId;
  var transaction = {
    userId: userId,
    books: cart,
    isComplete: false
  };

  await Transactions.create(transaction);

  cart = [];
  await Sessions.updateOne({ _id: sessionId }, { cart: cart });

  res.render("cart/index", {
    success,
    books: cart
  });
};