const Expense = require("../Models/expense");
const sequelize = require("../Util/database");

exports.postExpense = async (req, res, next) => {
    const { quantity, description, category } = req.body;

    const t = await sequelize.transaction();

    const postData = async () => {
        try {
            const totalAmount = req.user.totalExpense += +quantity;
            await req.user.createExpense({ amount: quantity, description, category }, { transaction: t });
            await req.user.update({ totalExpense: totalAmount }, { transaction: t })
            await t.commit();
            res.status(200).json({ message: "Expense Created" });
        } catch (err) {
            await t.rollback();
            res.status(500).json({ err: err })
            console.log(err);
        }
    }
    postData();
};

exports.getExpenses = (req, res) => {
    const getData = async () => {
        const expenses = await Expense.findAll({ where: { userId: req.user.id } });
        res.status(201).json(expenses);
    }
    getData();
}

exports.deleteExpense = (req, res) => {
    const expenseId = +req.params.expenseId;

    const deleteExpense = async () => {
        const t = await sequelize.transaction();

        try {
            const toBeDeletedExpense = await Expense.findOne({ where: { userId: req.user.id, id: expenseId } }, { transaction: t });
            const amount = req.user.totalExpense - +toBeDeletedExpense.amount;
            await req.user.update({ totalExpense: amount }, { transaction: t });
            await toBeDeletedExpense.destroy();
            await t.commit();
            res.status(200).json({ message: "Expense deleted" });
        } catch (err) {
            await t.rollback();
            res.status(500).json({ err: err });
            console.log(err)
        }
    }
    deleteExpense();
}