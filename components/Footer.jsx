'use client'

import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="bg-body text-gray text-center text-xs- py-4 mt-auto pv-5">
      <Container>
        <Row className="justify-content-center">
          <Col md="auto">
            <p className="mb-0 text-center">
              copyright &copy; {new Date().getFullYear()} - All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

