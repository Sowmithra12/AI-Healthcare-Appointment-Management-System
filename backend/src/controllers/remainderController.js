const Appointment =
require("../models/Appointment");

async function confirmAppointment(
  req,
  res
) {

  await Appointment.findByIdAndUpdate(

    req.params.id,

    {
      status:
        "CONFIRMED"
    }

  );

  res.send(
    "<h1>Appointment Confirmed</h1>"
  );

}

async function cancelAppointment(
  req,
  res
) {

  await Appointment.findByIdAndUpdate(

    req.params.id,

    {
      status:
        "CANCELLED"
    }

  );

  res.send(
    "<h1>Appointment Cancelled</h1>"
  );

}

module.exports = {

  confirmAppointment,

  cancelAppointment

};