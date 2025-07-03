'use client'

import Link from "next/link"
import SignOutButton from "../app/signout/page"
import { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap'

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/auth/check-auth', {
          credentials: 'include', // send HttpOnly cookies
        })

        const data = await res.json()
        if (res.ok && data.success) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (err) {
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return null // or <Spinner animation="border" size="sm" />

  return (
    <Navbar bg="white" className="border border-b-dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">Initia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} href="/send-verification-code" className="mt-2">Enterprise</Nav.Link>  
                <Nav.Link as={Link} href="/send-verification-code"className="mt-2">Pricing</Nav.Link>  
                <Nav.Link as={Link} href="/signin"className="mt-2">Sign In</Nav.Link>
                <Nav.Link as={Link} href="/signup" ><button className="btn btn-white border border-success border-2 text-success ">Sign Up</button></Nav.Link>        
              </>
            ) : (
              <>
                <Nav.Link as={Link} href="/allData">All Data</Nav.Link>
                <Nav.Link as={Link} href="/change-password">Change Password</Nav.Link>
                <SignOutButton className="" />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
