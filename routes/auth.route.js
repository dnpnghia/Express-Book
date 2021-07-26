var express = require("express");
var multer = require("multer");

var upload = multer({ dest: "./public/uploads/" });

var router = express.Router();

var usersMiddleware = require("../middlewares/user.middleware");
var validate = require("../validates/user.validate");

var controller = require('../controllers/auth.controller');

router.get('/login', controller.login);

router.get('/logout', controller.logout);

router.post('/login', controller.loginPost);

router.get('/signUp', controller.signUp);

router.post('/signUp',
    upload.single("avatar"),
    validate.validateName,
    usersMiddleware.uploadImg,
    controller.signUpPost,
 
);


module.exports = router;