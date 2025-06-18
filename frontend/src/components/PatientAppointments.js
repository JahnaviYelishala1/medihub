// src/components/PatientAppointments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            const patient = JSON.parse(localStorage.getItem('patient'));
            const patientId = patient?.id; // or patient.patientId depending on your schema
            console.log("👤 Logged-in patient ID:", patientId);


            try {
                const res = await axios.get(`http://localhost:5000/api/appointments/patient/${patientId}`);
                setAppointments(res.data.appointments);
            } catch (err) {
                console.error('Error fetching patient appointments', err);
                alert('❌ Could not load your appointments');
            }
        };

        fetchAppointments();
    }, []);

    const handleCancelAppointment = async (appointmentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`);
            alert('🗑️ Appointment cancelled');
            setAppointments(appointments.filter(appt => appt.id !== appointmentId)); // update UI
        } catch (err) {
            console.error('Cancel error', err);
            alert('❌ Failed to cancel appointment');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Your Appointments</h2>
            {appointments.length === 0 ? (
                <p>No appointments booked yet.</p>
            ) : (
                <div className="row mt-4">
                    {appointments.map((appt) => (
                        <div className="col-md-6 mb-4" key={appt.id}>
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        👨‍⚕️ Dr. {appt.doctorFirstName} {appt.doctorLastName || ''}
                                    </h5>
                                    <p><strong>Department:</strong> {appt.department}</p>
                                    <p><strong>Date:</strong> {appt.appointmentDate}</p>
                                    <p><strong>Time:</strong> {appt.timeSlot}</p>
                                    <p><strong>Location:</strong> {appt.city}, {appt.pincode}</p>
                                    <p>
                                        <strong>Status:</strong>{' '}
                                        <span className={`badge ${appt.status === 'Accepted'
                                                ? 'bg-success'
                                                : appt.status === 'Rejected'
                                                    ? 'bg-danger'
                                                    : 'bg-warning'
                                            }`}>
                                            {appt.status}
                                        </span>
                                    </p>
                                    {(appt.status === 'Pending' || appt.status === 'Accepted') && (
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleCancelAppointment(appt.id)}
                                        >
                                            ❌ Cancel Appointment
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Button variant="secondary" onClick={() => navigate(-1)}>
                ← Back
            </Button>
        </div>
    );
};

export default PatientAppointments;
