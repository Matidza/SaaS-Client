'use client'

import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="bg-body text-secondary py-4 mt-auto">
      <Container>
        <Row className="justify-content-center">
          <Col md="auto">
            <p className="mb-0 text-center">
              &copy; {new Date().getFullYear()} - All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

