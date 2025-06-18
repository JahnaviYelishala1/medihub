import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import axios from 'axios';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('https://courageous-patience-production.up.railway.app/api/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error('Error fetching doctors:', err));
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Meet Our Expert Doctors</h2>
      <Row>
        {doctors.map((doc) => (
          <Col key={doc.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Img
                variant="top"
                src={
                  doc.docAvatar && doc.docAvatar !== 'null'
                    ? doc.docAvatar
                    : 'https://via.placeholder.com/300x200?text=No+Image'
                }
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{doc.firstName} {doc.lastName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {doc.departmentName || 'General Medicine'}
                </Card.Subtitle>
                
                <Card.Text style={{ fontSize: '0.9rem' }}>
                  <strong>Experience:</strong> {doc.experience || 'N/A'}<br />
                  <strong>Qualifications:</strong> {Array.isArray(doc.qualifications) ? doc.qualifications.join(', ') : 'N/A'}<br />
                  <strong>Languages:</strong> {Array.isArray(doc.languagesKnown) ? doc.languagesKnown.join(', ') : 'N/A'}<br />
                  <strong>Email:</strong> {doc.email || 'N/A'}<br />
                  <strong>Availability:</strong> {Array.isArray(doc.availableDays) ? doc.availableDays.join(', ') : 'N/A'}<br />
                  <strong>Time:</strong> {doc.availableHours || 'N/A'}<br />
                  <strong>Charges:</strong> ₹{doc.appointmentCharges || 'N/A'}
                </Card.Text>

                {doc.specializations && (
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {doc.specializations.map((spec, index) =>
                      typeof spec === 'object' ? (
                        <Badge key={index} bg="info">{spec.name}</Badge>
                      ) : (
                        <Badge key={index} bg="info">{spec.replace(/"/g, '')}</Badge>
                      )
                    )}
                  </div>
                )}

                <Button variant="dark" href="/book-appointment">
                  Book Appointment
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllDoctors;
