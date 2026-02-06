"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { createOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";

import styles from "./Checkout.module.css";

export default function Checkout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth);
  const { loading, success, error } = useSelector((state) => state.order);

  const [phone, setPhone] = useState("");

const handlePlaceOrder = () => {
  if (!user) {
    alert("Please login");
    return;
  }

  if (!items.length) {
    alert("Cart is empty");
    return;
  }

  const orderData = {
    customerName: user.name,
    customerPhone: phone,
    items: items.map((item) => ({
      menuItem: item._id,
      quantity: item.qty,
      price: item.price,
    })),
  };

  dispatch(createOrder(orderData));
};

  // ✅ redirect after success
 useEffect(() => {
  if (success) {
    dispatch(clearCart());

    if (user?.role === "admin") {
      router.push("/admin/orders");
    } else {
      router.push("/orders");
    }
  }
}, [success, user, dispatch, router]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Checkout</h2>

      <div className={styles.section}>
        <label className={styles.label}>Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.input}
          placeholder="Enter phone number"
        />
      </div>

      <button
        className={styles.button}
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Placing order..." : "Place Order"}
      </button>

      {error && (
  <p className={styles.error}>
    {typeof error === "string" ? error : error.message}
  </p>
)}

    </div>
  );
}
