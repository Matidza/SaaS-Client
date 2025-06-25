'use client'
import React, { useState } from "react"
import Link from "next/link"

export default function Page() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		const response = await fetch('http://localhost:8000/api/auth/signin', {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({email, password})
		})
		const result = await response.json()
		if (response.ok) {
            console.log("Signed in successfully:", result);
        } else {
            console.error("Error:", result.message);
        }
		
	}
	return (
	    <div className="text-primary">
			<h2>Welcome to the Login Page</h2>
            
			<form onSubmit={handleSubmit}>
            <input 
                name="email" 
                type="email" 
                placeholder="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                name="password" 
                type="password" 
                placeholder="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
            <button type="submit">Submit</button>
        </form>
        <Link href="/">create account</Link>
	    </div>
	)
}