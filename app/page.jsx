'use client'
import Link from "next/link"
import React, { useState } from 'react'
import {useFormState, useFormStatus} from 'react-dom'

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formState, formAction] = useFormState(handleSubmit, {})
    console.log(formState);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/auth/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Account created in successfully:", result);
        } else {
            console.error("Error:", result);
        }
    }


    return (
        <>
        <h2>Welcome to the Signup Page</h2>
        <form onSubmit={formAction}>
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
            <Link href="/signin">Sign In</Link>
        </form>
        </>
        
    );
}


