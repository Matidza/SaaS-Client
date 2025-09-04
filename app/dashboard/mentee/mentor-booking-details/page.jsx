"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, ListGroup, Spinner, Alert } from "react-bootstrap";
import Link from "next/link";


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

  const fetchProfessionals = async () => {


	try {
	  const res = await fetch(`http://localhost:9000/mentee/individual-mentor-book-session-page?_id+${res._id}`, {
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


  return (
	<Container fluid className="mt-4">
	  <Row>


		{/* Main Content */}
		<Col md={9} className="p-4">

		  <Row xs={1} md={2} lg={3} className="g-4">
			{professionals.map((pro, idx) => (
			  <Col key={idx}>
				<Card className="h-100 shadow-sm">
				  <Card.Body className="d-flex flex-column justify-content-between">
					<Link href="/dashboard/mentee/mentor-booking-details"
						style={{ textDecoration: "none", color: "inherit" }}>
						  <div>
							<div className="d-flex justify-content-between align-items-center mb-2">
							  <Card.Title className="mb-0">{pro._id}{pro.name} {pro.surname}</Card.Title>
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
					</Link>
					

					<div className="d-flex justify-content-between align-items-center mt-3">
					  <span className="fw-bold">{pro.price || "$50/hour"}</span>
					  <Link href="/dashboard/mentee/book-a-session"
						  style={{ textDecoration: "none", color: "inherit" }}>
						  <Button variant="primary" size="sm">Book Session</Button>
						</Link>
					  
					</div>
				  </Card.Body>
				</Card>
			  </Col>
			))}
		  </Row>

		</Col>
	  </Row>
	</Container>
  );
}
