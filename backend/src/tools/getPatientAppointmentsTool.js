const Appointment =
  require("../models/Appointment");

async function getPatientAppointmentsTool(
  patientId
) {

  return Appointment.find({

    patientId,

    status: {
      $in: [
        "BOOKED",
        "RESCHEDULED"
      ]
    }

  });

}

module.exports =
  getPatientAppointmentsTool;