// DoctorDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-dashboard-wrapper">
      <div className="doctor-dashboard-content">

        <div className="doctor-text-content">
          <h1>Welcome, <span>Doctor</span> 👨‍⚕️</h1>
          <p>Here you can manage your appointments, update your profile, and connect with patients.</p>
          <div className="dashboard-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/doctor/appointments')}>
              View Appointments
            </button>
          </div>
        </div>

        <div className="doctor-image-content">
          <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Doctor Illustration" />
          <div className="doctor-bottom-right">MediCore Doctor Portal</div>
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;
