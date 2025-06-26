'use client'

import Link from "next/link"
import SignOutButton from './SignOutButton'
import { useEffect, useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsAuthenticated(!!token)
  }, [])

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">Initia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/allData">All Data</Nav.Link>
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} href="/signin">Sign In</Nav.Link>
                <Nav.Link as={Link} href="/forgot-password">Forgot Password?</Nav.Link>
                <Nav.Link as={Link} href="/send-verification-code">Verify?</Nav.Link>
              </>
            )}
          </Nav>
          {isAuthenticated && (
            <div className="d-flex">
              <SignOutButton />
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

