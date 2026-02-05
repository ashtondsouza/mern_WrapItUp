const MenuItem = require("../model/menu");
const Category = require("../model/category");

/**
 * CREATE menu item (Admin / Staff)
 * category = slug (string)
 */
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    // validate category slug
    const existingCategory = await Category.findOne({ slug: category });
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category slug" });
    }

    const item = new MenuItem({
      name,
      description,
      price,
      category: existingCategory.slug,
      image,
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error("CREATE MENU ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET all available menu items
 */
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find({ available: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET menu items by category SLUG
 */
exports.getItemsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    const items = await MenuItem.find({
      category: slug,
      available: true,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE menu item
 */
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = req.menuItem;

    // if category provided, validate slug
    if (req.body.category) {
      const validCategory = await Category.findOne({
        slug: req.body.category,
      });

      if (!validCategory) {
        return res.status(400).json({ message: "Invalid category slug" });
      }

      menuItem.category = validCategory.slug;
    }

    // update other fields
    Object.keys(req.body).forEach((key) => {
      if (key !== "category") {
        menuItem[key] = req.body[key];
      }
    });

    const updatedItem = await menuItem.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE menu item
 */
exports.deleteMenuItem = async (req, res) => {
  try {
    await req.menuItem.deleteOne();
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
