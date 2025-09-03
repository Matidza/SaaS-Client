'use client'

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';

export default function Page() {
  const professionals = [
    {
      name: "Sarah Mitchell",
      title: "Senior Software Engineer at Google",
      rating: "5.0",
      reviews: 127,
      tags: ["JavaScript", "System Design", "Algorithms"],
      price: "$75/hour",
      status: "Online",
    },
    {
      name: "Michael Johnson",
      title: "Investment Banking VP at Goldman Sachs",
      rating: "4.9",
      reviews: 89,
      tags: ["Finance", "Case Studies", "Behavioral"],
      price: "$120/hour",
      status: "Busy",
    },
    {
      name: "Emily Chen",
      title: "Marketing Director at Meta",
      rating: "4.8",
      reviews: 156,
      tags: ["Marketing", "Product", "Strategy"],
      price: "$85/hour",
      status: "Online",
    },
    {
      name: "David Rodriguez",
      title: "Senior Consultant at Deloitte",
      rating: "5.0",
      reviews: 73,
      tags: ["Consulting", "Case Studies", "Leadership"],
      price: "$95/hour",
      status: "Online",
    },
    {
      name: "Aisha Patel",
      title: "Corporate Lawyer at Skadden",
      rating: "4.7",
      reviews: 42,
      tags: ["Legal", "Corporate Law", "Litigation"],
      price: "$110/hour",
      status: "Offline",
    },
    {
      name: "James Liu",
      title: "Data Scientist at Netflix",
      rating: "4.9",
      reviews: 98,
      tags: ["Data Science", "ML", "Statistics"],
      price: "$90/hour",
      status: "Online",
    },
  ];

  // Bootstrap color options
  const colorOptions = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ];

  const [tagColors, setTagColors] = useState({});

  // Assign random colors to tags
  const randomizeColors = () => {
    const newColors = {};
    professionals.forEach((pro) => {
      pro.tags.forEach((tag) => {
        if (!newColors[tag]) {
          newColors[tag] =
            colorOptions[Math.floor(Math.random() * colorOptions.length)];
        }
      });
    });
    setTagColors(newColors);
  };

  useEffect(() => {
    randomizeColors();
    const interval = setInterval(randomizeColors, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

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
          <p className="text-muted">1,247 professionals available for interview prep sessions</p>

          <Row xs={1} md={2} lg={3} className="g-4">
            {professionals.map((pro, idx) => (
              <Col key={idx}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="mb-0">{pro.name}</Card.Title>
                        <Badge 
                          bg={
                            pro.status === "Online" 
                              ? "success" 
                              : pro.status === "Busy" 
                              ? "warning" 
                              : "secondary"
                          }
                        >
                          {pro.status}
                        </Badge>
                      </div>
                      <Card.Subtitle className="text-muted small mb-2">{pro.title}</Card.Subtitle>
                      <div className="text-warning mb-2">
                        ⭐ {pro.rating} ({pro.reviews})
                      </div>

                      {/* Dynamic Color Tags */}
                      <div className="mb-2">
                        {pro.tags.map((tag, i) => (
                          <Badge
                            bg={tagColors[tag] || "secondary"}
                            key={i}
                            className="me-1"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
			 {/* Multi-line truncation */}
                    <span
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum aperiam magnam consequatur, ea rerum veniam
                      expedita ipsum recusandae ex? Aspernatur assumenda debitis
                      aut est itaque corporis magnam voluptatibus aperiam pariatur.
                    </span>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="fw-bold">{pro.price}</span>
                      <Button variant="primary" size="sm">Book Session</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button variant="link" className="fw-semibold">Load More Professionals ▼</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
