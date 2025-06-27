'use client'
import React, { useState } from "react"
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { useRouter } from 'next/navigation'

export default function Page() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError(null)
    setSuccess(null)

    try {
      const response = await fetch('http://localhost:8000/api/auth/send-verification-code', {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess("📬 Verification Code Sent To Your Email.")
		setTimeout(() => {
			router.push('/verify-verification-code');
		}, 2000);
      } else {
        // Check if the error came from the `email` field and if thats
        // the case, pop up the error message
        if (result.field === 'email') {
          setEmailError(result.message)
        } else {
          setEmailError("An unexpected error occurred.")
        }
      }
    } catch (err) {
      setEmailError("Something went wrong. Please try again.")
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h4 className="text-center mb-4">Send Verification Code</h4>

          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Send Code
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

