const express = require("express");

const router = express.Router();

const purchaseController = require("../Controllers/purchase");
const middleware = require("../Middleware/auth")

router.get("/premium", middleware, purchaseController.purchasePremium);
router.post("/updateTransactionStatus",middleware,purchaseController.updateStatus);

module.exports = router;