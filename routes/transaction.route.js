var express = require("express");
var router = express.Router();
var controller = require('../controllers/transaction.controller');

var validate = require('../validates/transaction.validate');

router.get(
  "/",
  controller.index
)

router.get(
  "/create",
  controller.createTransaction
)

router.post(
  "/create",
  controller.createTransactionPost
)

router.get(
  "/:transactionId/complete",
  validate.validateId,
  controller.completeTransaction
)


module.exports = router;