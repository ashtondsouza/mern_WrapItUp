"use client";

import { useEffect } from "react";
import useAdminGuard from "../../../hooks/useAdminGuard";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { useRouter } from "next/navigation";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboardPage() {
  useAdminGuard();

  const dispatch = useDispatch();
  const router = useRouter();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // 🧮 Analytics
  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (o) => o.status === "COMPLETED"
  ).length;

  const pendingOrders = orders.filter(
    (o) => o.status !== "COMPLETED"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      {/* 🔢 Stats Cards */}
      <div className={styles.statsGrid}>
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Revenue" value={`₹${totalRevenue}`} />
        <StatCard title="Completed Orders" value={completedOrders} />
        <StatCard title="Pending Orders" value={pendingOrders} />
      </div>

      {/* 📦 Recent Orders */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Recent Orders</h2>

          <button
            className={styles.viewAllBtn}
            onClick={() => router.push("/admin/orders")}
          >
            View All Orders →
          </button>
        </div>

        {orders.slice(0, 5).map((order) => (
          <div key={order._id} className={styles.orderRow}>
            <span>#{order._id.slice(-6)}</span>
            <span>{order.customer?.name}</span>
            <span>{order.status}</span>
            <span>₹{order.totalPrice}</span>
          </div>
        ))}
      </div>

      {/* 👥 Staff Schedule */}
      <div className={styles.section}>
        <h2>Staff Schedule</h2>

        <ul className={styles.schedule}>
          <li>👨‍🍳 Ryan — 9 AM - 5 PM</li> 
          <li>👩‍🍳 Stavis — 12 PM - 8 PM</li>
          <li>👨‍🍳 Savio — 4 PM - 12 AM</li>
        </ul>
      </div>
    </div>
  );
}

/* 🔹 Reusable Card */
function StatCard({ title, value }) {
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>{title}</p>
      <h3 className={styles.cardValue}>{value}</h3>
    </div>
  );
}
