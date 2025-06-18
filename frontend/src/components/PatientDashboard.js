// src/components/PatientDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import BookAppointmentModal from './BookAppointmentModal';
import './PatientDashboard.css';
import doctorsImg from '../assets/doctors.png';
import { Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const [specialization, setSpecialization] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showSpecializationDropdown, setShowSpecializationDropdown] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then(res => {
        setDoctors(res.data);
        setFilteredDoctors([]); // Initially show none
      })
      .catch(err => console.error('Error fetching doctors', err));
  }, []);

  const handleFindDoctorClick = () => {
    setShowSpecializationDropdown(true);
  };

  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
  };

  const handleSearch = () => {
    if (!specialization) {
      setFilteredDoctors(doctors);
      navigate('/doctors', { state: { filteredDoctors: doctors } });
      return;
    }

    const lowerSearch = specialization.toLowerCase();
    const filtered = doctors.filter((doc) =>
      doc.departmentName?.toLowerCase().includes(lowerSearch)
    );

    setFilteredDoctors(filtered);
    navigate('/doctors', { state: { filteredDoctors: filtered } });
  };

  const handleBookAppointment = (doctorId, day, time) => {
    const patientId = localStorage.getItem('userId');

    axios.post('http://localhost:5000/api/appointments/book', {
      doctorId,
      patientId,
      day,
      time
    }).then(res => {
      alert('✅ Appointment booked successfully!');
    }).catch(err => {
      console.error(err);
      alert('❌ Failed to book appointment');
    });
  };

  return (
    <div className="hero-wrapper container mt-5">
      <div className="row align-items-center hero-content">
        {/* LEFT CONTENT */}
        <div className="col-md-6 text-content">
          <h1 className="mb-3">
            Welcome to <span className="text-primary">MediHub</span>
          </h1>
          <p className="mb-4">
            Find the right doctor and buy your medicines hassle-free.
          </p>

          <div className="buttons mb-3">
            <Button variant="dark" onClick={handleFindDoctorClick}>
              🧑‍⚕️ Find Doctors
            </Button>

            <Button variant="outline-dark" className="ms-3" onClick={() => navigate('/medicines')}>
              💊 Buy Medicines
            </Button>

            <Button variant="outline-primary" className="ms-3" onClick={() => navigate('/appointments')}>
              📋 View Appointments
            </Button>
          </div>

          {showSpecializationDropdown && (
            <div className="mt-4">
              <label className="form-label">Choose Specialization</label>
              <select
                className="form-select"
                value={specialization}
                onChange={handleSpecializationChange}
              >
                <option value="">-- Select Specialization --</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="ENT">ENT</option>
                <option value="Gynecology">Gynecology</option>
              </select>
              <Button variant="success" className="mt-3" onClick={handleSearch}>
                🔍 Search Doctors
              </Button>
            </div>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-md-6 d-none d-md-block position-relative text-center">
          <img
            src={doctorsImg}
            alt="Doctors"
            className="img-fluid"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
          <Badge
            bg="success"
            className="position-absolute"
            style={{ bottom: '10px', right: '10px' }}
          >
            ✅ 50+ Experienced Doctors
          </Badge>
        </div>
      </div>

      {/* DOCTOR CARDS */}
      <div className="row mt-5">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBook={() => setSelectedDoctor(doctor)}
            />
          ))
        ) : showSpecializationDropdown ? (
          <p>No doctors found for this specialization.</p>
        ) : null}
      </div>

      {selectedDoctor && (
        <BookAppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
