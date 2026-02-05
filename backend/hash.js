const bcrypt = require("bcryptjs");

async function hashPassword() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash("admin123", salt);
  console.log("Hashed password:", hashed);
}

hashPassword();
