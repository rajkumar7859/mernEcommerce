const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");
const router = express.Router();

// user registration 
router.route("/register").post(registerUser);
router.route("/login").post(loginUser)

module.exports = router;
