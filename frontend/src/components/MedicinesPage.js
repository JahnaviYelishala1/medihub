import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchMedicines = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/medicines');
      const meds = res.data.medicines || [];
      setMedicines(meds);
      setFiltered(meds);
    } catch (error) {
      alert('❌ Failed to fetch medicines');
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleFilter = () => {
    let data = medicines;

    if (search) {
      data = data.filter(med =>
        med.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      data = data.filter(med => med.category === category);
    }

    setFiltered(data);
  };

  const handleAddToCart = (medicine) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === medicine.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...medicine, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${medicine.name} added to cart 🛒`);
  };

  return (
    <div className="container mt-5">
      <h2>🧴 Buy Medicines and Essentials</h2>

      <Form className="my-4">
        <Row>
          <Col md={5}>
            <Form.Control
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Tablet">Tablet</option>
              <option value="Syrup">Syrup</option>
              <option value="Injection">Injection</option>
              <option value="Drops">Drops</option>
              <option value="Cream">Cream</option>
              <option value="Powder">Powder</option>
              <option value="Lotion">Lotion</option>
              <option value="Inhaler">Inhaler</option>
            </Form.Select>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleFilter}>🔍 Search</Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {Array.isArray(filtered) && filtered.map(med => (
          <Col md={4} className="mb-4" key={med.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{med.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{med.category}</Card.Subtitle>
                <Card.Text>
                  {med.description}<br />
                  <strong>Manufacturer:</strong> {med.manufacturer}<br />
                  <strong>Price:</strong> ₹{med.price} <br />
                  <strong>Stock:</strong> {med.stock}
                </Card.Text>
                <Button
                  variant="success"
                  disabled={med.stock <= 0}
                  onClick={() => handleAddToCart(med)}
                >
                  {med.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MedicinesPage;
