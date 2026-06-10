"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import RouteLoadingOverlay from "@/components/ui/RouteLoadingOverlay";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/");
      return;
    }

    setAuthorized(true);
  }, [user, loading, router]);

  // 🔥 FULL SCREEN OVERLAY (NO FLASH EVER)
  if (loading || !authorized) {
    return <RouteLoadingOverlay />;
  }

  return <>{children}</>;
}