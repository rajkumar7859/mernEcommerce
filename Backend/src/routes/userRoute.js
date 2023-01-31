const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controller/userController");
const router = express.Router();

// user registration 
router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)

module.exports = router;
