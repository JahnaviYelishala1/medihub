import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title><h2>About MediHub</h2></Card.Title>
              <Card.Text>
                MediHub is your one-stop healthcare platform designed to simplify doctor consultations,
                medicine ordering, and appointment bookings. We aim to make quality healthcare accessible
                and hassle-free for everyone.
              </Card.Text>
              <Card.Text>
                Our mission is to leverage technology to bridge the gap between patients and healthcare
                providers, ensuring faster, smarter, and more reliable services.
              </Card.Text>
              <Card.Text>
                <strong>What We Offer:</strong>
                <ul>
                  <li>Seamless online appointments</li>
                  <li>Medicine ordering with doorstep delivery</li>
                  <li>Real-time communication with healthcare providers</li>
                </ul>
              </Card.Text>
              <Card.Text>
                Thank you for choosing MediHub as your healthcare companion.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
