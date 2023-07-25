const Sib = require('sib-api-v3-sdk');

exports.sendMail = async (req, res) => {
    try {
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.NEW_KEY;
        const receivedEmail = req.body.mail;
        const tranEmailApi = new Sib.TransactionalEmailsApi();
        const sender = {
            email: 'gaurvkmr1997@gmail.com'
        }
        const receivers = [{
            email: receivedEmail
        },]
        const result = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Reset password link",
            textContent: 'Click here for getting link for forgotted password'
        });
        console.log(result)
        res.status(200).json({ message: "Sent message successfully" })
    } catch (err) {
        res.status(500).json({ err: err })
        console.log(err)
    }
}