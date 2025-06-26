'use client'
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'

export default function Page() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		const response = await fetch('http://localhost:8000/api/auth/signin', {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({email, password})
		})
		const result = await response.json()
		if (response.ok) {
            console.log("Signed in successfully:", result);
        } else {
            console.error("Error:", result.message);
        }
		
	}
	return (
	     <Container className="mt-4 border border-white-500">
            <Row className="justify-content-center">
                <Col md={7}>
                    <h4 className="text-center text-2xl text-gray-400 mb-4 mt-3">Welcome back! <strong>Sign In</strong></h4>
                    

                    

                    <Form onSubmit={handleSubmit} className='max-w-xs mx-auto mb3'>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>email address</Form.Label>
                            <Form.Control 
                                className="text-gray-500 border border-secondary"
                                type="email" 
                                placeholder="Enter email" 
                                value={email}
                                autoComplete='off'
                                onChange={e => setEmail(e.target.value)} 
                              
                            />
                            <Form.Control.Feedback type="invalid">
                               
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>password</Form.Label>
                            <Form.Control 
                                className="text-gray-500 border border-secondary"
                                type="password" 
                                placeholder="Password"
                                autoComplete='off'
                                value={password}
                                onChange={e => setPassword(e.target.value)} 
                              
                            />
                            <Form.Control.Feedback type="invalid">
                             
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="success" type="submit" className="btn w-100">
                            Create Account
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