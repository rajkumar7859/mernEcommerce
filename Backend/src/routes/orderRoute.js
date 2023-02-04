const express = require("express");
const { newOrder, getSingleOrder, getMyOrder } = require("../controller/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser , newOrder);
router.route("/order/:id").get(isAuthenticatedUser , authorizeRoles("admin"), getSingleOrder )
router.route("/orders/me").get(isAuthenticatedUser , getMyOrder)

module.exports = router;