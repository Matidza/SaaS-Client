// app/providers/AuthProvider.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { refreshAccessToken } from "../utils/auth";

export default function AuthProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Try refresh immediately on mount (in case access token expired)
    refreshAccessToken().then((ok) => {
      if (!ok) router.push("/auth/signin");
    });

    // Then set interval to refresh every 25 minutes
    const interval = setInterval(async () => {
      const ok = await refreshAccessToken();
      if (!ok) router.push("/auth/signin");
    }, 25 * 60 * 1000);

    return () => clearInterval(interval);
  }, [router]);

  return children;
}
