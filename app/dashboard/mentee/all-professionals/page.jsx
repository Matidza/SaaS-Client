"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Spinner, Alert } from "react-bootstrap";

export default function Page() {
  const [professionals, setProfessionals] = useState([]);
  const [tagColors, setTagColors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const colorOptions = ["primary", "secondary", "success", "danger", "warning", "info"];

  // assign random colors to tags
  const assignColors = (profiles) => {
    const newColors = { ...tagColors };
    profiles.forEach((pro) => {
      (pro.tags || []).forEach((tag) => {
        if (!newColors[tag]) {
          newColors[tag] = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        }
      });
    });
    setTagColors(newColors);
  };

  const fetchProfessionals = async (pageNumber) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:9000/mentee/all-profesionals?page=${pageNumber}`, {
        method: "GET",
        credentials: "include", // keep cookies if needed
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch professionals");

      if (data.result.length === 0) {
        setHasMore(false);
      } else {
        setProfessionals((prev) => [...prev, ...data.result]);
        assignColors(data.result);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  // fetch on mount & when page changes
  useEffect(() => {
    fetchProfessionals(page);
  }, [page]);

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="border-end bg-light p-3">
          <h5 className="fw-bold mb-3">Categories</h5>
          <ListGroup variant="flush">
            <ListGroup.Item action active>Technology</ListGroup.Item>
            <ListGroup.Item action>Finance</ListGroup.Item>
            <ListGroup.Item action>Healthcare</ListGroup.Item>
            <ListGroup.Item action>Marketing</ListGroup.Item>
            <ListGroup.Item action>Legal</ListGroup.Item>
            <ListGroup.Item action>Consulting</ListGroup.Item>
          </ListGroup>

          <h5 className="fw-bold mt-4 mb-2">Experience Level</h5>
          <ListGroup variant="flush">
            <ListGroup.Item>Entry Level (0-2 years)</ListGroup.Item>
            <ListGroup.Item>Mid Level (3-5 years)</ListGroup.Item>
            <ListGroup.Item>Senior Level (5+ years)</ListGroup.Item>
            <ListGroup.Item>Executive Level</ListGroup.Item>
          </ListGroup>

          <h5 className="fw-bold mt-4 mb-2">Price Range</h5>
          <ListGroup variant="flush">
            <ListGroup.Item>$25 - $50</ListGroup.Item>
            <ListGroup.Item>$50 - $100</ListGroup.Item>
            <ListGroup.Item>$100 - $200</ListGroup.Item>
            <ListGroup.Item>$200+</ListGroup.Item>
          </ListGroup>

          <h5 className="fw-bold mt-4 mb-2">Rating</h5>
          <ListGroup variant="flush">
            <ListGroup.Item>⭐ 5 stars</ListGroup.Item>
            <ListGroup.Item>⭐ 4+ stars</ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <h2 className="fw-bold">Mock Interview Professionals</h2>
          <p className="text-muted">Browse through available professionals</p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Row xs={1} md={2} lg={3} className="g-4">
            {professionals.map((pro, idx) => (
              <Col key={idx}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="mb-0">{pro.name} {pro.surname}</Card.Title>
                        <Badge bg="success">Online</Badge>
                      </div>
                      <Card.Subtitle className="text-muted small mb-2">
                        {pro.currentJobTitle} at {pro.companyName}
                      </Card.Subtitle>
                      <div className="text-warning mb-2">
                        ⭐ {pro.rating || "N/A"} ({pro.reviews || 0})
                      </div>

                      {/* Dynamic Color Tags */}
                      <div className="mb-2">
                        {(pro.tags || []).map((tag, i) => (
                          <Badge bg={tagColors[tag] || "secondary"} key={i} className="me-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <span
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {pro.description}
                    </span>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="fw-bold">{pro.price || "$50/hour"}</span>
                      <Button variant="primary" size="sm">Book Session</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            {loading ? (
              <Spinner animation="border" />
            ) : hasMore ? (
              <Button
                variant="link"
                className="fw-semibold"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Load More Professionals ▼
              </Button>
            ) : (
              <p className="text-muted">No more professionals to load.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
