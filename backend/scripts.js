require("dotenv").config();
const mongoose = require("mongoose");

const MenuItem = require("./model/menu");

const CATEGORY_MAP = {
  "burger": "burgers",
  "pizza": "pizza",
  "fries": "sides",
  "bread": "sides",
  "nuggets": "sides",
  "wedges": "sides",
  "bites": "sides",
  "cola": "beverages",
  "coffee": "beverages",
  "shake": "beverages",
  "tea": "beverages",
  "smoothie": "beverages",
  "brownie": "desserts",
  "ice cream": "desserts",
  "cake": "desserts",
  "cheesecake": "desserts",
  "custard": "desserts",
};

function resolveCategorySlug(itemName) {
  const name = itemName.toLowerCase();
  for (const key in CATEGORY_MAP) {
    if (name.includes(key)) {
      return CATEGORY_MAP[key];
    }
  }
  return null;
}

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const menuItems = await MenuItem.find({});
    console.log(`📦 Found ${menuItems.length} menu items`);

    let updated = 0;

    for (const item of menuItems) {
      const slug = resolveCategorySlug(item.name);

      if (!slug) {
        console.log(`⚠️ Could not map "${item.name}"`);
        continue;
      }

      item.categorySlug = slug;
      item.category = undefined; // remove old ObjectId
      await item.save();

      updated++;
    }

    console.log(`✅ Migration complete. Updated ${updated} items`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

migrate();
