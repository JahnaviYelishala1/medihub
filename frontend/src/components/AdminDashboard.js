// src/components/AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import adminImg from '../assets/doctors.png'; 
import { Button, Badge } from 'react-bootstrap';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-wrapper container mt-5">
      <div className="row align-items-center hero-content">
        {/* LEFT CONTENT */}
        <div className="col-md-6 text-content">
          <h1 className="mb-3">
            Welcome, <span className="text-primary">Admin</span>
          </h1>
          <p className="mb-4">
            Manage medicine inventory and monitor stock efficiently from one place.
          </p>

          <div className="buttons mb-3">
            <Button variant="dark" onClick={() => navigate('/admin/add-medicine')}>
              ➕ Add Medicine
            </Button>

            <Button variant="outline-dark" className="ms-3" onClick={() => navigate('/admin/view-stock')}>
              📦 View Stock
            </Button>

            <Button variant="outline-primary" className="ms-3" onClick={() => navigate('/')}>
              🔙 Back to Home
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-md-6 d-none d-md-block position-relative text-center">
          <img
            src={adminImg}
            alt="Admin"
            className="img-fluid"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
          <Badge
            bg="info"
            className="position-absolute"
            style={{ bottom: '10px', right: '10px' }}
          >
            🛠️ Admin Panel
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
