var bcrypt = require("bcryptjs");
var Users = require("../models/user.model");

module.exports.login = function(req, res) {
  res.render("auth/login", {});
};

module.exports.loginPost = async function(req, res, next) {
  var errors = [];
  var email = req.body.email;
  var password = req.body.password;

  var user = await Users.findOne({ email : email});
 
  if (!user) {
    errors.push("Wrong email!");
    res.render("auth/login", {
      errors
    });
  }

  var isRightPass = bcrypt.compareSync(password, user.password); // true

  if (!isRightPass) {
    errors.push("Wrong password!");
    res.render("auth/login", {
      errors
    });
  }

  res.cookie("userId", user._id, {
    signed: true
  });
  res.locals.user = user;
 

  res.redirect("/user");
  next();
};

module.exports.logout = function(req, res) {
  res.clearCookie("userId");
  res.clearCookie("sessionId");
  res.redirect("login");
};

module.exports.signUp = function(req, res) {
  res.render("auth/signUp", {});
};

module.exports.signUpPost = async function(req, res) {

  req.body.avatar = res.locals.avatar;
  req.body.priority = "3"; //1 == Admin . 2 == staff . 3 == user . 4 == banned

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  req.body.password = hash;

  var result = await Users.create(req.body);

 
  res.redirect("/user");
};