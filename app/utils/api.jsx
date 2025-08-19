// utils/api.js
import { refreshAccessToken } from "./auth";

export async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (res.status === 401) {
    // Try refreshing token
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry original request
      return fetch(url, {
        ...options,
        credentials: "include",
      });
    } else {
      throw new Error("Unauthorized - refresh failed");
    }
  }

  return res;
}
