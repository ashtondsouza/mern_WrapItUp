// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000", // frontend origin
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/menuItems", require("./routes/menuRoutes"));   // ✅ add this
// app.use("/api/orders", require("./routes/orderRoutes")); // ✅ and this
// app.use("/api/categories", require("./routes/categoryRoutes"));
// app.use("/api/menu", require("./routes/menuRoutes")); // you already have this

// // Test route
// app.get("/", (req, res) => res.send("API is running..."));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.use("/api/categories", require("./routes/categoryRoutes"));
// app.use("/api/menu", require("./routes/menuRoutes"));

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS — allow local + deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-vercel-app.vercel.app", // change later
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

// ✅ Test route
app.get("/", (req, res) => res.send("API is running..."));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);


