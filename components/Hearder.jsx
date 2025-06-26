'use client'
import Link from 'next/link'
import { Navbar, Container, Nav } from 'react-bootstrap'

export default function Header() {
  return (
    <Navbar className='bg-gray-500 shadow-md' variant="gray-500" expand="md">
      <Container>
        <Navbar.Brand as={Link} href="/"><h2 className="text-dark">Initia</h2></Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav ">
          <Nav className="ms-auto text-xs">        
            <Nav.Link as={Link} href="/signin"><h6>Sign In</h6></Nav.Link>        
            <Nav.Link as={Link} href="/send-verification-code"><h6>Verify</h6></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
