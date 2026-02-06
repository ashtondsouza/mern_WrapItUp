"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiGetAllMenu } from "../../lib/api/menu";
import { getCategories } from "../../lib/api/category";

import CategorySidebar from "../CategorySidebar";
import AuthModal from "../AuthModel";

import { addToCart } from "../../redux/slices/cartSlice";
import { openAuthModal } from "../../redux/slices/authSlice";
import { selectCartTotalQty } from "../../redux/selectors/cartSelector";
import { useRouter } from "next/navigation";

import styles from "./Menupage.module.css";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const categoryRefs = useRef({});

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const totalQty = useSelector(selectCartTotalQty);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const menuItemsRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [menuData, catData] = await Promise.all([
          apiGetAllMenu(),
          getCategories(),
        ]);

        setItems(menuData);
        setCategories(catData);

        const refs = {};
        catData.forEach((cat) => (refs[cat._id] = null));
        categoryRefs.current = refs;
      } catch (err) {
        console.error("❌ Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleCheckout = () => {
    if (!user) {
      dispatch(
        openAuthModal({
          redirectTo: "/cart",
        })
      );
      return;
    }
    router.push("/cart");
  };
  
   const handleViewOrders = () => {
    if (!user) {
      dispatch(
        openAuthModal({
          redirectTo: "/orders",
        })
      );
      return;
    }

    // ✅ Redirect based on role
    if (user.role === "admin") {
      router.push("/admin/orders");
    } else {
      router.push("/orders");
    }
  };

const handleScrollToCategory = (id) => {
  if (id === "all") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return;
  }

  const element = categoryRefs.current[id];

  if (element) {
    const yOffset = -200; // 👈 adjust header height
    const y =
      element.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }
};


  // 🔹 Filter items based on search
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
  );

// ⭐ Move Beverages to bottom
const sortedCategories = [...categories].sort((a, b) => {
  if (a.name.toLowerCase() === "beverages") return 1;
  if (b.name.toLowerCase() === "beverages") return -1;
  return 0;
});

// 🔹 Group filtered items by category
const itemsByCategory = sortedCategories
  .map((cat) => ({
    category: cat,
    items: filteredItems.filter((item) => item.category === cat._id),
  }))
  .filter((group) => group.items.length > 0);

    
  return (
    <div className={styles.container}>
      <CategorySidebar
        categories={categories}
        loading={loading}
        onSelect={handleScrollToCategory}
        selectedCategory={null}
      />

      <div className={styles.rightContent}>
        <div className={styles.topBar}>
    <div className={styles.topBar1}>
          <h2 className={styles.title}>Menu</h2>

          {/* 🔹 Search input */}
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          /></div>
      <div className={styles.topBar2}>  
         <button className={styles.ordersBtn} onClick={handleViewOrders}>
              My Orders
            </button>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            Cart ({totalQty})
          </button></div>
        </div>

        <div className={styles.menuItems} ref={menuItemsRef}>
          {loading ? (
            <div className={styles.grid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.cardSkeleton} />
              ))}
            </div>
          ) : itemsByCategory.length === 0 ? (
            <p style={{ padding: "20px" }}>No items found.</p>
          ) : (
            itemsByCategory.map(({ category, items }) => (
              <div
                key={category._id}
                ref={(el) => (categoryRefs.current[category._id] = el)}
                className={styles.categorySection}
              >
                <h3 className={styles.categoryTitle}>{category.name}</h3>

                <div className={styles.grid}>
                  {items.map((item) => (
                    <div key={item._id} className={styles.card}>
                      <div className={styles.imageContainer}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.image}
                        />
                      </div>

                      <h4 className={styles.name}>{item.name}</h4>
                      <p className={styles.desc}>{item.description}</p>

                      <div className={styles.bottomRow}>
                        <span className={styles.price}>₹{item.price}</span>
                        <button
                          className={styles.addBtn}
                          onClick={() => handleAddToCart(item)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
       
                </div>
              </div>
            ))
          )}
        </div>
                   <div className={styles.endSection}>
  <p className={styles.endTitle}>More items coming soon 🍽️</p>
  <span className={styles.endSub}>
    Stay tuned for new delicious additions!
  </span>
</div>
      </div>

      <AuthModal />

      
    </div>

    
  );
}
