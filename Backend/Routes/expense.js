const express = require("express");

const router = express.Router();

const expenseController = require("../Controllers/expense")


router.get("/get-expenses", expenseController.getExpenses)
router.post("/add-expense", expenseController.postExpense);
router.delete("/delete-expense/:expenseId",expenseController.deleteExpense);


module.exports = router;