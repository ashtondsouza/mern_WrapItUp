"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../../redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import styles from "./StaffOrders.module.css";

export default function StaffOrdersPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { orders, loading, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !user) return;

    if (user.role !== "staff") {
      router.replace("/");
      return;
    }

    dispatch(getAllOrders());
  }, [mounted, user, dispatch, router]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

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

  // 🔥 SPLIT ORDERS
  const activeOrders = orders.filter(
    (o) => o.status !== "COMPLETED"
  );
  const completedOrders = orders.filter(
    (o) => o.status === "COMPLETED"
  );

  const statuses = ["PENDING", "PREPARING", "READY", "COMPLETED"];

  const renderOrderCard = (order, isCompleted = false) => (
    <div
      key={order._id}
      className={`${styles.card} ${
        isCompleted ? styles.completedCard : ""
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

      <p className={styles.customer}>
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

      {!isCompleted && (
        <div className={styles.statusControls}>
          {statuses.map((status) => (
            <button
              key={status}
              className={styles.statusBtn}
              disabled={order.status === status}
              onClick={() =>
                handleStatusChange(order._id, status)
              }
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Staff Orders</h2>

      {/* 🟢 ACTIVE ORDERS */}
      <section>
        <h3 className={styles.sectionTitle}>Active Orders</h3>
        {activeOrders.length ? (
          activeOrders.map((o) => renderOrderCard(o))
        ) : (
          <p className={styles.muted}>No active orders</p>
        )}
      </section>

      {/* ✅ COMPLETED ORDERS */}
      <section className={styles.completedSection}>
        <h3 className={styles.sectionTitle}>Completed Orders</h3>
        {completedOrders.length ? (
          completedOrders.map((o) =>
            renderOrderCard(o, true)
          )
        ) : (
          <p className={styles.muted}>No completed orders</p>
        )}
      </section>
    </div>
  );
}
