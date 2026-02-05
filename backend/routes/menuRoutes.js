const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { checkMenuExists } = require("../middleware/menumiddleware");

// Public routes
router.get("/", menuController.getMenuItems);

// GET items by category slug
router.get("/category/:slug", menuController.getItemsByCategory);

// Admin / Staff routes
router.post(
  "/",
  protect,
  authorizeRoles("admin", "staff"),
  menuController.createMenuItem
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  checkMenuExists,
  menuController.updateMenuItem
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "staff"),
  checkMenuExists,
  menuController.deleteMenuItem
);

module.exports = router;
