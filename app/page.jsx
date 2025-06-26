'use client'
import React, { useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError(null);
        setPasswordError(null);
        setSuccessMessage(null);
        setEmail("")
        setPassword("")


        try {
            
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result)
                setSuccessMessage("🎉 Account created successfully! Redirecting...");
                setTimeout(() => {
                    router.push('/signin');
                }, 2000);
            } else {
                if (result.field === 'email') {
                    setEmailError(result.message);
                } else if (result.field === 'password') {
                    setPasswordError(result.message);
                } else {
                    alert(result.message);
                }
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error("Signup Error:", error.message);
        }
    };
    

    return (
        <Container className="mt-4 border border-white-900 shadow-md">
            <Row className="justify-content-center">
                <Col md={7}>
                    <h4 className="text-center text-2xl text-gray-400 mb-4 mt-3">Don&rsquo;t have an account? <strong>Create One</strong></h4>
                    
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}

                    <Form onSubmit={handleSubmit} className='max-w-xs mx-auto mb3'>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label className='text-white-600'>email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                value={email}
                                className="text-gray-500 border border-secondary"
                                autoComplete='off'
                                onChange={e => setEmail(e.target.value)} 
                                isInvalid={!!emailError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {emailError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>password</Form.Label>
                            <Form.Control 
                                type="password" 
                                className="text-gray-500 border border-secondary"
                                placeholder="Password"
                                autoComplete='off'
                                value={password}
                                onChange={e => setPassword(e.target.value)} 
                                isInvalid={!!passwordError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="success" type="submit" className="btn  w-50">
                            Create Account
                        </Button>
                        

                        <div className="text-center mt-3 mb-3">
                            <Link href="/signin">Already have an account? Sign In</Link>
                        </div>
                    </Form>
                    

                </Col>
            </Row>
        </Container>
    );
}
