'use client'
import React, { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [generalError, setGeneralError] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const isFormValid = email.trim() !== '' && password.trim().length >= 8

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setEmailError(null)
        setPasswordError(null)
        setSuccessMessage(null)
        setGeneralError(null)

        try {
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const result = await response.json()

            if (response.ok && result.success) {
                setSuccessMessage(result.message)
                setTimeout(() => {
                    router.push('/signin')
                }, 2000)
            } else {
                if (result.field === 'email') setEmailError(result.message)
                else if (result.field === 'password') setPasswordError(result.message)
                else setGeneralError(result.message)
            }

        } catch (error) {
            setGeneralError("🚨 Something went wrong. Please try again.")
            console.error("Signup Error:", error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container className="mt-5 border border-white-100 shadow-md">
            <Row className="justify-content-center">
                <Col md={7}>
                    <h4 className="text-center text-2xl text-gray-400 mb-4 mt-3">
                        Don’t have an account? <strong>Create One</strong>
                    </h4>

                    {generalError && <Alert variant="danger">{generalError}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}

                    <Form onSubmit={handleSubmit} className='max-w-xs mx-auto mb3'>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                className="text-gray-500 border border-secondary"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                isInvalid={!!emailError}
                                autoComplete="off"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {emailError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                className="text-gray-500 border border-secondary"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                isInvalid={!!passwordError}
                                autoComplete="off"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            variant="success"
                            type="submit"
                            className="w-100"
                            disabled={!isFormValid || loading}
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : "Create Account"}
                        </Button>

                        <div className="text-center mt-3 mb-3">
                            <Link href="/signin">Already have an account? Sign In</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

