// src/components/admin/ViewStockDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const ViewStockDetails = () => {
    const { form, usage } = useParams();
    const [medicines, setMedicines] = useState([]);
    const [editingStockId, setEditingStockId] = useState(null);
    const [newStock, setNewStock] = useState('');

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

    const handleUpdateStock = async (id) => {
  try {
    await axios.put(`https://courageous-patience-production.up.railway.app/api/medicines/${id}/stock`, {
      stock: parseInt(newStock)
    });
    // Refresh list
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, stock: parseInt(newStock) } : m))
    );
    setEditingStockId(null);
  } catch (error) {
    alert('Failed to update stock.');
    console.error(error);
  }
};

const handleDeleteMedicine = async (id) => {
  if (!window.confirm('Are you sure you want to delete this medicine?')) return;

  try {
    await axios.delete(`https://courageous-patience-production.up.railway.app/api/medicines/${id}`);
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  } catch (error) {
    alert('Failed to delete medicine.');
    console.error(error);
  }
};


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
                                <Card.Text><strong>Stock:</strong>
                                    {editingStockId === med.id ? (
                                        <>
                                            <input
                                                type="number"
                                                value={newStock}
                                                onChange={(e) => setNewStock(e.target.value)}
                                                style={{ width: '60px', marginLeft: '10px' }}
                                            />
                                            <button className="btn btn-sm btn-success ms-2" onClick={() => handleUpdateStock(med.id)}>
                                                ✅
                                            </button>
                                            <button className="btn btn-sm btn-secondary ms-1" onClick={() => setEditingStockId(null)}>
                                                ❌
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            {med.stock}
                                            <button className="btn btn-sm btn-outline-primary ms-2" onClick={() => {
                                                setEditingStockId(med.id);
                                                setNewStock(med.stock);
                                            }}>
                                                ✏️ Edit
                                            </button>
                                        </>
                                    )}
                                </Card.Text>
                                <Card.Text><strong>Expiry:</strong> {med.expiryDate}</Card.Text>
                                <Card.Text><strong>Description:</strong> {med.description}</Card.Text>

                                <button
                                    className="btn btn-sm btn-danger mt-2"
                                    onClick={() => handleDeleteMedicine(med.id)}
                                >
                                    🗑️ Delete
                                </button>
                            </Card.Body>

                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ViewStockDetails;
