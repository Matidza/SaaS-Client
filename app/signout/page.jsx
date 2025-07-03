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
  
      // Redirect to Sign In
      router.push('/signin');
    } catch (error) {
      console.error('Error during sign out:', error);
      alert('Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Button variant="danger bg-white text-danger" onClick={handleSignOut} disabled={loading}>
      {loading ? 'Signing out...' : 'Sign Out'}
    </Button>
  )
}
