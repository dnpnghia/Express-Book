var Shops = require("../models/shop.model");
var Books = require("../models/book.model");
var Users = require("../models/user.model");

var cloudinary = require("cloudinary");

module.exports.requireShop = async function(req, res, next) {
  var errors = [];
  
  var user = res.locals.user;
  
  if(!user.shopId) {
    errors.push('You are not a shop! Please register to be a shop to continue')
  }
  
  if(errors.length) {
    res.render('users/index', {
      errors
    })
    return
  }
  res.locals.shopId = user.shopId;
  next();
};

module.exports.uploadCover = async function(req, res, next) {
  if (req.file) {
    cloudinary.config({
      cloud_name: "bobaho",
      api_key: "385244954418116",
      api_secret: "7mFzmR-Y85O9GCmZH9SdJ8l68SQ"
    });
    var avatar = await cloudinary.v2.uploader.upload(
      req.file.path,
      {
        public_id: "cover_" + req.params.bookId,
        folder: "Library/books/" + req.params.bookId,
        width: 500,
        height: 1000,
        crop: "limit"
      },
      function(error, result) {
        res.locals.cover = result.secure_url;
      }
    );
  }

  next();
};