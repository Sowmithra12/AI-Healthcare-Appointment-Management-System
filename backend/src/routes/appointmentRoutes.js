const express =
  require("express");

const router =
  express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointment,
  getPatientAppointments,
  rescheduleAppointment,
  markAppointmentCompleted,
  getAppointmentHistory,
  getDoctorAppointments,
  updateAppointmentStatus,
  getPatientHistory,
  getDoctorAnalytics,
} = require(
  "../controllers/appointmentController"
);

// Create Appointment
router.post(
  "/create",
  createAppointment
);

// Get All Appointments
router.get(
  "/all",
  getAppointments
);

// Get Latest Appointment
router.get(
  "/current",
  getAppointment
);

// Get Appointments By Patient
router.get(
  "/patient/:patientId",
  getPatientAppointments
);

// Reschedule Appointment
router.put(
  "/reschedule",
  rescheduleAppointment
);

router.put(
  "/complete/:appointmentId",
  markAppointmentCompleted
);

router.get(
  "/history/:patientId",
  getAppointmentHistory
);

router.get(
  "/doctor/:doctorName",
  getDoctorAppointments
);

router.put(
  "/status/:appointmentId",
  updateAppointmentStatus
);

router.get(
  "/patient-history/:patientId",
  getPatientHistory
);

router.get(
  "/analytics/:doctorName",
  getDoctorAnalytics
);

module.exports = router;