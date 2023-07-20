const Expense = require("../Models/expense");

exports.postExpense = (req, res, next) => {
    const { quantity, description, category } = req.body;


    const postData = async () => {
        await req.user.createExpense({ amount: quantity, description, category })
        res.status(200).json({ message: "Expense Created" });
    }
    postData();
};

exports.getExpenses = (req, res, next) => {
    const getData = async () => {
        const expenses = await Expense.findAll({ where: { userId: req.user.id } });
        res.status(201).json(expenses);
    }
    getData();
}

exports.deleteExpense = (req, res, next) => {
    const expenseId = +req.params.expenseId;

    const deleteExpense = async () => {
        try {
            const expenses = await Expense.findAll({ where: { userId: req.user.id } });
            await expenses.forEach(expense => {
                if (expense.id === expenseId) {
                    expense.destroy();
                }

            });
            res.status(200).json({ message: "Expense deleted" })
        } catch (err) {
            console.log(err)
        }
    }
    deleteExpense();
}