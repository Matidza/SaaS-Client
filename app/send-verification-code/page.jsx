'use client'
import React, { useState } from "react"

export default function Page() {
	const [email, setEmail] = useState('')
	//const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		const response = await fetch('http://localhost:8000/api/auth/send-verification-code', {
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({email})
		})
		const result = await response.json()
		if (response.ok) {
            console.log("Verification Code Sent To Your Email", result);
        } else {
            console.error("Error:", result.message);
        }
		
	}
	return (
	    <div className="text-primary">
			<h2>Welcome to the send verification code Page</h2>
			<form onSubmit={handleSubmit}>
            <input 
                name="email" 
                type="email" 
                placeholder="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
			
            
            <button type="submit">Submit</button>
        </form>
	    </div>
	)
}