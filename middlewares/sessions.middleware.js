var Sessions = require("../models/sessions.model");

module.exports.requireSession = async function(req, res, next) {
  var cookie = req.signedCookies;
  if (!cookie.sessionId) {
    var session = {
      cart: []
    };

    var result = await Sessions.create(session);

    res.cookie("sessionId", result.id, {
      signed: true
    });

    res.redirect("back");
  }

  res.locals.sessionId = cookie.sessionId;

  next();
};

module.exports.count = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;

  var session = await Sessions.findOne({ _id: sessionId });

  //count total books in cart
  var totalInCart = 0;
  if (session) {
    for (var book of session.cart) {
      totalInCart += 1;
    }
  }
  res.locals.total = totalInCart;
  next();
};