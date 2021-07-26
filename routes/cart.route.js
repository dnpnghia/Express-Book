var express = require("express");
var router = express.Router();
var controller = require('../controllers/cart.controller');
var cartValidate = require('../validates/cart.validate');
var usersMiddleware = require("../middlewares/user.middleware");

router.get(
  '/',
  controller.index
);


router.get(
  '/add/:bookId',
  controller.add
);

router.get(
  '/delete/:bookId',
  controller.delete
);

router.get(
  '/hire',
  usersMiddleware.requireAuth,
  cartValidate.validateCart,
  controller.hire
);

module.exports = router;