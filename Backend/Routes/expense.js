const express = require("express");

const router = express.Router();

const expenseController = require("../Controllers/expense")
const authMiddleware = require("../Middleware/auth");

router.get("/get-expenses", authMiddleware, expenseController.getExpenses)

router.post("/add-expense",authMiddleware, expenseController.postExpense);

router.delete("/delete-expense/:expenseId",authMiddleware, expenseController.deleteExpense);


module.exports = router;