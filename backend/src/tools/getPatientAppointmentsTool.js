const Appointment =
  require("../models/Appointment");

async function getPatientAppointmentsTool(
  patientId
) {

  const appointments =
    await Appointment.find({

      patientId,

      status: {
        $in: [
          "BOOKED",
          "RESCHEDULED"
        ]
      }

    });

  return appointments;

}

module.exports =
  getPatientAppointmentsTool;