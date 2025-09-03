"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import Link from "next/link";


export default function InterviewPrepLayout() {
  const professionals = [
    {
      name: "Sarah Johnson",
      title: "Senior Software Engineer at Google",
      rating: "4.9 (127 reviews)",
      tags: ["Software Engineering", "System Design"],
      price: "$45/hour",
    },
    {
      name: "Mike Chen",
      title: "Investment Banking VP at Goldman Sachs",
      rating: "4.8 (89 reviews)",
      tags: ["Investment Banking", "Finance"],
      price: "$60/hour",
    },
    {
      name: "Alex Rodriguez",
      title: "Marketing Director at Netflix",
      rating: "4.7 (56 reviews)",
      tags: ["Marketing", "Strategy"],
      price: "$50/hour",
    },
    {
      name: "Emma Williams",
      title: "Senior Consultant at McKinsey & Company",
      rating: "4.9 (143 reviews)",
      tags: ["Consulting", "Case Studies"],
      price: "$70/hour",
    },
    {
      name: "David Kim",
      title: "Product Manager at Meta",
      rating: "4.8 (92 reviews)",
      tags: ["Product Management", "UX Design"],
      price: "$55/hour",
    },
    {
      name: "Lisa Thompson",
      title: "Data Scientist at Microsoft",
      rating: "4.9 (78 reviews)",
      tags: ["Data Science", "Analytics"],
      price: "$50/hour",
    },
  ];

  // Available Bootstrap badge colors
  const colorOptions = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ];

  const [tagColors, setTagColors] = useState({});

  // Function to randomize colors for all tags
  const randomizeColors = () => {
    const newColors = {};
    professionals.forEach((pro) => {
      pro.tags.forEach((tag) => {
        newColors[tag] =
          colorOptions[Math.floor(Math.random() * colorOptions.length)];
      });
    });
    setTagColors(newColors);
  };

  // Run on mount + every 5 minutes
  useEffect(() => {
    randomizeColors();
    const interval = setInterval(randomizeColors, 300000); // 300,000 ms = 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Get user data from localStorage
  const user_type = localStorage.getItem("user_type");
  const userID = localStorage.getItem("userId");
  //const userCookie = cookies().get("accesstoken")

  return (
    <>
      {/* Full-width section with background */}
      <section style={{ backgroundColor: "#e1f9fdff" }} className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h1 className="mb-3">
              Practice Interviews with Industry Professionals
            </h1>
            <p className="text-muted mb-4">
              Connect with experienced professionals for personalized mock
              interviews and career guidance
            </p>
            <Button variant="primary" className="me-2">
              Find Professionals
            </Button>
            <Button variant="outline-secondary">How it Works</Button>
          </div>
        </Container>
      </section>

      

      {/* Main content */}
      <Container className="py-5">
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


        <p>{user_type}</p>
        <p>{userID}</p>
        

        <Row className="align-items-center mb-4">
          <Col><h3>Top Professionals</h3></Col>
          <Col className="text-end"><Button variant="outline-secondary">More Filters</Button></Col>
        </Row>

        <Row>
          {professionals.map((pro, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Link href="/dashboard/mentee/book-session-page" style={{textDecoration: "none",color: 'inherit',}}>
                    <Card.Title>{pro.name}</Card.Title>
			
                    <Card.Subtitle className="mb-2 text-muted">
                      {pro.title}
                    </Card.Subtitle>
                    <Card.Text className="text-warning fw-medium">
                      {pro.rating}
                    </Card.Text>

                    {/* Dynamic color-changing tags */}
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
                  </Link>
                  

                  {/* Price & Button on same row */}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="fw-bold mb-0">{pro.price}</p>
                    <Button variant="primary" className="w-auto rounded-3">
                      Book Session
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <Link href="/dashboard/mentee/all-professionals" style={{ textDecoration: "none", color: "inherit"}}>
            <Button variant="outline-secondary">View All Professionals</Button>
          </Link>
        </div>
      </Container>
    </>
  );
}

