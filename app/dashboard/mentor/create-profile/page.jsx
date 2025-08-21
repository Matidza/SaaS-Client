"use client";

import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";

export default function CreateMentorProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    currentJobTitle: "",
    companyName: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("accessToken"); // or get from cookie
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mentor/create-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({ type: "danger", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Server error, please try again." });
    }

    setLoading(false);
  };

  return (
    <>
      {/* Full-width header */}
      <section style={{ backgroundColor: "skyblue" }} className="py-5 mb-5">
        <Container className="text-center">
          <h1 className="mb-3">Create Your Mentor Profile</h1>
          <p className="text-muted mb-0">
            Fill in your details so mentees can discover and book sessions with you
          </p>
        </Container>
      </section>

      {/* Profile Form */}
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {message.text && (
              <Alert variant={message.type}>{message.text}</Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="surname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="currentJobTitle">
                <Form.Label>Current Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  name="currentJobTitle"
                  value={formData.currentJobTitle}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Profile Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Tell mentees about yourself..."
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Create Profile"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}


