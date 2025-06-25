'use client'
import Link from "next/link"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError(null);
        setPasswordError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Signed in successfully:", result);
                setSuccessMessage("🎉 Account created successfully! Redirecting...");
                //console.log("Signed in successfully:", result);
                // Optional delay before redirecting
                setTimeout(() => {
                    router.push('/signin');
                }, 3000);
            } else if (!response.ok) {
                // Set error based on the field
                if (result.field === 'email') {
                    setEmailError(result.message);
                } else if (result.field === 'password') {
                    setPasswordError(result.message);
                } else {
                    alert(result.message); // fallback
                }
            } 
             
        } catch (err) {
            alert("Something went wrong. Please try again.");
            console.error("Signup Error:", err.message);
        }
    };

    return (
        <>
            <h2>Welcome to the Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>

                <div>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>

                <button type="submit">Submit</button>
                <Link href="/signin">Sign In</Link>
            </form>

            {successMessage && (
                <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
            )}
        </>
    );
}
