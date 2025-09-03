"use client";

import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // ✅ Include credentials so cookie is sent automatically`${process.env.NEXT_PUBLIC_API_URL}
      const res = await fetch('http://localhost:9000/mentor/create-profile', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for sending HTTP-only cookies
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        // redirect to dashboard if success
        setTineout(() => {
          router.push("/dashboard/mentor/my-dashboard")
        })
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
      <section style={{ backgroundColor: "#e1f9fdff" }} className="py-5 mb-5">
        <Container className="text-center">
          <h1 className="mb-3">Create Your Mentor Profile</h1>
          <p className="text-muted mb-0">
            Fill in your details so mentees can discover and book sessions with you
          </p>
        </Container>
      </section>

      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}

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



