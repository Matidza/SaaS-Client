
'use client';

import React from 'react';
import { Container, Navbar, Nav, Form, InputGroup, Button } from 'react-bootstrap';

const primaryBlue = '#0d6efd';

export default function NavBar() {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm px-4 py-3" style={{ fontWeight: '600' }}>
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={primaryBlue}
            viewBox="0 0 24 24"
            width="30"
            height="30"
            style={{ flexShrink: 0 }}
          >
            <path d="M3 3h18v18H3z" />
          </svg>
          <div>
            <div style={{ color: 'black', fontSize: '1.4rem' }}>InterviewPrep</div>
            <small style={{ fontWeight: '400', fontSize: '0.8rem', color: '#545860ff' }}>
              Professional Mock Interviews
            </small>
          </div>
        </Navbar.Brand>

        {/* Mobile Toggle */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Collapsible Content */}
        <Navbar.Collapse id="navbar-nav">
          {/* Search Bar */}
          <Form className="mx-lg-auto my-2 my-lg-0 w-50 w-lg-50">
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search professionals, job titles..."
                aria-label="Search"
                className="rounded-pill"
                style={{ paddingLeft: '1.5rem' }}
              />
            </InputGroup>
          </Form>

          {/* Buttons */}
          <Nav className="ms-lg-auto mt-3 mt-lg-0 align-items-lg-center gap-2 flex-column flex-lg-row">
            <Button
              variant="outline-white-500"
              style={{
                borderColor: 'black',
                color: 'black',
                fontWeight: '600',
                borderRadius: 20,
                width: '100%',
                maxWidth: '150px'
              }}
            >
              Sign In
            </Button>
            <Button
  style={{
    backgroundColor: 'black',
    borderColor: 'black',
    fontWeight: '600',
    color: 'white',
    borderRadius: 25,
    width: '100%',
    maxWidth: '300px',
    whiteSpace: 'nowrap',     // prevent wrapping
  }}
>
  Join as Professional
</Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
