const express = require("express");
const { newOrder, getSingleOrder, getMyOrder, getAllOrders, updateOrderStatus, deleteOrder } = require("../controller/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser , newOrder);
router.route("/admin/order/:id").get(isAuthenticatedUser , authorizeRoles("admin"), getSingleOrder )
router.route("/orders/me").get(isAuthenticatedUser , getMyOrder)
router.route("/admin/orders/all").get(isAuthenticatedUser , authorizeRoles("admin") , getAllOrders)

router.route("/admin/order/:id").put(isAuthenticatedUser , authorizeRoles("admin") , updateOrderStatus).delete(isAuthenticatedUser , authorizeRoles("admin") ,deleteOrder)

module.exports = router;