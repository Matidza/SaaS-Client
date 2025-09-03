"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Badge, Spinner, Alert } from "react-bootstrap";
import Link from "next/link";

export default function InterviewPrepLayout() {
  const [professionals, setProfessionals] = useState([]);
  const [tagColors, setTagColors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const colorOptions = ["primary", "secondary", "success", "danger", "warning", "info"];

  // Assign random colors to tags
  const assignColors = (profiles) => {
    const newColors = {};
    profiles.forEach((pro) => {
      (pro.tags || []).forEach((tag) => {
        if (!newColors[tag]) {
          newColors[tag] = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        }
      });
    });
    setTagColors(newColors);
  };

  const fetchProfessionals = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:9000/mentee/dashboard", {
        method: "GET",
        credentials: "include", // for cookies if needed
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        const text = await res.text(); // get HTML if server returned error page
        throw new Error(text || "Failed to fetch professionals");
      }

      const data = await res.json();

      if (data.result?.length === 0) {
        setProfessionals([]);
      } else {
        setProfessionals(data.result);
        assignColors(data.result);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  // Get user data from localStorage (optional)
  const user_type = typeof window !== "undefined" ? localStorage.getItem("user_type") : "";
  const userID = typeof window !== "undefined" ? localStorage.getItem("userId") : "";

  return (
    <>
      {/* Full-width section */}
      <section style={{ backgroundColor: "#e1f9fd" }} className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h1 className="mb-3">Practice Interviews with Industry Professionals</h1>
            <p className="text-muted mb-4">
              Connect with experienced professionals for personalized mock interviews and career guidance
            </p>
            <Button variant="primary" className="me-2">Find Professionals</Button>
            <Button variant="outline-secondary">How it Works</Button>
          </div>
        </Container>
      </section>

	

      <Container className="py-5">

	<Row className="text-center mb-5"> {[{ icon: '👤', title: 'Choose Your Professional', desc: 'Browse profiles and select an expert in your field' }, { icon: '📅', title: 'Schedule Your Session', desc: 'Book a convenient time for your mock interview' }, { icon: '🎥', title: 'Practice via Zoom', desc: 'Get real-time feedback and improve your skills' } ].map((item, idx) => ( <Col md={4} key={idx} className="mb-4"> <Card className="h-100 text-center"> <Card.Body> <h1>{item.icon}</h1> <h5>{item.title}</h5> <p>{item.desc}</p> </Card.Body> </Card> </Col> ))} </Row> <p>{user_type}</p> <p>{userID}</p>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            

            <Row>
              {professionals.map((pro, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="h-100">
                    <Card.Body>
                      <Link
                        href="/dashboard/mentee/book-session-page"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Card.Title>{pro.name} {pro.surname || ""}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {pro.currentJobTitle || pro.title} at {pro.companyName || ""}
                        </Card.Subtitle>
                        <Card.Text className="text-warning fw-medium">
                          ⭐ {pro.rating || "N/A"} ({pro.reviews || 0})
                        </Card.Text>

                        <div className="mb-2">
                          {(pro.tags || []).map((tag, i) => (
                            <Badge bg={tagColors[tag] || "secondary"} key={i} className="me-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <span
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {pro.description || "No description provided."}
                        </span>
                      </Link>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <p className="fw-bold mb-0">{pro.price || "$50/hour"}</p>
                        <Button variant="primary" className="w-auto rounded-3">Book Session</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="text-center mt-5">
              <Link href="/dashboard/mentee/all-professionals" style={{ textDecoration: "none", color: "inherit" }}>
                <Button variant="outline-secondary">View All Professionals</Button>
              </Link>
            </div>
          </>
        )}
      </Container>
    </>
  );
}


