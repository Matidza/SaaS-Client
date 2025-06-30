'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap'
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'

export default function Page() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(null);
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const isFormValid = oldPassword.trim() && newPassword.trim().length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOldPasswordError(null);
    setNewPasswordError(null);
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:8000/api/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setOldPassword('');
        setNewPassword('');
      } else {
        if (result.field === 'oldPassword') setOldPasswordError(result.message);
        else if (result.field === 'newPassword') setNewPasswordError(result.message);
        else setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      setError("🚨 Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 border border-white shadow-md">
      <Row className="justify-content-center">
        <Col md={6}>
          <h4 className="text-center mb-4">Change Your Password</h4>

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Old Password */}
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  isInvalid={!!oldPasswordError}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  tabIndex={-1}
                >
                  {showOldPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {oldPasswordError}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  isInvalid={!!newPasswordError}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {newPasswordError}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

          <Button
              variant="success"
              type="submit"
              className="w-100"
              disabled={!isFormValid || loading}
          >
              {loading ? <Spinner animation="border" size="sm" /> : "Reset Password"}
          </Button>
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
