import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from '../utils/axios';

const DoctorCard = ({ doctor }) => {
  const [show, setShow] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setSelectedDay('');
    setSelectedTime('');
    setBookedSlots([]);
    setShow(false);
  };

  const daysMap = {
    Sunday: 0, Monday: 1, Tuesday: 2,
    Wednesday: 3, Thursday: 4,
    Friday: 5, Saturday: 6
  };

  const getNextDateForDay = (dayName, formatForDB = false) => {
  const cleanDay = dayName.replace(/^"|"$/g, ''); // remove surrounding quotes
  const today = new Date();
  const todayDay = today.getDay();
  const targetDay = daysMap[cleanDay];
  if (targetDay === undefined) return new Date('Invalid'); // fallback to trigger visible error
  let diff = targetDay - todayDay;
  if (diff < 0) diff += 7;
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + diff);
  return formatForDB
    ? nextDate.toISOString().split('T')[0]
    : nextDate.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'short'
      });
};


  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

  const formatTime = (date) =>
    date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

  const generateTimeSlots = (startStr, endStr, booked = []) => {
    const slots = [];
    let current = parseTime(startStr);
    const end = parseTime(endStr);

    while (current.getTime() + 30 * 60 * 1000 <= end.getTime()) {
      const slotStart = new Date(current);
      const slotEnd = new Date(current.getTime() + 30 * 60 * 1000);
      const label = `${formatTime(slotStart)} - ${formatTime(slotEnd)}`;

      if (!booked.includes(label)) {
        slots.push(label);
      }

      // move 1 hour: 30 mins appointment + 30 mins break
      current = new Date(current.getTime() + 60 * 60 * 1000);
    }
    return slots;
  };

  const [fromTime, toTime] = doctor.availableHours.split(' - ');

  const fetchBookedSlots = async (doctorId, date) => {
    try {
      const res = await axios.get(`https://courageous-patience-production.up.railway.app/api/appointments/booked-slots/${doctorId}/${date}`);

      return res.data.slots || [];
    } catch (error) {
      console.error('Error fetching booked slots:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedDay) {
        const date = getNextDateForDay(selectedDay, true);
        const slots = await fetchBookedSlots(doctor.id, date);
        setBookedSlots(slots);
      }
    };
    fetchSlots();
  }, [selectedDay]);

  const handleConfirm = async () => {
    if (!selectedDay || !selectedTime) return;

      if (bookedSlots.includes(selectedTime)) {
    alert('❌ Selected time slot was just booked. Please choose another.');
    return;
  }


    const appointmentDate = getNextDateForDay(selectedDay, true);
    const patient = JSON.parse(localStorage.getItem('patient'));
    if (!patient) return alert('User not logged in. Please log in.');

    try {
      const response = await axios.post('https://courageous-patience-production.up.railway.app/api/appointments/book', {
        patientId: patient.id,
        patientFirstName: patient.firstName,
        patientLastName: patient.lastName,
        doctorId: doctor.id,
        doctorFirstName: doctor.firstName,
        doctorLastName: doctor.lastName,
        experience: doctor.experience,
        appointmentCharges: doctor.appointmentCharges,
        city: patient.city,
        pincode: patient.pincode || null,
        appointmentDate,
        department: doctor.departmentName,
        timeSlot: selectedTime
      });

      if (response.data.success) {
        alert('✅ Appointment Confirmed!');
        handleClose();
      } else {
        alert('❌ Booking failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Booking Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{doctor.firstName} {doctor.lastName}</h5>
          <p className="card-text">{doctor.departmentName}</p>
          <p className="card-text">Experience: {doctor.experience}</p>
          <p className="card-text">Fee: ₹{doctor.appointmentCharges}</p>
          <button className="btn btn-primary w-100" onClick={handleShow}>
            Book Appointment
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Select Date:</label>
          <select
            className="form-control"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">-- Select Day --</option>
            {doctor.availableDays.map((day, index) => (
              <option key={index} value={day}>
                {getNextDateForDay(day)}
              </option>
            ))}
          </select>

          {selectedDay && (
            <>
              <label className="mt-3">Available Time Slots:</label>
              <select
                className="form-control"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">-- Select Time --</option>
                {generateTimeSlots(fromTime, toTime, bookedSlots).map((slot, i) => (
                  <option key={i} value={slot}>{slot}</option>
                ))}
              </select>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorCard;
