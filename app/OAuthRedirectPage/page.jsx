'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function OAuthRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    if (token) {
      localStorage.setItem("accessToken", token)
      router.push("/dashboard")  // redirect to dashboard or home page for logged-in user
    } else {
      router.push("/signin") // redirect to signin if no token
    }
  }, [router])

  return <p>Redirecting...</p>
}
