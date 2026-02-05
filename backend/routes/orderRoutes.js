
// // const express = require("express");
// // const router = express.Router();
// // const { protect, authorizeRoles } = require("../middleware/authMiddleware");
// // const {
// //   createOrder,
// //   getOrders,
// //   updateOrderStatus,
// // } = require("../controllers/orderController");

// // // 🧾 Customer: Create an order
// // router.post("/", protect, createOrder);

// // // 📋 Staff/Admin: View all orders
// // router.get("/", protect, authorizeRoles("admin", "staff"), getOrders);

// // // 🔄 Staff/Admin: Update order status (pending → preparing → completed)
// // router.put("/:id/status", protect, authorizeRoles("admin", "staff"), updateOrderStatus);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { protect, authorizeRoles } = require("../middleware/authMiddleware");
// const {
//   createOrder,
//   getMyOrders,
//   getAllOrders,
//   updateOrderStatus,
// } = require("../controllers/orderController");

// // 🧾 User/Admin: Place order
// router.post("/", protect, authorizeRoles("user", "admin"), createOrder);

// // 👤 User/Admin: View own orders
// router.get("/my", protect, authorizeRoles("user", "admin"), getMyOrders);

// // 👨‍🍳 Staff/Admin: View all orders
// router.get("/", protect, authorizeRoles("staff", "admin"), getAllOrders);

// // 🔄 Staff/Admin: Update order status
// router.put("/:id/status", protect, authorizeRoles("staff", "admin"), updateOrderStatus);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// 🧾 CUSTOMER + ADMIN: Place order
router.post("/", protect, authorizeRoles("customer", "admin"), createOrder);

// 👤 CUSTOMER + ADMIN: View OWN orders
router.get("/my", protect, authorizeRoles("customer", "admin"), getMyOrders);

// 📋 ADMIN + STAFF: View ALL orders
router.get("/", protect, authorizeRoles("admin", "staff"), getAllOrders);

// 🔄 ADMIN + STAFF: Update order status
router.put(
  "/:id/status",
  protect,
  authorizeRoles("admin", "staff"),
  updateOrderStatus
);
module.exports = router;