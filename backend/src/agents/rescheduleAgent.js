const Appointment =
  require("../models/Appointment");

const getSlotsTool =
  require("../tools/getSlotsTool");

const getPatientAppointmentsTool =
  require(
    "../tools/getPatientAppointmentsTool"
  );

async function rescheduleAgent(
  message,
  state,
  patient
) {

  console.log(
    "RESCHEDULE STATE:",
    state
  );

  console.log(
    "MESSAGE:",
    message
  );

  // STEP 1

  if (!state.step) {

    return {

      action:
        "ASK_RESCHEDULE_OR_CANCEL",

      reply:
        "Would you like to Reschedule or Cancel your appointment?",

      state: {

        flow:
          "reschedule",

        step:
          "ASK_ACTION"

      }

    };

  }

  // STEP 2 - User clicked CANCEL

  if (
  state.step === "ASK_ACTION"
  &&
  message === "CANCEL"
) {

  const appointments =
    await getPatientAppointmentsTool(
      patient._id
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

  // STEP 3 - User clicked RESCHEDULE

  if (

    state.step ===
      "ASK_ACTION"

    &&

    message ===
      "RESCHEDULE"

  ) {

    const appointments =
      await getPatientAppointmentsTool(
        patient._id
      );

    return {

      action:
        "SHOW_APPOINTMENTS",

      appointments,

      state: {

        flow:
          "reschedule",

        step:
          "SELECT_APPOINTMENT"

      }

    };

  }

  // STEP 4

  if (

    state.step ===
      "SELECT_APPOINTMENT"

  ) {

    const appointment =
      await Appointment.findById(
        message
      );

    if (!appointment) {

      return {

        action:
          "ERROR",

        reply:
          "Appointment not found"

      };

    }

    const slots =
      await getSlotsTool(
        appointment.doctorName
      );

    return {

      action:
        "SHOW_RESCHEDULE_SLOTS",

      slots,

      state: {

        flow:
          "reschedule",

        step:
          "SELECT_SLOT",

        appointmentId:
          appointment._id

      }

    };

  }

  // STEP 5

  if (

    state.step ===
      "SELECT_SLOT"

  ) {

    const appointment =
      await Appointment.findById(
        state.appointmentId
      );

    if (!appointment) {

      return {

        action:
          "ERROR",

        reply:
          "Appointment not found"

      };

    }

    appointment.appointmentSlot =
      message;

    appointment.status =
      "RESCHEDULED";

    await appointment.save();

    return {

      action:
        "RESCHEDULED",

      reply:
        "Appointment Rescheduled Successfully",

      state: {}

    };

  }

  return {

    action:
      "UNKNOWN"

  };

}

module.exports =
  rescheduleAgent;