"use client";
console.log("🔥 ORDERS PAGE FILE LOADED");

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import styles from "./AdminOrders.module.css";

export default function AdminOrdersPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { orders, loading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!user || user.role !== "admin") {
      router.replace("/");
      return;
    }

    dispatch(getAllOrders());
  }, [mounted, user, dispatch, router]);

  if (!mounted) return null;
  if (loading) return <p className={styles.center}>Loading orders...</p>;
  if (error)
    return (
      <p className={styles.error}>
        {typeof error === "string" ? error : error.message}
      </p>
    );

  if (!orders.length)
    return <p className={styles.center}>No orders found 📦</p>;

  // ✅ SPLIT ORDERS
  const activeOrders = orders.filter(
    (o) => o.status !== "COMPLETED"
  );

  const completedOrders = orders.filter(
    (o) => o.status === "COMPLETED"
  );

  return (
    <div className={styles.container}>
      {/* 🔀 Header row */}
      <div className={styles.topBar}>
        <h2 className={styles.heading}>All Orders</h2>

        <button
          className={styles.switchBtn}
          onClick={() => router.push("/orders/my")}
        >
          View My Orders
        </button>
      </div>

      {/* 🔥 ACTIVE ORDERS */}
      <h3 className={styles.sectionTitle}>Active Orders</h3>

      {activeOrders.length === 0 && (
        <p className={styles.center}>No active orders 🚀</p>
      )}

      {activeOrders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}

      {/* ✅ COMPLETED ORDERS */}
      <h3 className={styles.sectionTitle}>Completed Orders</h3>

      {completedOrders.length === 0 && (
        <p className={styles.center}>No completed orders yet ✅</p>
      )}

      {completedOrders.map((order) => (
        <OrderCard key={order._id} order={order} completed />
      ))}
    </div>
  );
}

/* 🔹 Reusable Order Card */
function OrderCard({ order, completed }) {
  return (
    <div
      className={`${styles.card} ${
        completed ? styles.completedCard : ""
      }`}
    >
      <div className={styles.header}>
        <span className={styles.orderId}>
          Order #{order._id.slice(-6)}
        </span>

        <span className={`${styles.status} ${styles[order.status]}`}>
          {order.status}
        </span>
      </div>

      <p style={{ fontSize: "14px", marginBottom: "6px" }}>
        Customer: <strong>{order.customer?.name}</strong>
      </p>

      <ul className={styles.items}>
        {order.items.map((item) => (
          <li key={item._id}>
            {item.menuItem?.name || "Unknown Item"} × {item.quantity}
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <span>Total: ₹{order.totalPrice}</span>
        <span className={styles.date}>
          {new Date(order.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
