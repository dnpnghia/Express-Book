var bcrypt = require("bcryptjs");

var Users = require("../models/user.model");

module.exports.index = async function (req, res, next) {

  var user = res.locals.user;
  if (user.priority == 1) {
    var users = await Users.find();
  }
  res.render("users/index", {
    user,
    users
  });

};


module.exports.updateProfile = async function (req, res) {
  var userId = req.signedCookies.userId;
  console.log(req.body);
  // var result = await Users.updateOne(
  //   { _id: userId},
  //   {
  //     $set: {
  //       name: res.locals.name,
  //       email: res.locals.mail,
  //     }
  //   }
  // );


  res.redirect("/user/profile");
};

// module.exports.createUserPost = async function(req, res) {
//   req.body.avatar = res.locals.avatar;
//   req.body.priority = "3"; //1 == Admin . 2 == staff . 3 == user . 4 == banned

//   var salt = bcrypt.genSaltSync(10);
//   var hash = bcrypt.hashSync(req.body.password, salt);

//   req.body.password = hash;

//   var result = await Users.create(req.body);

//   res.redirect("/users");
// };

module.exports.updateUser = async function(req, res) {
  var userId = req.params.userId;
  var user = await Users.findOne({ _id: userId });
  res.render("users/updateUser", {
    user
  });
};

// module.exports.updateUserPost = async function(req, res) {
//   var userId = req.params.userId;
//   var name = req.body.name;

//   var result = await Users.updateOne({ _id: userId }, req.body);

//   res.redirect("/user");
// };

// module.exports.deleteUser = async function(req, res) {
//   var userId = req.params.userId;

//   var result = await Users.deleteOne({ _id: userId });

//   res.redirect("/users");
// };

module.exports.profile = async function (req, res) {
  var userId = req.signedCookies.userId;

  res.render("users/profile", {
    user: await Users.findOne({ _id: userId })
  });
};

module.exports.avatar = async function (req, res) {
  var userId = req.signedCookies.userId;

  res.render("users/changeAvatar", {
    user: await Users.findOne({ _id: userId })
  });
};

module.exports.avatarPost = async function (req, res) {
  var result = await Users.updateOne(
    { _id: req.signedCookies.userId },
    { avatar: res.locals.avatar }
  );

  res.redirect("/user/profile");
};