'use client'

import Link from "next/link"
import SignOutButton from "../../AUTH_MICROSERVICE/signout/page"
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
    <Navbar bg="white" className="shadow-sm p-3 mb-5 w-auto" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/AUTH_MICROSERVICE/" className="fs-2 fw-bolder">Initia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} href="/AUTH_MICROSERVICE/send-verification-code" className="mt-2 fs-6 fst-normal">Enterprise</Nav.Link>  
                <Nav.Link as={Link} href="/AUTH_MICROSERVICE/send-verification-code"className="mt-2 fs-6 fst-normal">Pricing</Nav.Link>  
                <Nav.Link as={Link} href="/AUTH_MICROSERVICE/signin"className="mt-2 fs-6 fst-normal">Sign In</Nav.Link>
                <Nav.Link as={Link} href="/AUTH_MICROSERVICE/signup" ><button className="btn btn-white border border-success border-1 text-success ">Join</button></Nav.Link>        
              </>
            ) : (
              <>
                <Nav.Link as={Link} href="/AUTH_MICROSERVICE/allData" className="fs-6 fst-normal">All Data</Nav.Link>
                <Nav.Link as={Link} href="/AUTH_MICROSERVICE/change-password" className="fs-6 fst-normal px-2">Change Password</Nav.Link>
                <SignOutButton className="danger bg-white text-danger" />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
