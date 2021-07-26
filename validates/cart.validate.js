var Sessions = require("../models/sessions.model");

module.exports.validateCart = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  var errors = [];
  
  var session = await Sessions.findOne({ _id : sessionId});
  var cart = session.cart;
  var count = 0;
  for ( var book of cart) {
    count ++;
  }
  
  if(!count) {
    errors.push('Empty cart ! can\'t hire anything')
    res.render('cart', {
      errors,
      books : []
    })
    return
  }
  
  next();
}