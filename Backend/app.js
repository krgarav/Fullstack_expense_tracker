const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();

const authRoutes = require("./Routes/auth");
const sequelize = require("./Util/database")

app.use(bodyParser.json({ limit: '1mb' }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use("/user/", authRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((err) => { console.log(err) })


