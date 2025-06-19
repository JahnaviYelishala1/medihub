import express from 'express';
import {
  bookAppointment,
  getAllAppointments,
  getBookedSlots,
  getAppointmentsByDoctor,
  updateAppointmentStatus,
  getAppointmentsByPatient,
  deleteAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/book', bookAppointment);
router.get('/', getAllAppointments);


router.get('/booked-slots/:doctorId/:date', getBookedSlots);

router.get('/doctor/:doctorId', getAppointmentsByDoctor);

router.get('/patient/:patientId', getAppointmentsByPatient);
router.delete('/:id', deleteAppointment);


router.put('/:id/status', updateAppointmentStatus);

export default router;
