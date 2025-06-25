'use client'
import Link from 'next/link'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function Header() {
  return (
    <Navbar bg="white-500" variant="white-500" expand="md">
      <Container>
        <Navbar.Brand as={Link} href="/"><h2 className="text-dark">Initia</h2></Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} href="/allData">All Data</Nav.Link>
            <Nav.Link as={Link} href="/signin">Sign In</Nav.Link>
            <Nav.Link as={Link} href="/forgot-password">Forgot Password?</Nav.Link>
            <Nav.Link as={Link} href="/send-verification-code">Verify?</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
