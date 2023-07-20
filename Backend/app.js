const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();

const authRoutes = require("./Routes/auth");
const expenseRoutes = require("./Routes/expense");
const sequelize = require("./Util/database");
const User = require("./Models/user");
const Expense = require("./Models/expense");

app.use(bodyParser.json({ limit: '1mb' }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use("/user/", authRoutes);
app.use("/expense/", expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
// .sync({force:true})
.sync()
.then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((err) => { console.log(err) })


