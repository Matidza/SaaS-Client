"use client";

import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';

export default function InterviewPrepLayout() {
  const professionals = [
    {
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer at Google',
      rating: '4.9 (127 reviews)',
      tags: ['Software Engineering', 'System Design'],
      price: '$45/hour',
    },
    {
      name: 'Mike Chen',
      title: 'Investment Banking VP at Goldman Sachs',
      rating: '4.8 (89 reviews)',
      tags: ['Investment Banking', 'Finance'],
      price: '$60/hour',
    },
    {
      name: 'Alex Rodriguez',
      title: 'Marketing Director at Netflix',
      rating: '4.7 (56 reviews)',
      tags: ['Marketing', 'Strategy'],
      price: '$50/hour',
    },
    {
      name: 'Emma Williams',
      title: 'Senior Consultant at McKinsey & Company',
      rating: '4.9 (143 reviews)',
      tags: ['Consulting', 'Case Studies'],
      price: '$70/hour',
    },
    {
      name: 'David Kim',
      title: 'Product Manager at Meta',
      rating: '4.8 (92 reviews)',
      tags: ['Product Management', 'UX Design'],
      price: '$55/hour',
    },
    {
      name: 'Lisa Thompson',
      title: 'Data Scientist at Microsoft',
      rating: '4.9 (78 reviews)',
      tags: ['Data Science', 'Analytics'],
      price: '$50/hour',
    },
  ];

  return (
    <Container className="py-5">
      
      <div className="text-center mb-5">
        <h1 className="mb-3">Practice Interviews with Industry Professionals</h1>
        <p className="text-muted mb-4">Connect with experienced professionals for personalized mock interviews and career guidance</p>
        <Button variant="primary" className="me-2">Find Professionals</Button>
        <Button variant="outline-secondary">How it Works</Button>
      </div>

      <Row className="text-center mb-5">
        {[{ icon: '👤', title: 'Choose Your Professional', desc: 'Browse profiles and select an expert in your field' },
          { icon: '📅', title: 'Schedule Your Session', desc: 'Book a convenient time for your mock interview' },
          { icon: '🎥', title: 'Practice via Zoom', desc: 'Get real-time feedback and improve your skills' }
        ].map((item, idx) => (
          <Col md={4} key={idx} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <h1>{item.icon}</h1>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="align-items-center mb-4">
        <Col><h3>Top Professionals</h3></Col>
        <Col className="text-end">
          <Button variant="outline-secondary">More Filters</Button>
        </Col>
      </Row>

      <Row>
        {professionals.map((pro, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{pro.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{pro.title}</Card.Subtitle>
                <Card.Text className="text-warning fw-medium">{pro.rating}</Card.Text>
                <div className="mb-2">
                  {pro.tags.map((tag, i) => (
                    <Badge bg="secondary" key={i} className="me-1">{tag}</Badge>
                  ))}
                </div>
                <p className="fw-bold">{pro.price}</p>
                <Button variant="primary" className="w-100">Book Session</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <Button variant="outline-secondary">View All Professionals</Button>
      </div>
    </Container>
  );
}

