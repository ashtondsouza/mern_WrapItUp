"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function useAdminGuard() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Not logged in
    if (!user) {
      router.replace("/login");
      return;
    }

    // Logged in but not admin
    if (user.role !== "admin") {
      router.replace("/unauthorized");
    }
  }, [user, router]);
}
