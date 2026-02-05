// const mongoose = require("mongoose");
// require("dotenv").config(); // make sure you have your .env file with MONGO_URI

// const MenuItem = require("./model/menu");
// const Category = require("./model/category");

// const menuItems = [
//   // Burgers
//   {
//     name: "Classic Beef Burger",
//     description: "Juicy beef patty with cheese, lettuce, tomato & house sauce.",
//     price: 199,
//     categoryName: "Burger",
//     image: "/images/burgers/beef-classic.jpg",
//     available: true,
//   },
//   {
//     name: "Chicken Supreme Burger",
//     description: "Crispy fried chicken with mayo & fresh lettuce.",
//     price: 179,
//     categoryName: "Burger",
//     image: "/images/burgers/chicken-supreme.jpg",
//     available: true,
//   },
//   {
//     name: "Veggie Delight Burger",
//     description: "Crispy veg patty with cheese & spicy mint mayo.",
//     price: 149,
//     categoryName: "Burger",
//     image: "/images/burgers/veg-delight.jpg",
//     available: true,
//   },
//   {
//     name: "Double Trouble Burger",
//     description: "Double patty, double cheese, double satisfaction.",
//     price: 249,
//     categoryName: "Burger",
//     image: "/images/burgers/double-trouble.jpg",
//     available: true,
//   },
//   {
//     name: "BBQ Melt Burger",
//     description: "Smoky BBQ sauce with grilled chicken patty.",
//     price: 219,
//     categoryName: "Burger",
//     image: "/images/burgers/bbq-melt.jpg",
//     available: true,
//   },

//   // Pizzas
//   {
//     name: "Margherita Pizza",
//     description: "Classic cheese & tomato pizza with basil.",
//     price: 299,
//     categoryName: "Pizza",
//     image: "/images/pizza/margherita.jpg",
//     available: true,
//   },
//   {
//     name: "Pepperoni Pizza",
//     description: "Loaded with pepperoni and cheese.",
//     price: 399,
//     categoryName: "Pizza",
//     image: "/images/pizza/pepperoni.jpg",
//     available: true,
//   },
//   {
//     name: "Veggie Feast Pizza",
//     description: "Capsicum, onion, corn, mushroom & olives.",
//     price: 349,
//     categoryName: "Pizza",
//     image: "/images/pizza/veggie-feast.jpg",
//     available: true,
//   },
//   {
//     name: "BBQ Chicken Pizza",
//     description: "Grilled chicken with smoky BBQ sauce.",
//     price: 429,
//     categoryName: "Pizza",
//     image: "/images/pizza/bbq-chicken.jpg",
//     available: true,
//   },
//   {
//     name: "Paneer Tikka Pizza",
//     description: "Indian-style paneer tikka toppings.",
//     price: 379,
//     categoryName: "Pizza",
//     image: "/images/pizza/paneer-tikka.jpg",
//     available: true,
//   },

//   // Sides
//   {
//     name: "French Fries",
//     description: "Crispy golden fries.",
//     price: 99,
//     categoryName: "Sides",
//     image: "/images/sides/fries.jpg",
//     available: true,
//   },
//   {
//     name: "Cheese Garlic Bread",
//     description: "Toasted bread with garlic butter & cheese.",
//     price: 129,
//     categoryName: "Sides",
//     image: "/images/sides/cheese-garlic-bread.jpg",
//     available: true,
//   },
//   {
//     name: "Chicken Nuggets",
//     description: "Crispy & juicy chicken bites.",
//     price: 149,
//     categoryName: "Sides",
//     image: "/images/sides/nuggets.jpg",
//     available: true,
//   },
//   {
//     name: "Potato Wedges",
//     description: "Fried potato wedges with herbs.",
//     price: 119,
//     categoryName: "Sides",
//     image: "/images/sides/wedges.jpg",
//     available: true,
//   },
//   {
//     name: "Tandoori Paneer Bites",
//     description: "Spicy paneer bites with Indian flavors.",
//     price: 159,
//     categoryName: "Sides",
//     image: "/images/sides/paneer-bites.jpg",
//     available: true,
//   },

//   // Beverages
//   {
//     name: "Coca Cola",
//     description: "Chilled soft drink.",
//     price: 49,
//     categoryName: "Beverages",
//     image: "/images/beverages/coke.jpg",
//     available: true,
//   },
//   {
//     name: "Cold Coffee",
//     description: "Iced cold coffee with cream.",
//     price: 129,
//     categoryName: "Beverages",
//     image: "/images/beverages/cold-coffee.jpg",
//     available: true,
//   },
//   {
//     name: "Chocolate Shake",
//     description: "Rich chocolate milkshake.",
//     price: 149,
//     categoryName: "Beverages",
//     image: "/images/beverages/choco-shake.jpg",
//     available: true,
//   },
//   {
//     name: "Lemon Ice Tea",
//     description: "Refreshing lemon iced tea.",
//     price: 79,
//     categoryName: "Beverages",
//     image: "/images/beverages/ice-tea.jpg",
//     available: true,
//   },
//   {
//     name: "Mango Smoothie",
//     description: "Thick mango smoothie.",
//     price: 159,
//     categoryName: "Beverages",
//     image: "/images/beverages/mango-smoothie.jpg",
//     available: true,
//   },

//   // Desserts
//   {
//     name: "Chocolate Brownie",
//     description: "Warm brownie with rich chocolate.",
//     price: 149,
//     categoryName: "Desserts",
//     image: "/images/desserts/brownie.jpg",
//     available: true,
//   },
//   {
//     name: "Vanilla Ice Cream",
//     description: "Classic vanilla scoop.",
//     price: 79,
//     categoryName: "Desserts",
//     image: "/images/desserts/vanilla.jpg",
//     available: true,
//   },
//   {
//     name: "Choco Lava Cake",
//     description: "Hot chocolate cake with molten center.",
//     price: 169,
//     categoryName: "Desserts",
//     image: "/images/desserts/lava-cake.jpg",
//     available: true,
//   },
//   {
//     name: "Oreo Cheesecake",
//     description: "Creamy cheesecake with Oreo topping.",
//     price: 199,
//     categoryName: "Desserts",
//     image: "/images/desserts/oreo-cheesecake.jpg",
//     available: true,
//   },
//   {
//     name: "Fruit Custard",
//     description: "Seasonal fruits with sweet custard.",
//     price: 99,
//     categoryName: "Desserts",
//     image: "/images/desserts/fruit-custard.jpg",
//     available: true,
//   },
// ];


// async function seed() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected");

//     // Optionally clear existing menu items
//     await MenuItem.deleteMany();

//     // Get categories from DB
//     const categories = await Category.find();
//    const categoryMap = {};
//   categories.forEach(cat => {
//     categoryMap[cat.name] = cat._id;  // e.g., "Burgers" => ObjectId("675aedc30a33d04523cb1a01")
//   });

//     // Replace categoryName with actual ObjectId
//     const fixedMenuItems = menuItems.map((item) => ({
//       ...item,
//       category: categoryMap[item.categoryName] || null,
//     }));

//     // Insert into DB
//     await MenuItem.insertMany(fixedMenuItems);
//     console.log("Menu items seeded!");

//     mongoose.disconnect();
//   } catch (err) {
//     console.error(err);
//   }
// }

// seed();

const mongoose = require("mongoose");
const MenuItem = require("./model/menu");
const Category = require("./model/category"); // make sure path & casing are correct

async function seed() {
    const dotenv = require("dotenv");
dotenv.config();

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");

  // Example categories
  const categories = {
    Burgers: "675aedc30a33d04523cb1a01",
    Pizza: "675aedc30a33d04523cb1a02",
    Sides: "675aedc30a33d04523cb1a03",
    Beverages: "675aedc30a33d04523cb1a04",
    Desserts: "675aedc30a33d04523cb1a05"
  };

   const menuItems = [
      // Burgers
      {
        name: "Classic Beef Burger",
        description: "Juicy beef patty with cheese, lettuce, tomato & house sauce.",
        price: 199,
        category: new mongoose.Types.ObjectId(categories.Burgers),
        image: "/images/burgers/beef-classic.jpg",
        available: true
      },
      {
        name: "Chicken Supreme Burger",
        description: "Crispy fried chicken with mayo & fresh lettuce.",
        price: 179,
        category: new mongoose.Types.ObjectId(categories.Burgers),
        image: "/images/burgers/chicken-supreme.jpg",
        available: true
      },
      {
        name: "Veggie Delight Burger",
        description: "Crispy veg patty with cheese & spicy mint mayo.",
        price: 149,
        category: new mongoose.Types.ObjectId(categories.Burgers),
        image: "/images/burgers/veg-delight.jpg",
        available: true
      },
      {
        name: "Double Trouble Burger",
        description: "Double patty, double cheese, double satisfaction.",
        price: 249,
        category: new mongoose.Types.ObjectId(categories.Burgers),
        image: "/images/burgers/double-trouble.jpg",
        available: true
      },
      {
        name: "BBQ Melt Burger",
        description: "Smoky BBQ sauce with grilled chicken patty.",
        price: 219,
        category: new mongoose.Types.ObjectId(categories.Burgers),
        image: "/images/burgers/bbq-melt.jpg",
        available: true
      },

      // Pizza
      {
        name: "Margherita Pizza",
        description: "Classic cheese & tomato pizza with basil.",
        price: 299,
        category: new mongoose.Types.ObjectId(categories.Pizza),
        image: "/images/pizza/margherita.jpg",
        available: true
      },
      {
        name: "Pepperoni Pizza",
        description: "Loaded with pepperoni and cheese.",
        price: 399,
        category: new mongoose.Types.ObjectId(categories.Pizza),
        image: "/images/pizza/pepperoni.jpg",
        available: true
      },
      {
        name: "Veggie Feast Pizza",
        description: "Capsicum, onion, corn, mushroom & olives.",
        price: 349,
        category: new mongoose.Types.ObjectId(categories.Pizza),
        image: "/images/pizza/veggie-feast.jpg",
        available: true
      },
      {
        name: "BBQ Chicken Pizza",
        description: "Grilled chicken with smoky BBQ sauce.",
        price: 429,
        category: new mongoose.Types.ObjectId(categories.Pizza),
        image: "/images/pizza/bbq-chicken.jpg",
        available: true
      },
      {
        name: "Paneer Tikka Pizza",
        description: "Indian-style paneer tikka toppings.",
        price: 379,
        category: new mongoose.Types.ObjectId(categories.Pizza),
        image: "/images/pizza/paneer-tikka.jpg",
        available: true
      },

      // Sides
      {
        name: "French Fries",
        description: "Crispy golden fries.",
        price: 99,
        category:  new mongoose.Types.ObjectId(categories.Sides),
        image: "/images/sides/fries.jpg",
        available: true
      },
      {
        name: "Cheese Garlic Bread",
        description: "Toasted bread with garlic butter & cheese.",
        price: 129,
        category: new mongoose.Types.ObjectId(categories.Sides),
        image: "/images/sides/cheese-garlic-bread.jpg",
        available: true
      },
      {
        name: "Chicken Nuggets",
        description: "Crispy & juicy chicken bites.",
        price: 149,
        category: new mongoose.Types.ObjectId(categories.Sides),
        image: "/images/sides/nuggets.jpg",
        available: true
      },
      {
        name: "Potato Wedges",
        description: "Fried potato wedges with herbs.",
        price: 119,
        category: new mongoose.Types.ObjectId(categories.Sides),
        image: "/images/sides/wedges.jpg",
        available: true
      },
      {
        name: "Tandoori Paneer Bites",
        description: "Spicy paneer bites with Indian flavors.",
        price: 159,
        category: new mongoose.Types.ObjectId(categories.Sides),
        image: "/images/sides/paneer-bites.jpg",
        available: true
      },

      // Beverages
      {
        name: "Coca Cola",
        description: "Chilled soft drink.",
        price: 49,
        category: new mongoose.Types.ObjectId(categories.Beverages),
        image: "/images/beverages/coke.jpg",
        available: true
      },
      {
        name: "Cold Coffee",
        description: "Iced cold coffee with cream.",
        price: 129,
        category: new mongoose.Types.ObjectId(categories.Beverages),
        image: "/images/beverages/cold-coffee.jpg",
        available: true
      },
      {
        name: "Chocolate Shake",
        description: "Rich chocolate milkshake.",
        price: 149,
        category: new mongoose.Types.ObjectId(categories.Beverages),
        image: "/images/beverages/choco-shake.jpg",
        available: true
      },
      {
        name: "Lemon Ice Tea",
        description: "Refreshing lemon iced tea.",
        price: 79,
        category: new mongoose.Types.ObjectId(categories.Beverages),
        image: "/images/beverages/ice-tea.jpg",
        available: true
      },
      {
        name: "Mango Smoothie",
        description: "Thick mango smoothie.",
        price: 159,
        category: new mongoose.Types.ObjectId(categories.Beverages),
        image: "/images/beverages/mango-smoothie.jpg",
        available: true
      },

      // Desserts
      {
        name: "Chocolate Brownie",
        description: "Warm brownie with rich chocolate.",
        price: 149,
        category: new mongoose.Types.ObjectId(categories.Desserts),
        image: "/images/desserts/brownie.jpg",
        available: true
      },
      {
        name: "Vanilla Ice Cream",
        description: "Classic vanilla scoop.",
        price: 79,
        category: new mongoose.Types.ObjectId(categories.Desserts),
        image: "/images/desserts/vanilla.jpg",
        available: true
      },
      {
        name: "Choco Lava Cake",
        description: "Hot chocolate cake with molten center.",
        price: 169,
        category: new mongoose.Types.ObjectId(categories.Desserts),
        image: "/images/desserts/lava-cake.jpg",
        available: true
      },
      {
        name: "Oreo Cheesecake",
        description: "Creamy cheesecake with Oreo topping.",
        price: 199,
        category: new mongoose.Types.ObjectId(categories.Desserts),
        image: "/images/desserts/oreo-cheesecake.jpg",
        available: true
      },
      {
        name: "Fruit Custard",
        description: "Seasonal fruits with sweet custard.",
        price: 99,
        category: new mongoose.Types.ObjectId(categories.Desserts),
        image: "/images/desserts/fruit-custard.jpg",
        available: true
      }
    ];

  try {
    for (let item of menuItems) {
      const newItem = new MenuItem(item);
      await newItem.save();
    }
    console.log("Menu seeded successfully");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
