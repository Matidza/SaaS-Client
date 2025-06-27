'use client'

import React, { useState } from "react"
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap"
import { useRouter } from 'next/navigation'

export default function Page() {
	const [email, setEmail] = useState('')
	const [providedCodeValue, setprovidedCodeValue] = useState('')
	const [emailError, setEmailError] = useState(null)
	const [codeError, setCodeError] = useState(null)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		setSuccess(null)
		setEmailError(null)
		setCodeError(null)

		try {
			const response = await fetch('http://localhost:8000/api/auth/verify-verification-code', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, providedCodeValue }),
			})

			const result = await response.json()

			if (response.ok) {
				setSuccess("✅ Verification Code Verified Successfully.")
				setTimeout(() => {
					router.push('/signin') // Update route as needed
				}, 2000)
			} else {
				// Field-specific error handling
				if (result.field === 'email') {
					setEmailError(result.message)
				} else if (result.field === 'providedCodeValue') {
					setCodeError(result.message)
				} else {
					setError(result.message || "An unexpected error occurred.")
				}
			}
		} catch (err) {
			setError("🚨 Failed to connect to server.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container className="mt-5">
			<Row className="justify-content-center">
				<Col md={6}>
					<h4 className="text-center mb-4">Verify Your Verification Code</h4>

					{error && <Alert variant="danger">{error}</Alert>}
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
								required
							/>
							<Form.Control.Feedback type="invalid">
								{emailError}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="providedCodeValue" className="mb-3">
							<Form.Label>Verification Code</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter code"
								value={providedCodeValue}
								onChange={(e) => setprovidedCodeValue(e.target.value)}
								isInvalid={!!codeError}
								required
							/>
							<Form.Control.Feedback type="invalid">
								{codeError}
							</Form.Control.Feedback>
						</Form.Group>

						<Button variant="primary" type="submit" className="w-100" disabled={loading}>
							{loading ? "Verifying..." : "Verify Code"}
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

