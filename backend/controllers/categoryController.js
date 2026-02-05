// const Category = require("../model/category");
// const MenuItem = require("../model/menuItem");

// exports.createMenuItem = async (req, res) => {
//   try {
//     const { name, description, price, image, category } = req.body;

//     // Find category using slug
//     const categoryData = await Category.findOne({ slug: category });

//     if (!categoryData) {
//       return res.status(400).json({ message: "Invalid category slug" });
//     }

//     const menuItem = new MenuItem({
//       name,
//       description,
//       price,
//       image,
//       category: categoryData._id, // store ObjectId
//     });

//     await menuItem.save();

//     res.status(201).json(menuItem);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
const Category = require("../model/category");
const slugify = require("slugify");

// GET all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE category (Admin / Staff)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const slug = slugify(name, { lower: true, strict: true });

    const exists = await Category.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name, slug });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    console.error("CREATE CATEGORY ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
