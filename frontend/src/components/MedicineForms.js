import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

import tabletImg from '../assets/tablet.jpg';
import capsuleImg from '../assets/capsule.webp';
import syrupImg from '../assets/syrup.jpg';
import injectionImg from '../assets/injection.webp';
import ointmentImg from '../assets/ointment.jpg';
import dropsImg from '../assets/drops.png';
import powderImg from '../assets/powder.jpg';

const medicineForms = [
  { name: 'Tablet', image: tabletImg },
  { name: 'Capsule', image: capsuleImg },
  { name: 'Syrup', image: syrupImg },
  { name: 'Injection', image: injectionImg },
  { name: 'Ointment', image: ointmentImg },
  { name: 'Drops', image: dropsImg },
  { name: 'Powder', image: powderImg },
];

const MedicineForms = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Select Medicine Form</h3>
      <Row>
        {medicineForms.map(({ name, image }) => (
          <Col md={4} className="mb-4" key={name}>
            <Card
              className="cursor-pointer shadow-sm h-100"
              onClick={() => navigate(`/medicines/${name}`)}
              style={{ textAlign: 'center', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Card.Img
                variant="top"
                src={image}
                style={{ height: '180px', objectFit: 'contain', padding: '20px' }}
              />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MedicineForms;
