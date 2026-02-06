"use client";
import useAuth from "@/hooks/useAuth";

export default function CustomerDashboard() {
  const { user, ready } = useAuth(["customer"]);

    // if (!ready) return <div>Loading...</div>;
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user?.name}! 👋</h1>
      <p>Customer dashboard loaded successfully.</p>
    </div>
  );
}
