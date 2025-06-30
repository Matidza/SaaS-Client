'use client'

import Link from "next/link"
import SignOutButton from "../app/signout/page"
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
            
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} href="/signin">sign In</Nav.Link>
                <Nav.Link as={Link} href="/send-verification-code">verify account</Nav.Link>         
              </>
            )}
          </Nav>
          <Nav className="me-auto">
            {isAuthenticated && (
            <>
              <Nav.Link as={Link} href="/allData">All data</Nav.Link>
              <Nav.Link as={Link} href="/signout">signout</Nav.Link>
              <Nav.Link as={Link} href="/change-password">change password</Nav.Link>
            </>
          )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

