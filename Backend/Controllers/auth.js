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

}