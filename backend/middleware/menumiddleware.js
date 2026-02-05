const MenuItem = require("../model/menu");

// Middleware: Check if menu item exists
exports.checkMenuExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    req.menuItem = item; // attach found item to request
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
