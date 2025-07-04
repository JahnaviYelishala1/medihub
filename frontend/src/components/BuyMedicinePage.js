// src/components/BuyMedicinePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col, Button, Form } from 'react-bootstrap';

const BuyMedicinePage = () => {
  const { form, usage } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [quantities, setQuantities] = useState({}); // Track quantity for each medicine

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

  const handleAddToCart = (medicine) => {
    const quantity = quantities[medicine.id] || 1;
    const cartItem = {
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: parseInt(quantity),
      total: medicine.price * quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart.filter(item => item.id !== medicine.id), cartItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`✅ ${medicine.name} added to cart`);
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Buy Medicines: {form} - {usage}</h3>
      <Row>
        {medicines.length === 0 && <p>No medicines found for this category.</p>}
        {medicines.map((med) => (
          <Col md={6} lg={4} className="mb-3" key={med.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{med.name}</Card.Title>
                <Card.Text><strong>Manufacturer:</strong> {med.manufacturer}</Card.Text>
                <Card.Text><strong>Usage:</strong> {med.usage}</Card.Text>
                <Card.Text><strong>Price:</strong> ₹{med.price}</Card.Text>
                <Card.Text><strong>Stock:</strong> {med.stock}</Card.Text>
                <Card.Text><strong>Expiry:</strong> {med.expiryDate}</Card.Text>
                <Card.Text><strong>Description:</strong> {med.description}</Card.Text>

                <Form.Group className="mb-2">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max={med.stock}
                    value={quantities[med.id] || 1}
                    onChange={(e) => handleQuantityChange(med.id, e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(med)}
                  disabled={med.stock === 0}
                >
                  🛒 Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BuyMedicinePage;
