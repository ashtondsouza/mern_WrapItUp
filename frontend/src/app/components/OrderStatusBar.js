"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./OrderStatusBar.module.css";

export default function OrderStatusBar() {
  const router = useRouter();
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  // ✅ not logged in → no bar
  if (!user) return null;

  if (!orders || orders.length === 0) return null;

  // ✅ find active order
  const activeOrder = orders.find((order) =>
    ["PENDING", "PREPARING", "READY"].includes(order.status)
  );

  if (!activeOrder) return null;

  return (
    <div
      className={styles.bar}
      onClick={() =>
        router.push(user.role === "admin" ? "/admin/orders" : "/orders/my")
      }
    >
      <div>
        <strong>
          {user.role === "admin" ? "Active Order" : "Your Order"}
        </strong>
        <p>Status: {activeOrder.status}</p>
      </div>

      <span className={styles.view}>View →</span>
    </div>
  );
}
