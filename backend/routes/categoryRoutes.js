const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Public route
router.get("/", categoryController.getCategories);

// Admin / Staff routes
router.post("/", protect, authorizeRoles("admin", "staff"), categoryController.createCategory);

module.exports = router;
