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
                router.push("/dashboard")
            } else {
                router.push("/signin")
            }
        }, []
    )

    return <p>Redirecting...</p>

}