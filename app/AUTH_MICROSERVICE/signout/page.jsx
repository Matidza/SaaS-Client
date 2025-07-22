'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function SignOutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true);
  
    try {
      await fetch('http://localhost:8000/api/auth/signout', {
        method: 'POST',
        credentials: 'include' // 🔥 include cookies
      });
  
      // Optional: clean up UI state/localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('user_type');
  
      // Redirect to Sign In
      setTimeout(() => {
        router.push('/AUTH_MICROSERVICE/signin')
      }, 2000)
      //router.push('/AUTH_MICROSERVICE/signin');
    } catch (error) {
      console.error('Error during sign out:', error);
      alert('Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (/** */
    <button className="btn btn-white btn-sm border rounded-pill text-danger border-1 bg-clear border-danger fw-light" onClick={handleSignOut} disabled={loading}  >
      {loading ? 'Signing out...' : 'Sign Out'}
    </button>
  )
}
