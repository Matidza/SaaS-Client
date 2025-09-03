'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (error) {
      console.error("OAuth Error:", error);
      router.push("/auth/signin");
      return;
    }

    if (token) {
      localStorage.setItem("accessToken", token);
      router.push("/auth/signin");
    } else {
      router.push("/auth/signin");
    }
  }, [router]);

  return <p>Redirecting...</p>;
}
