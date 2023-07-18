const User = require("../Models/user")

exports.authSignupPost = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const postSignup = async () => {
        try {
            const users = await User.findAll();
            const userExists = users.find((user) => user.email === email);
            if (userExists) {
                return res.status(301).json({ error: "Email id already exists" });
            }

            await User.create({ name, email, password });
            res.status(200).json({ data: "success" });
        } catch (err) {
            console.log(err);
        }
    }
    postSignup();
}

exports.authLoginPost = (req, res, next) => {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;
    const postLogin = async () => {
        try {
            let password = "";
            const users = await User.findAll();
            const userExists = users.find((user) => {
                password = user.password;
                return user.email === enteredEmail;
            });
            if (userExists) {
                if (password === enteredPassword) {
                    return res.status(200).json({ data: "user successfully logged in" });

                } else {
                    return res.status(401).json({ error: "Entered password is wrong" });
                }
            } else {
                return res.status(404).json({ error: "Email id  does not exists" });
            }
            
        } catch (err) {
            console.log(err);
        }
    }
    postLogin();
}