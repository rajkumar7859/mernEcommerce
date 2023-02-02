const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetail, updateUserPassword } = require("../controller/userController");
const { isAuthenticatedUser ,authorizeRoles } = require("../middleware/auth");
const router = express.Router();
// user registration 
router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

router.route("/me").get(isAuthenticatedUser, getUserDetail)
router.route("/password/update").put(isAuthenticatedUser , updateUserPassword)

module.exports = router;
