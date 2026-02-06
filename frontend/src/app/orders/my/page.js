"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../redux/slices/orderSlice";
import styles from "./orders.module.css";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.order);
const { user } = useSelector((state) => state.auth);
  useEffect(() => {
  if (!user) return;
  dispatch(getMyOrders());
}, [user, dispatch]);

if (!user) return null;


  if (loading) return <p className={styles.center}>Loading orders...</p>;
 if (error)
  return (
    <p className={styles.error}>
      {typeof error === "string" ? error : error.message}
    </p>
  );


  if (!orders.length) {
    return <p className={styles.center}>No orders yet 🍽️</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className={styles.card}>
          <div className={styles.header}>
            <span className={styles.orderId}>
              Order #{order._id.slice(-6)}
            </span>
            <span className={`${styles.status} ${styles[order.status]}`}>
              {order.status}
            </span>
          </div>

          <ul className={styles.items}>
            {order.items.map((item) => (
              <li key={item._id}>
                {item.menuItem.name} × {item.quantity}
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
      ))}
    </div>
  );
}
