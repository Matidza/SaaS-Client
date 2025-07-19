'use client'
import React, { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap'
import { FaGoogle, FaGithub, FaLinkedin } from "react-icons/fa"

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
            const response = await fetch('http://localhost:8000/api/auth/signup-as-mentor', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            const result = await response.json()
            console.log(result)
            if (response.ok && result.success) {
                localStorage.setItem('accessToken', result.accessToken) 
                localStorage.setItem('userId', result.user)
                localStorage.setItem('user_type', result.user_type) 
                


                setSuccessMessage(result.message)

                // ✅ Clear input fields after success
                setEmail('')
                setPassword('')
                

                
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
        <Container className="mt-3 border border-white shadow-md">
            <Row className="justify-content-center">
                <Col md={7}>
                    <h4 className="text-center text-2xl text-muted text-auto mb-4 mt-3">
                        Become a <strong className="text-primary">Mentor</strong> <br></br>
                        and help students become well preped for the next interview.
                    </h4>
                    <br></br>

                    {generalError && <Alert variant="danger">{generalError}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}

                    <Form onSubmit={handleSubmit} className='max-w-xs mx-auto mb3'>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label className='text-dark'>Email</Form.Label>
                            <Form.Control
                                type="email"
                                //placeholder="Enter email"
                                className="text-dark border  border-muted fw-lighter"
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
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                color="#DB4437"
                                //placeholder="Password"
                                className="text-dark-50  border border-muted fw-lighter"
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
                            variant="primary"
                            type="submit"
                            className="w-100 fw-bold rounded-pill"
                            disabled={!isFormValid || loading}
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : "Create Account"}
                        </Button>

                        <div className="text-center mt-4">
                            <p className="mb-2 text-muted">Or sign up with</p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <Button
                                    variant="light"
                                    className="d-flex align-items-center border border-secondary"
                                    onClick={() => window.location.href = "http://localhost:8000/api/auth/google-mentor"}
                                >
                                    <FaGoogle size={20} color="#DB4437" className="me-2" />
                                    Google
                                </Button>

                                <Button
                                    variant="light"
                                    className="d-flex align-items-center border border-secondary"
                                    onClick={() => window.location.href = "http://localhost:8000/api/auth/github-mentor"}
                                >
                                    <FaGithub size={20} color="#333" className="me-2" />
                                    GitHub
                                </Button>

                                <Button
                                    variant="light"
                                    className="d-flex align-items-center border border-secondary"
                                    onClick={() => window.location.href = "http://localhost:8000/api/auth/linkedin"}
                                >
                                    <FaLinkedin size={20} color="#0077B5" className="me-2" />
                                    LinkedIn
                                </Button>
                            </div>
                        </div>

                        <div className="text-center mt-3 mb-3">
                            <Link href="/AUTH_MICROSERVICE/signin">Already have an account? Sign In</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
