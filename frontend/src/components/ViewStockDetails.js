// src/components/admin/ViewStockDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const ViewStockDetails = () => {
  const { form, usage } = useParams();
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get(`https://courageous-patience-production.up.railway.app/api/medicines`)
      .then((res) => {
        const filtered = res.data.medicines.filter(
          (med) => med.form === form && med.usage.toLowerCase().includes(usage.toLowerCase())
        );
        setMedicines(filtered);
      })
      .catch((err) => console.error('Error fetching medicines:', err));
  }, [form, usage]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Medicines: {form} - {usage}</h3>
      <Row>
        {medicines.map((med) => (
          <Col md={6} lg={4} className="mb-3" key={med.id}>
            <Card>
              <Card.Body>
                <Card.Title>{med.name}</Card.Title>
                <Card.Text><strong>Manufacturer:</strong> {med.manufacturer}</Card.Text>
                <Card.Text><strong>Price:</strong> ₹{med.price}</Card.Text>
                <Card.Text><strong>Stock:</strong> {med.stock}</Card.Text>
                <Card.Text><strong>Expiry:</strong> {med.expiryDate}</Card.Text>
                <Card.Text><strong>Description:</strong> {med.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewStockDetails;
