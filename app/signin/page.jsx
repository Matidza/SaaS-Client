'use client'
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [generalError, setGeneralError] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const isFormValid = email.trim() !== '' && password.trim() !== ''

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setEmailError(null)
        setPasswordError(null)
        setSuccessMessage(null)
        setGeneralError(null)

        try {
            const response = await fetch('http://localhost:8000/api/auth/signin', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const result = await response.json()

            if (response.ok && result.success) {
                localStorage.setItem('accessToken', result.accessToken)
                localStorage.setItem('userId', result.user)

                setSuccessMessage(result.message || "🎉 Logged in successfully!")
                setTimeout(() => router.push('/dashboard'), 2000)
            } else {
                if (result.field === 'email') {
                    setEmailError(result.message)
                } else if (result.field === 'password') {
                    setPasswordError(result.message)
                } else {
                    setGeneralError(result.message || "An unexpected error occurred.")
                }
            }
        } catch (err) {
            setGeneralError("Something went wrong. Please try again.")
            console.error("Signin Error:", err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container className="mt-5 border border-white shadow-md">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h4 className="text-center mb-4">Welcome back! <strong>Sign In</strong></h4>

                    {generalError && <Alert variant="danger">{generalError}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                isInvalid={!!emailError}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {emailError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                isInvalid={!!passwordError}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100" disabled={loading || !isFormValid}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>

                        <div className="text-center mt-3">
                            <Link href="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Form>

                    <div className="text-center mt-4">
                        <Link href="/signup">Don’t have an account? Create one</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
