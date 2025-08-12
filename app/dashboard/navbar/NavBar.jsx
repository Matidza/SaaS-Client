'use client';

import React from 'react';
import { Container, Navbar, Nav, Form, InputGroup, Button } from 'react-bootstrap';

const primaryBlue = '#0d6efd'; // example color

export default function NavBar() {
  return (
    <Navbar bg="white" expand="lg" className="w-auto shadow-sm px-4 py-3" style={{ fontWeight: '600' }}>
      <Container fluid>
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

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Form className="mx-auto" style={{ width: '40rem' }}>
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

          <Nav className="ms-auto align-items-center gap-2">
            <Button
              variant="outline-white-500"
              style={{ borderColor: 'black', color: 'black', fontWeight: '600', borderRadius: 20 }}
            >
              Sign In
            </Button>
            <Button
              variant=""
              style={{ backgroundColor: 'black', borderColor: 'black', fontWeight: '600', color:'white', borderRadius: 25 }}
            >
              Join as Professional
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
