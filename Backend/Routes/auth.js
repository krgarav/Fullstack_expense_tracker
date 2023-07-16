const express = require("express");

const router = express.Router();

const authController = require("../Controllers/auth")

router.post("/signup",authController.authPostData);

module.exports = router;