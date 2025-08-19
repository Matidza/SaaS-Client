// utils/auth.js
export async function refreshAccessToken() {
  try {
    const res = await fetch("http://localhost:8000/api/auth/refresh", {
      method: "POST",
      credentials: "include", // important so cookies are sent
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error("Failed to refresh token");
    }

    console.log("✅ Access token refreshed");
    return true;
  } catch (err) {
    console.error("❌ Refresh token failed:", err.message);
    return false;
  }
}

