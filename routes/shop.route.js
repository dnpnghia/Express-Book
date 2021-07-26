var express = require("express");
var multer = require("multer");

var upload = multer({ dest: "./public/uploads/" });

var router = express.Router();
var controller = require("../controllers/shop.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.createPost);


module.exports = router;
