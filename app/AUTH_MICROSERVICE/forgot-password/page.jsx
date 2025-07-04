'use client'
import Link from "next/link"
import React, { useState } from "react"
import { Form, Button, Alert, Container, Row, Col, Spinner } from "react-bootstrap"
import { useRouter } from 'next/navigation'

export default function Page() {
	const [email, setEmail] = useState('')
	const [success, setSuccess] = useState(null)
	const [emailError, setEmailError] = useState(null)
	const [generalError, setGeneralError] = useState(null)
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	const isFormValid = email.trim() !== ''
	const handleSubmit = async (e) => {
		e.preventDefault()
		setSuccess(null)
		setEmailError(null)
		setGeneralError(null)
		setLoading(true)

		try {
			const response = await fetch('http://localhost:8000/api/auth/forgot-password', {
				method: "PATCH",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			})
			const result = await response.json()

			if (response.ok && result.success) {
				setSuccess(result.message || "📬 Verification Code Sent To Your Email.")
				setTimeout(() => {
					router.push('/AUTH_MICROSERVICE/reset-password')
				}, 2000)
			} else {
				if (result.field === "email") {
					setEmailError(result.message)
				} else {
					setGeneralError(result.message || "An unexpected error occurred.")
				}
			}
		} catch (err) {
			setGeneralError("🚨 Something went wrong. Please try again.")
		}
	}

	return (
		<Container className="mt-5 border border-white shadow-md">
			<Row className="justify-content-center">
				<Col md={6}>
					<h4 className="text-center text-2xl fw-bold-50 mb-4 mt-3">
						Forgot your password? <strong className="fw-bold-50">Reset it!</strong>
					</h4>

					{success && <Alert variant="success">{success}</Alert>}
					{generalError && <Alert variant="danger">{generalError}</Alert>}

					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formEmail" className="mb-3">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								value={email}
								placeholder="Enter email"
								onChange={(e) => setEmail(e.target.value)}
								isInvalid={!!emailError}
								className="text-dark-50 border border-secondary fw-lighter"
							/>
							<Form.Control.Feedback type="invalid">
								{emailError}
							</Form.Control.Feedback>
						</Form.Group>

						<Button
                            variant="success"
                            type="submit"
                            className="w-100"
                            disabled={!isFormValid || loading}
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : "Send code"}
                        </Button>

						<div className="text-center mt-4 mb-3">
                            <Link href="/AUTH_MICROSERVICE/signin">Already have an account? Sign In</Link>
                        </div>
					</Form>

					
				</Col>
			</Row>
		</Container>
	)
}
