const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword,getUserDetail, resetPassword, updateUserPassword, updateUserProfile, getAllUser, getSingleUser, deleteUser, updateUserRole } = require("../controller/userController");
const { isAuthenticatedUser ,authorizeRoles } = require("../middleware/auth");
const router = express.Router();
// user registration 
router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

router.route("/me").get(isAuthenticatedUser, getUserDetail)
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile)
router.route("/password/update").put(isAuthenticatedUser , updateUserPassword)

router.route("/admin/users").get(isAuthenticatedUser , authorizeRoles("admin"), getAllUser)
router.route("/admin/users/:id").get(isAuthenticatedUser , authorizeRoles("admin"), getSingleUser).put(isAuthenticatedUser , authorizeRoles("admin") , updateUserRole).delete(isAuthenticatedUser , authorizeRoles("admin") , deleteUser)


module.exports = router;
