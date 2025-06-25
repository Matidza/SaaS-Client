"use client"
import Link from "next/link"


export default function Header() {
    return (
        <div>
            <Link href="/">Company Logo</Link> ||| <Link href="/allData">All Data</Link> | 
                <Link href="/signin">Sign In</Link> | 
                <Link href="/forgot-password">forgot Password?</Link> |
                <Link href="/send-verification-code">verify?</Link>
            
        </div>
    )
}