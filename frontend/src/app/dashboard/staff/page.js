"use client";
import useAuth from "@/hooks/useAuth";

export default function StaffDashboard() {
  const { user,ready } = useAuth(["staff"]);

    if (!ready) return <div>Loading...</div>;
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome back, {user?.name}! 👋</h1>
      <p>You can now manage orders.</p>
    </div>
  );
}
