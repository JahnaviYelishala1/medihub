import React from 'react';
import { useLocation } from 'react-router-dom';
import DoctorCard from './DoctorCard';

const DoctorResults = () => {
  const location = useLocation();
  const doctors = location.state?.filteredDoctors || [];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Doctors</h2>
      <div className="row">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBook={() => window.alert('Booking modal to be added here')} // or use Modal
            />
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorResults;
