const Appointment =
  require("../models/Appointment");

const Queue =
  require("../models/Queue");

async function cancelAppointmentTool(
  appointmentId
) {

  const appointment =
    await Appointment.findById(
      appointmentId
    );

  if (!appointment) {

    throw new Error(
      "Appointment not found"
    );

  }

  appointment.status =
    "CANCELLED";

  await appointment.save();

  await Queue.findOneAndDelete({

    patientId:
      appointment.patientId,

    doctorName:
      appointment.doctorName,

  });

  return appointment;

}

module.exports =
  cancelAppointmentTool;