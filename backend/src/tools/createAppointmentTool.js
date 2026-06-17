const Appointment =
  require(
    "../models/Appointment"
  );

const Queue =
  require(
    "../models/Queue"
  );

async function createAppointmentTool(
  data
) {

  const appointment =
    await Appointment.create(
      data
    );

  const queueCount =
    await Queue.countDocuments({
      doctorName:
        data.doctorName,
      status:
        "WAITING",
    });

  await Queue.create({
    patientId:
      data.patientId,

    patientName:
      data.patientName,

    doctorName:
      data.doctorName,

    position:
      queueCount + 1,

    status:
      "WAITING",
  });

  return appointment;

}

module.exports =
  createAppointmentTool;