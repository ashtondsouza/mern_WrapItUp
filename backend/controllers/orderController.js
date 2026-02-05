
// const Order = require("../model/order");
// const MenuItem = require("../model/menu");

// // 🧾 User/Admin: Create order
// const createOrder = async (req, res) => {
//   try {
//     const { customerName, customerPhone, items } = req.body;

//     if (!customerName || !customerPhone || !items?.length) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     let totalPrice = 0;
//     const orderItems = [];

//     for (const i of items) {
//       const menuItem = await MenuItem.findById(i.menuItem);

//       if (!menuItem)
//         return res.status(404).json({ message: "Menu item not found" });

//       if (!menuItem.available)
//         return res.status(400).json({ message: `${menuItem.name} not available` });

//       totalPrice += menuItem.price * i.quantity;

//       orderItems.push({
//         menuItem: menuItem._id,
//         quantity: i.quantity,
//         price: menuItem.price,
//       });
//     }

//     const order = await Order.create({
//       customer: req.user._id,
//       customerName,
//       customerPhone,
//       items: orderItems,
//       totalPrice,
//     });

//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ message: "Order creation failed" });
//   }
// };

// // 👤 User/Admin: Get own orders
// const getMyOrders = async (req, res) => {
//   const orders = await Order.find({ customer: req.user._id })
//     .sort("-createdAt")
//     .populate("items.menuItem", "name price");

//   res.json(orders);
// };

// // 👨‍🍳 Staff/Admin: Get all orders
// const getAllOrders = async (req, res) => {
//   const orders = await Order.find()
//     .sort("-createdAt")
//     .populate("customer", "name email")
//     .populate("items.menuItem", "name price");

//   res.json(orders);
// };

// // 🔄 Staff/Admin: Update order status
// const updateOrderStatus = async (req, res) => {
//   const { status } = req.body;
//   const validStatuses = ["PENDING", "PREPARING", "READY", "COMPLETED"];

//   if (!validStatuses.includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   const order = await Order.findById(req.params.id);
//   if (!order) return res.status(404).json({ message: "Order not found" });

//   order.status = status;
//   await order.save();

//   res.json(order);
// };

// module.exports = {
//   createOrder,
//   getMyOrders,
//   getAllOrders,
//   updateOrderStatus,
// };

const Order = require("../model/order");
const MenuItem = require("../model/menu");

// 🧾 User/Admin: Create order
const createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, items } = req.body;

    if (!customerName || !customerPhone || !items?.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const i of items) {
      const menuItem = await MenuItem.findById(i.menuItem);

      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }

      if (!menuItem.available) {
        return res
          .status(400)
          .json({ message: `${menuItem.name} not available` });
      }

      totalPrice += menuItem.price * i.quantity;

      orderItems.push({
        menuItem: menuItem._id,
        quantity: i.quantity,
        price: menuItem.price,
      });
    }

    const order = await Order.create({
      customer: req.user._id,
      customerName,
      customerPhone,
      items: orderItems,
      totalPrice,
      status: "PENDING", // ✅ DEFAULT STATUS
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({
      message: "Order creation failed",
      error: err.message,
    });
  }
};

// 👤 User/Admin: Get ONLY own orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.menuItem", "name price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch user orders",
      error: err.message,
    });
  }
};

// 👨‍🍳 Staff ONLY: Get all orders
const getAllOrders = async (req, res) => {
  try {
  const orders = await Order.find()
  .sort({ createdAt: -1 })
  .populate("customer", "name email")
  .populate("items.menuItem", "name price");

const cleanedOrders = orders.map((order) => ({
  ...order.toObject(),
  items: order.items.filter((i) => i.menuItem !== null),
}));

res.json(cleanedOrders);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};

// 🔄 Staff ONLY: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["PENDING", "PREPARING", "READY", "COMPLETED"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update order status",
      error: err.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
