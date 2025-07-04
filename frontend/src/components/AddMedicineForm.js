import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const AddMedicineForm = () => {
  const [medicine, setMedicine] = useState({
    name: '',
    manufacturer: '',
    manufactureDate: '',
    expiryDate: '',
    price: '',
    description: '',
    usage: '',
    form: 'Tablet',
    stock: 0,
  });

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      await axios.post('https://your-api-url.com/api/medicines', medicine, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('✅ Medicine added successfully!');
      setMedicine({
        name: '',
        manufacturer: '',
        manufactureDate: '',
        expiryDate: '',
        price: '',
        description: '',
        usage: '',
        form: 'Tablet',
        stock: 0,
      });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add medicine. Try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">➕ Add New Medicine</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Medicine Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={medicine.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                name="manufacturer"
                value={medicine.manufacturer}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Manufacture Date</Form.Label>
              <Form.Control
                type="date"
                name="manufactureDate"
                value={medicine.manufactureDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="expiryDate"
                value={medicine.expiryDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={medicine.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={medicine.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Usage / Cause</Form.Label>
              <Form.Control
                type="text"
                name="usage"
                value={medicine.usage}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Form</Form.Label>
              <Form.Select name="form" value={medicine.form} onChange={handleChange} required>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="Ointment">Ointment</option>
                <option value="Drops">Drops</option>
                <option value="Powder">Powder</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={medicine.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="text-center">
          <Button type="submit" variant="success" size="lg">
            ✅ Add Medicine
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddMedicineForm;
