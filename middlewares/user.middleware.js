var cloudinary = require("cloudinary");


var Users = require("../models/user.model");

var sessionsMiddleware = require("../middlewares/sessions.middleware");

module.exports.requireAuth = async function (req, res, next) {

  var userId = req.signedCookies.userId;
  if (!userId) {
    res.redirect("/auth/login");
    return;
  }

  var user = await Users.findOne({ _id: userId });
  if (!user) {
    res.redirect("/auth/login");
    return;
  }

  if (!req.signedCookies.sessionId) {
    res.redirect("/auth/login");
  }

  if (!user.sessionId) {
    user.sessionId = req.signedCookies.sessionId;
  }

  res.cookie("sessionId", user.sessionId, {
    signed: true
  });

  try {
    var result = await Users.updateOne(
      { _id: userId },
      { $set: { sessionId: req.signedCookies.sessionId } }
    );
  } catch (error) {
    console.log(error);
  }
  // sessionsMiddleware.count();
  res.locals.user = user;

  next();
};

module.exports.uploadImg = async function (req, res, next) {


  if (req.file) {
    cloudinary.config({
      cloud_name: "bobaho",
      api_key: "385244954418116",
      api_secret: "7mFzmR-Y85O9GCmZH9SdJ8l68SQ"
    });
    var avatar = await cloudinary.v2.uploader.upload(
      req.file.path,
      {

        public_id: "avatar_" + res.locals.userId,
        folder: "Library/userAvatar/" + req.params.userId,
        width: 1000,
        height: 1000,
        crop: "limit"
      },
      function (error, result) {
        res.locals.avatar = result.secure_url;
      }
    );

  } else {

    res.locals.avatar =
      "https://res.cloudinary.com/bobaho/image/upload/c_scale,h_1000,w_1000/v1627197442/Library/userAvatar/jacob-noble-mikasa-01-01_ryitz0.jpg";
  }


  next();


};