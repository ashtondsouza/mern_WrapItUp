"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuth(allowedRoles = []) {
  const router = useRouter();
  const { user, token, loading } = useSelector((s) => s.auth);

  useEffect(() => {
    if (loading) return;

    // Not logged in
    if (!token || !user) {
      router.replace("/login");
      return;
    }

    // Role check
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized");
    }
  }, [user, token, loading, allowedRoles, router]);

  return { user, token, loading };
}
