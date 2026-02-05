require("dotenv").config();
const mongoose = require("mongoose");
const slugify = require("slugify");

const Category = require("./model/category");

async function migrate() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected");

    const categories = await Category.find({}, { _id: 1, name: 1, slug: 1 });
    console.log(`📂 Found ${categories.length} categories`);

    let updated = 0;

    for (const category of categories) {
      if (category.slug) continue;

      const slug = slugify(category.name, {
        lower: true,
        strict: true
      });

      await Category.updateOne(
        { _id: category._id },
        { $set: { slug } }
      );

      updated++;
    }

    console.log(`✅ Category migration complete. Updated ${updated} categories.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

migrate();
