"use client"
import Link from "next/link"


export default function Header() {
    return (
        <div>
            <h1><Link href="/">Company Logo</Link></h1> 
            <ul>
                <li><Link href="/login">Sign In</Link></li>
                <li><Link href="/forgot-password">forgot Password?</Link></li>
            </ul>
        </div>
    )
}