const Razorpay = require("razorpay");
const Order = require("../Models/order");
const User = require("../Models/user");
const Expense = require("../Models/expense");
const purchasePremium = async (req, res) => {
    try {
        let rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const amount = 2500;
        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            const sendResponse = async () => {
                await req.user.createOrder({ orderid: order.id, status: "PENDING" })
                return res.status(201).json({ order, key_id: rzp.key_id })
            }
            sendResponse();
        })
    } catch (err) {
        console.log(err)
    }
}

const updateStatus = async (req, res) => {

    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });
        await Promise.all([order.update({ paymentid: payment_id, status: 'SUCCESSFULL' }),
        req.user.update({ ispremiumuser: true })]);
        return res.status(201).json({ success: true, message: "Transaction Successfull" });

    } catch (err) {
        console.log(err);
    }
}

const showLeaderBoard = async (req, res) => {
    try {
        const obj = [];
        const users = await User.findAll();
        const allData = async () => {
            for (const user of users) {
                let expensesSum = 0;
                const expenses = await Expense.findAll({ where: { userId: user.id } });
                expenses.forEach((expense) => {
                    expensesSum += expense.amount;
                });

                let createdObj = { id: user.id, name: user.name, totalExpense: expensesSum };
                obj.push(createdObj);
            }
            let n = obj.length;
            while (n > 0) {
                for (let i = 0; i < obj.length - 1; i++) {
                    if (obj[i].totalExpense < obj[i + 1].totalExpense) {
                        [obj[i], obj[i + 1]] = [obj[i + 1], obj[i]]
                    }
                }
                n--;
            }
            res.json(obj);
        };
        allData();
    } catch (err) {
        console.log(err)
    }
}
module.exports = { purchasePremium, updateStatus, showLeaderBoard };