import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorAppointments.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const doctor = JSON.parse(localStorage.getItem('doctor'));
  const doctorId = doctor?.id;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`https://courageous-patience-production.up.railway.app/api/appointments/doctor/${doctorId}`);
        console.log("Appointments Response:", res.data);
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error('Failed to fetch appointments', err);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://courageous-patience-production.up.railway.app/api/appointments/${id}/status`, { status });
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status } : appt))
      );
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div className="appointment-card-wrapper">
      <h2 className="mb-4">Your Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <div className="appointment-card-container">
          {appointments.map((appt) => (
            <div className="appointment-card" key={appt.id}>
              <div className="appointment-card-header">
                <h4>{appt.patientFirstName} {appt.patientLastName}</h4>
                
              </div>

              <div className="appointment-card-body">
                <p><strong>Location:</strong> {appt.city || 'N/A'}</p>
                <p><strong>Date:</strong> {appt.appointmentDate}</p>
                <p><strong>Time Slot:</strong> {appt.timeSlot}</p>
                <p><strong>Department:</strong> {appt.department}</p>
                <p><strong>Status:</strong> <span className={`status-${appt.status}`}>{appt.status || 'Pending'}</span></p>
              </div>

              <div className="appointment-card-actions">
                <button
                  className="btn btn-success btn-sm"
                  disabled={appt.status === 'accepted'}
                  onClick={() => updateStatus(appt.id, 'accepted')}
                >
                  Accept
                </button>{' '}
                <button
                  className="btn btn-danger btn-sm"
                  disabled={appt.status === 'rejected'}
                  onClick={() => updateStatus(appt.id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
