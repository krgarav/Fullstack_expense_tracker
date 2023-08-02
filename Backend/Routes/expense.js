const express = require("express");

const router = express.Router();

const expenseController = require("../Controllers/expense")
const authMiddleware = require("../Middleware/auth");

router.get("/get-expenses/:limit", authMiddleware, expenseController.getExpenses);

router.get("/get-expense-count", authMiddleware, expenseController.getExpensesCount);

router.post("/add-expense", authMiddleware, expenseController.postExpense);

router.get("/download", authMiddleware, expenseController.downloadExpense);

router.get("/show-download", authMiddleware, expenseController.allDownloadedExpenses);

router.delete("/delete-expense/:expenseId", authMiddleware, expenseController.deleteExpense);


module.exports = router;