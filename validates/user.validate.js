var Users = require("../models/user.model");

module.exports.validateName = async function(req, res, next) {
  var name = req.body.name;
  var errors = [];
  
  if(name) {
    if(name.split('').length > 30) {
      errors.push('Invalid Name!');
    }
  }
  
  if(!name) {
      errors.push('Require name!');
  }
  
  if(!req.body.email) {
      errors.push('Require email!');
  }
  
  if(!req.body.password) {
      errors.push('Require password!');
  }
  
  var isEmailExist = await Users.findOne({ email : req.body.email });
  console.log(isEmailExist);
  
  if(isEmailExist) {
    errors.push('This email has used before!');
  }
  
  if(errors.length) {
    res.render('users/createUser', {
      errors
    })
    return
  }
  
  res.locals.email = req.body.email;
  next();
}
