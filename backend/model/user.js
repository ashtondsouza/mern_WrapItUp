// backend/models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
       match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // email regex
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    role: {
      type: String,
      enum: ["customer", "staff", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
