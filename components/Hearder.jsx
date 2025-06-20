"use client"
import Link from "next/link"


export default function Header() {
    return (
        <div>
            <h1><Link href="/">Company Logo</Link></h1> 
            <ul>
                <Link href="/login">Sign In</Link> | 
                <Link href="/forgot-password">forgot Password?</Link>
            </ul>
        </div>
    )
}