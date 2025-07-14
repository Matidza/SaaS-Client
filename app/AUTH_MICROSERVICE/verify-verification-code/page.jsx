'use client'

import React, { useState } from "react"
import { Form, Button, Alert, Container, Row, Col, Spinner } from "react-bootstrap"
import { useRouter } from 'next/navigation'

export default function Page() {
	const [email, setEmail] = useState('')
	const [providedCodeValue, setprovidedCodeValue] = useState('')
	const [emailError, setEmailError] = useState(null)
	const [codeError, setCodeError] = useState(null)
	const [generalError, setGeneralError] = useState(null)
	const [success, setSuccess] = useState(null)
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const isFormValid = email.trim() !== '' && providedCodeValue.trim() !== ''

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		setEmailError(null)
		setCodeError(null)
		setGeneralError(null)
		setSuccess(null)

		try {
			const response = await fetch('http://localhost:8000/api/auth/verify-verification-code', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, providedCodeValue }),
			})

			const result = await response.json()

			if (response.ok && result.success) {
				setSuccess(result.message || "✅ Verification successful.")
				setTimeout(() => {
					router.push('/signin') // redirect after success
				}, 2000)
			} else {
				// Handle field-specific errors
				if (result.field === 'email') {
					setEmailError(result.message)
				} else if (result.field === 'providedCodeValue') {
					setCodeError(result.message)
				} else {
					setGeneralError(result.message || "An unexpected error occurred.")
				}
			}
		} catch (err) {
			setGeneralError("🚨 Failed to connect to the server.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container className="mt-5 border border-white shadow-md">
			<Row className="justify-content-center">
				<Col md={6}>
					<h4 className="text-center fw-bold-50 mb-4">Verify your verification code!</h4>

					{generalError && <Alert variant="danger">{generalError}</Alert>}
					{success && <Alert variant="success">{success}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formEmail" className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								//placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								isInvalid={!!emailError}
								required
								className="text-dark"

							/>
							<Form.Control.Feedback type="invalid">
								{emailError}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="providedCodeValue" className="mb-3">
							<Form.Label>Verification</Form.Label>
							<Form.Control
								type="text"
								//placeholder="Enter code"
								className="text-dark"
								value={providedCodeValue}
								onChange={(e) => setprovidedCodeValue(e.target.value)}
								isInvalid={!!codeError}
								required
								
							/>
							<Form.Control.Feedback type="invalid">
								{codeError}
							</Form.Control.Feedback>
						</Form.Group>

						<Button
                            variant="primary"
                            type="submit"
                            className="w-100 fw-bold text-white rounded-pill"
                            disabled={!isFormValid || loading}
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : "Verify Code"}
                        </Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}
