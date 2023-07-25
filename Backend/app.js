const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();

const authRoutes = require("./Routes/auth");
const expenseRoutes = require("./Routes/expense");
const purchaseRoutes = require("./Routes/purchase");
const passwordRoutes= require("./Routes/password")
const sequelize = require("./Util/database");
const User = require("./Models/user");
const Expense = require("./Models/expense");
const Order = require("./Models/order");
const Forgotpassword = require("./Models/forgotpassword");
const dotenv = require('dotenv');

dotenv.config();

app.use(bodyParser.json({ limit: '1mb' }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use("/user/", authRoutes);
app.use("/expense/", expenseRoutes);
app.use("/purchase/", purchaseRoutes);
app.use("/password/",passwordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
Forgotpassword.hasMany(User);
User.belongsTo(Forgotpassword);

sequelize
  // .sync({force:true})
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }).catch((err) => { console.log(err) })


