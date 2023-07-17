const User = require("../Models/user")

exports.authPostData = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    // console.log(name, email, password);
    User.findAll()
        .then((users) => {
            if (users.length > 0) {
                let count = 0
                users.forEach((user) => {
                    if (user.email === email) {
                        count = 1;
                    }
                })
                if (count) {
                    return res.status(301).json({ error: "Email id already exists" });

                } else {
                    return User.create({ name, email, password });
                }

            } else {
                console.log("entered")
                return User.create({ name, email, password });
            }
        })
        .then(() => {
            res.status(200).json({ data: "success" })
        })
        .catch((err) => {
            console.log(err)
        })

}