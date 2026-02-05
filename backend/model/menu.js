const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },

    // 🔑 store category SLUG (not ObjectId)
    category: {
      type: String,
      required: true,
      index: true, // faster filtering
    },

    image: { type: String },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
