// src/components/admin/ViewStockUsages.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

// You can fetch these dynamically from backend later
const usages = ['Pain Relief', 'Antibiotic', 'fever', 'Cold & Cough', 'Diabetes'];

const ViewStockUsages = () => {
  const { form } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Select Usage for: {form}</h3>
      <Row>
        {usages.map((usage) => (
          <Col md={4} className="mb-3" key={usage}>
            <Card onClick={() => navigate(`/admin/view-stock/${form}/${usage}`)} className="cursor-pointer">
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

export default ViewStockUsages;
