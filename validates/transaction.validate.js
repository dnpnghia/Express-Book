  var Transactions = require("../models/transactions.model");

module.exports.validateId = function(req, res, next) {
  var transactionId = req.params.transactionId;
  var errors = [];
  
  var transaction = Transactions.findOne({ id : transactionId});
  var transactions = Transactions.find();
  if(!transaction) {
    errors.push('Invalid Id!');
  }
  
  if(errors.length) {
    res.render('transactions/index', {
      errors
    })
    return
  }
  
  next();
}