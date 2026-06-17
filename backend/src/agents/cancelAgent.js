const getPatientAppointmentsTool =
  require(
    "../tools/getPatientAppointmentsTool"
  );

const cancelAppointmentTool =
  require(
    "../tools/cancelAppointmentTool"
  );

const Appointment =
  require("../models/Appointment");

const Queue =
  require("../models/Queue");

async function cancelAgent(
  message,
  state,
  patient
) {

  console.log(
  "CANCEL AGENT CALLED"
);

console.log(
  "MESSAGE:",
  message
);

console.log(
  "STATE:",
  state
);

if (

  state.flow === "cancel"

  &&

  state.step === "CONFIRM"

  &&

  message.toUpperCase() === "YES"

) {

  const appointment =
    await Appointment.findByIdAndUpdate(

      state.appointmentId,

      {
        status: "CANCELLED"
      },

      {
        new: true
      }

    );

  console.log(
    "UPDATED APPOINTMENT:",
    appointment
  );

  await Queue.findOneAndDelete({

    patientId:
      appointment.patientId,

    doctorName:
      appointment.doctorName

  });

  return {

    action:
      "CANCELLED",

    reply:
      "Appointment cancelled successfully",

    state: {}

  };

}


  if (

  state.flow === "cancel"

  &&

  state.step === "CONFIRM"

  &&

  message.toUpperCase() === "NO"

) {

  return {

    action:
      "CANCEL_ABORTED",

    reply:
      "Cancellation aborted",

    state: {}

  };

}

  // Step 1

// SHOW APPOINTMENTS

if (

  !state.step

  ||

  state.flow === "reschedule"

) {

  const appointments =
    await getPatientAppointmentsTool(
      patient._id
    );

  console.log(
    "CANCEL APPOINTMENTS:",
    appointments.length
  );

  return {

    action:
      "SHOW_CANCEL_APPOINTMENTS",

    appointments,

    state: {

      flow:
        "cancel",

      step:
        "SELECT_APPOINTMENT"

    }

  };

}

  // Step 2

  if (
    state.step ===
    "SELECT_APPOINTMENT"
  ) {

    return {

      action:
        "CONFIRM_CANCEL",

      appointmentId:
        message,

      state: {

        flow:
          "cancel",

        step:
          "CONFIRM",

        appointmentId:
          message

      }

    };

  }

}

module.exports =
  cancelAgent;