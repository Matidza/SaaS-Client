'use client';


import {Container,Row,Col,Badge,Button,Card,} from 'react-bootstrap';
import {CalendarEvent,StarFill,CurrencyDollar,ArrowUp,} from 'react-bootstrap-icons';
import Link from 'next/link';


var user_type = localStorage.getItem('user_type')
var userID = localStorage.getItem('userId')
export default function ProfessionalDashboard() {
  return (
    <Container className="py-4">
      
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="d-inline-block me-2">Professional Dashboard</h2>
          <Badge bg="success">Active</Badge> 
	        <p>{user_type}</p>
          <p>{userID}</p>
        </Col>
        <Col className="text-end text-muted">
          Next session: 2:30 PM
        </Col>
      </Row>

      {/* Stats Cards */}
      
	<Row className="mb-4">
  <Col md={3}>
    <Card className="shadow-sm border-primary">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="text-start">
          <Card.Subtitle className="mb-1 text-muted">Total Sessions</Card.Subtitle>
          <Card.Title>127</Card.Title>
        </div>
        <div className="text-primary d-inline-block p-2 rounded-circle bg-primary-light">
          <CalendarEvent size={24} />
        </div>
      </Card.Body>
    </Card>
  </Col>
  <Col md={3}>
    <Card className="shadow-sm border-success">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="text-start">
          <Card.Subtitle className="mb-1 text-muted">Total Earnings</Card.Subtitle>
          <Card.Title>R3,450.00</Card.Title>
        </div>
        <div className="text-success d-inline-block p-2 rounded-circle bg-success-light" style={{ fontSize: 22, fontWeight: 'bold' }}>
  R
</div>

      </Card.Body>
    </Card>
  </Col>
  <Col md={3}>
    <Card className="shadow-sm border-warning">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="text-start">
          <Card.Subtitle className="mb-1 text-muted">Average Rating</Card.Subtitle>
          <Card.Title>4.8</Card.Title>
        </div>
        <div className="text-warning d-inline-block p-2 rounded-circle bg-warning-light">
          <StarFill size={24} />
        </div>
      </Card.Body>
    </Card>
  </Col>
  <Col md={3}>
    <Card className="shadow-sm border-info">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="text-start">
          <Card.Subtitle className="mb-1 text-muted">This Month</Card.Subtitle>
          <Card.Title>24</Card.Title>
        </div>
        <div className="text-info d-inline-block p-2 rounded-circle bg-info-light">
          <ArrowUp size={24} />
        </div>
      </Card.Body>
    </Card>
  </Col>
</Row>


      {/* Main Grid */}
      <Row>
        {/* Left Column */}
        <Col xl={6} className="mb-4">
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Upcoming Sessions</Card.Title>

              {/* Session 1 */}
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                  AS
                </div>
                <div>
                  <div className="fw-bold">Alex Smith</div>
                  <div className="text-muted small">Software Engineering Interview</div>
                </div>
                <div className="ms-auto text-muted small">2:30 PM Today</div>
              </div>
              <hr />

              {/* Session 2 */}
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                  MJ
                </div>
                <div>
                  <div className="fw-bold">Maria Johnson</div>
                  <div className="text-muted small">Product Manager Mock Interview</div>
                </div>
                <div className="ms-auto text-muted small">4:00 PM Tomorrow</div>
              </div>
              <hr />

              {/* Session 3 */}
              <div className="d-flex align-items-center mb-1">
                <div className="rounded-circle text-white d-flex align-items-center justify-content-center me-3" style={{ backgroundColor: '#6f42c1', width: 40, height: 40 }}>
                  RK
                </div>
                <div>
                  <div className="fw-bold">Robert Kim</div>
                  <div className="text-muted small">Data Science Career Prep</div>
                </div>
                <div className="ms-auto text-muted small">10:00 AM Friday</div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body className="text-center text-muted d-flex align-items-center justify-content-center" style={{ height: '150px' }}>
              <ArrowUp size={32} className="me-2" />
              Monthly earnings chart would display here
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column */}
        <Col xl={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Recent Reviews</Card.Title>

              {/* Review 1 */}
              <div className="mb-3">
                <div className="mb-1">
                  {[...Array(5)].map((_, i) => (
                    <StarFill key={i} color="#ffc107" className="me-1" />
                  ))}
                </div>
                <div className="fw-semibold">Sarah Chen</div>
                <div className="text-muted small">Excellent session! Really helped me prepare for my technical interview.</div>
              </div>
              <hr />

              {/* Review 2 */}
              <div className="mb-3">
                <div className="mb-1">
                  {[...Array(4)].map((_, i) => (
                    <StarFill key={i} color="#ffc107" className="me-1" />
                  ))}
                </div>
                <div className="fw-semibold">James Wilson</div>
                <div className="text-muted small">Great insights into the consulting industry. Very professional!</div>
              </div>
              <hr />

              {/* Review 3 */}
              <div>
                <div className="mb-1">
                  {[...Array(5)].map((_, i) => (
                    <StarFill key={i} color="#ffc107" className="me-1" />
                  ))}
                </div>
                <div className="fw-semibold">Emma Davis</div>
                <div className="text-muted small">Amazing feedback and very constructive. Highly recommend!</div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Profile Stats</Card.Title>
              <div className="d-flex justify-content-between py-1 border-bottom">
                <div className="text-muted small">Profile Views</div>
                <div className="fw-bold">2,341</div>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom">
                <div className="text-muted small">Response Rate</div>
                <div className="fw-bold">96%</div>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom">
                <div className="text-muted small">Completion Rate</div>
                <div className="fw-bold">98%</div>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom">
                <div className="text-muted small">Repeat Clients</div>
                <div className="fw-bold">23%</div>
              </div>
              <Link href="/dashboard/mentor/profile" style={{ textDecoration: "none", color: "inherit"}}>
                <Button variant="primary" className="mt-3 w-100">
                  Edit Profile
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

