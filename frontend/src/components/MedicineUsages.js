// src/components/MedicineUsages.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

// Static list for now (you can fetch this dynamically later)
const usages = ['Pain Relief', 'Antibiotic', 'Fever', 'Cold & Cough', 'Diabetes'];

const MedicineUsages = () => {
  const { form } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Select Usage for: {form}</h3>
      <Row>
        {usages.map((usage) => (
          <Col md={4} className="mb-3" key={usage}>
            <Card
              className="cursor-pointer shadow-sm"
              onClick={() => navigate(`/medicines/${form}/${usage}`)}
              style={{ textAlign: 'center', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Card.Body>
                <Card.Title>{usage}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MedicineUsages;
