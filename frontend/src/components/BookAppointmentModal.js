// src/components/BookAppointmentModal.js
import React, { useState } from 'react';
import axios from 'axios';

const BookAppointmentModal = ({ doctor, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('userToken');
    const patientInfo = JSON.parse(atob(token.split('.')[1])); // assuming patientId is stored in JWT

    const payload = {
      patientId: patientInfo.id,
      patientFirstName: patientInfo.firstName,
      patientLastName: patientInfo.lastName,
      doctorId: doctor.id,
      doctorFirstName: doctor.firstName,
      doctorLastName: doctor.lastName,
      experience: doctor.experience,
      appointmentCharges: doctor.appointmentCharges,
      city: doctor.city,
      pincode: doctor.pincode,
      appointmentDate: selectedDate,
      department: doctor.departmentName,
    };

    try {
      await axios.post('https://courageous-patience-production.up.railway.app/api/appointments/book', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert('Appointment booked successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: '#00000099' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Book Appointment with Dr. {doctor.firstName}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Available Days: </label>
                <p>{doctor.availableDays.join(', ')}</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Choose Date</label>
                <input type="date" className="form-control" required value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Available Time</label>
                <select className="form-select" required value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                  <option value="">Select Time</option>
                  {doctor.availableHours.split(',').map(time => (
                    <option key={time} value={time.trim()}>{time.trim()}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">Confirm</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
